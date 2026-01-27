import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe endpoints will fail until configured.');
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    })
  : null;

const createCheckoutSession = async ({
  lineItems,
  successUrl,
  cancelUrl,
  metadata,
}) => {
  if (!stripe) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  });
};

const constructStripeEvent = (payload, signature, webhookSecret) => {
  if (!stripe) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
};

export { stripe, createCheckoutSession, constructStripeEvent };
