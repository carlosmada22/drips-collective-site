import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getShippingRates, createOrder } from './printful.js';
import { createCheckoutSession, constructStripeEvent } from './stripe.js';
import { MERCH_CATALOG, findProduct, resolveVariantId, getUnitPrice } from './catalog.js';
import { storeOrder } from './storage.js';

const app = express();
const port = Number(process.env.SERVER_PORT || 3001);
const appUrl = process.env.APP_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: [appUrl, 'http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return res.status(400).send('Missing Stripe webhook signature or secret.');
  }

  let event;
  try {
    event = constructStripeEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const metadata = session.metadata || {};

    try {
      const items = JSON.parse(metadata.items || '[]');
      const recipient = JSON.parse(metadata.recipient || '{}');
      const shippingOptionId = metadata.shippingOptionId || undefined;

      const printfulItems = items.map((item) => {
        const variantId = resolveVariantId(item.productId, item.colorKey, item.size);
        if (!variantId) {
          throw new Error(`Variant not configured for ${item.productId} ${item.colorKey} ${item.size}`);
        }
        return {
          variant_id: variantId,
          quantity: item.quantity,
        };
      });

      const orderPayload = {
        recipient: {
          name: recipient.name,
          email: recipient.email,
          address1: recipient.address1,
          address2: recipient.address2,
          city: recipient.city,
          state_code: recipient.state_code,
          zip: recipient.zip,
          country_code: recipient.country_code,
        },
        items: printfulItems,
        shipping: shippingOptionId,
        external_id: `drips-${session.id}`,
      };

      const printfulOrder = await createOrder(orderPayload, true);

      await storeOrder({
        sessionId: session.id,
        status: 'created',
        printfulOrderId: printfulOrder?.id,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to create Printful order:', err);
      await storeOrder({
        sessionId: session.id,
        status: 'failed',
        error: err.message,
        createdAt: new Date().toISOString(),
      });
    }
  }

  res.json({ received: true });
});

app.use(express.json({ limit: '1mb' }));

app.get('/api/merch/catalog', (_req, res) => {
  res.json(MERCH_CATALOG);
});

app.post('/api/printful/shipping-quote', async (req, res) => {
  try {
    const { recipient, items } = req.body;
    if (!recipient || !items?.length) {
      return res.status(400).json({ error: 'Missing recipient or items.' });
    }

    const printfulItems = items.map((item) => {
      const variantId = resolveVariantId(item.productId, item.colorKey, item.size);
      if (!variantId) {
        throw new Error(`Variant not configured for ${item.productId} ${item.colorKey} ${item.size}`);
      }
      return {
        variant_id: variantId,
        quantity: item.quantity,
      };
    });

    const rates = await getShippingRates(recipient, printfulItems);
    res.json({ rates });
  } catch (err) {
    console.error('Shipping quote error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch shipping rates.' });
  }
});

app.post('/api/stripe/create-checkout-session', async (req, res) => {
  try {
    const { recipient, items, shippingOptionId } = req.body;

    if (!recipient || !items?.length) {
      return res.status(400).json({ error: 'Missing recipient or items.' });
    }
    if (!shippingOptionId) {
      return res.status(400).json({ error: 'Missing shipping option.' });
    }

    const printfulItems = items.map((item) => {
      const variantId = resolveVariantId(item.productId, item.colorKey, item.size);
      if (!variantId) {
        throw new Error(`Variant not configured for ${item.productId} ${item.colorKey} ${item.size}`);
      }
      return {
        variant_id: variantId,
        quantity: item.quantity,
      };
    });

    const rates = await getShippingRates(recipient, printfulItems);
    const selectedRate = rates?.result?.find?.((rate) => rate.id === shippingOptionId) ||
      rates?.find?.((rate) => rate.id === shippingOptionId);

    if (!selectedRate) {
      return res.status(400).json({ error: 'Invalid shipping option.' });
    }

    const lineItems = items.map((item) => {
      const product = findProduct(item.productId);
      const unitAmount = getUnitPrice(item.productId);

      if (!product || !unitAmount) {
        throw new Error(`Product not configured: ${item.productId}`);
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: MERCH_CATALOG.currency,
          unit_amount: unitAmount,
          product_data: {
            name: `${product.name} (${item.colorKey.toUpperCase()} / ${item.size})`,
          },
        },
      };
    });

    lineItems.push({
      quantity: 1,
      price_data: {
        currency: selectedRate.currency || MERCH_CATALOG.currency,
        unit_amount: Math.round(Number(selectedRate.rate) * 100),
        product_data: {
          name: `Shipping - ${selectedRate.name}`,
        },
      },
    });

    const session = await createCheckoutSession({
      lineItems,
      successUrl: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/checkout`,
      metadata: {
        items: JSON.stringify(items),
        recipient: JSON.stringify(recipient),
        shippingOptionId,
      },
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: err.message || 'Failed to create Stripe session.' });
  }
});

app.listen(port, () => {
  console.log(`Merch server running on http://localhost:${port}`);
});
