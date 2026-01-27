import React, { useMemo, useState } from 'react';
import PageHero from '../../components/PageHero';
import { useCart } from '../context/CartContext';
import { findMerchProduct, formatPrice } from '../data/merchCatalog';
import { stripePromise } from '../lib/stripe';

const Checkout: React.FC = () => {
  const { items, subtotalCents } = useCart();
  const [recipient, setRecipient] = useState({
    name: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state_code: '',
    zip: '',
    country_code: 'US',
  });
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedRateId, setSelectedRateId] = useState('');
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const cartPayload = useMemo(
    () =>
      items.map((item) => ({
        productId: item.productId,
        colorKey: item.colorKey,
        size: item.size,
        quantity: item.quantity,
      })),
    [items]
  );

  const selectedRate = shippingRates.find((rate) => rate.id === selectedRateId);
  const shippingCostCents = selectedRate ? Math.round(Number(selectedRate.rate) * 100) : 0;

  const handleChange = (field: string, value: string) => {
    setRecipient((prev) => ({ ...prev, [field]: value }));
  };

  const handleGetRates = async () => {
    setError('');
    if (!recipient.name || !recipient.email || !recipient.address1 || !recipient.city || !recipient.zip || !recipient.country_code) {
      setError('Please complete all required shipping fields.');
      return;
    }

    setIsLoadingRates(true);
    try {
      const response = await fetch('/api/printful/shipping-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, items: cartPayload }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to fetch shipping rates.');
      }

      setShippingRates(data.rates || []);
      setSelectedRateId(data.rates?.[0]?.id || '');
    } catch (err: any) {
      setError(err.message || 'Unable to fetch shipping rates.');
    } finally {
      setIsLoadingRates(false);
    }
  };

  const handlePay = async () => {
    setError('');
    if (!selectedRateId) {
      setError('Select a shipping option before paying.');
      return;
    }

    if (!stripePromise) {
      setError('Stripe is not configured. Add VITE_STRIPE_PUBLISHABLE_KEY.');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient, items: cartPayload, shippingOptionId: selectedRateId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Unable to start Stripe checkout.');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to initialize.');
      }
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err: any) {
      setError(err.message || 'Unable to start checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHero title="CHECKOUT" description="Your cart is currently empty." />
        <section className="pb-24 bg-black text-white">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-gray-300 font-body">Add merch before checking out.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero title="CHECKOUT" description="Secure payment via Stripe. Fulfilled by Printful." />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-12">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-lg tracking-[0.3em] uppercase font-heading">Shipping</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="Full name*"
                  value={recipient.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="Email*"
                  value={recipient.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body md:col-span-2"
                  placeholder="Address line 1*"
                  value={recipient.address1}
                  onChange={(e) => handleChange('address1', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body md:col-span-2"
                  placeholder="Address line 2"
                  value={recipient.address2}
                  onChange={(e) => handleChange('address2', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="City*"
                  value={recipient.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="State/Region"
                  value={recipient.state_code}
                  onChange={(e) => handleChange('state_code', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="Postal code*"
                  value={recipient.zip}
                  onChange={(e) => handleChange('zip', e.target.value)}
                />
                <input
                  className="bg-transparent border border-white/20 px-4 py-3 text-sm font-body"
                  placeholder="Country code (US)*"
                  value={recipient.country_code}
                  onChange={(e) => handleChange('country_code', e.target.value.toUpperCase())}
                />
              </div>
              <button
                type="button"
                onClick={handleGetRates}
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-xs"
              >
                {isLoadingRates ? 'Fetching rates...' : 'Get shipping rates'}
              </button>
            </div>

            {shippingRates.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg tracking-[0.3em] uppercase font-heading">Shipping Options</h2>
                <div className="space-y-3">
                  {shippingRates.map((rate) => (
                    <label
                      key={rate.id}
                      className="flex items-center justify-between gap-4 border border-white/10 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="uppercase tracking-widest text-xs">{rate.name}</p>
                        <p className="text-xs text-gray-400 font-mono">
                          {rate.minDeliveryDays ? `${rate.minDeliveryDays}-${rate.maxDeliveryDays} days` : 'Delivery window varies'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono">{rate.currency} {rate.rate}</span>
                        <input
                          type="radio"
                          name="shipping"
                          value={rate.id}
                          checked={selectedRateId === rate.id}
                          onChange={() => setSelectedRateId(rate.id)}
                          className="accent-white"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-xs text-red-400 font-mono">{error}</p>}

            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing || !selectedRateId}
              className="inline-flex items-center justify-center px-10 py-4 min-w-[200px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Redirecting...' : 'Pay securely'}
            </button>
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24 h-fit border border-white/10 p-6 bg-black/60 space-y-4">
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">Order Summary</p>
            <div className="space-y-3">
              {items.map((item) => {
                const product = findMerchProduct(item.productId);
                if (!product) {
                  return null;
                }
                return (
                  <div key={`${item.productId}-${item.colorKey}-${item.size}`} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest">{product.name}</p>
                      <p className="text-xs text-gray-400 font-mono">
                        {item.colorKey.toUpperCase()} / {item.size} x{item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono">{formatPrice(product.priceCents * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-mono text-gray-300">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalCents)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{selectedRate ? `${selectedRate.currency} ${selectedRate.rate}` : '—'}</span>
              </div>
              <div className="flex items-center justify-between text-white">
                <span>Total</span>
                <span>{formatPrice(subtotalCents + shippingCostCents)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
