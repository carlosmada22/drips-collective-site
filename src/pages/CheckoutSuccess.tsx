import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero';

const CheckoutSuccess: React.FC = () => {
  return (
    <>
      <PageHero title="ORDER CONFIRMED" description="Payment received. Your order is now in Printful fulfillment." />
      <section className="pb-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12 space-y-6">
          <p className="text-gray-300 font-body max-w-2xl">
            Thank you for supporting DRIPS. You'll receive a confirmation email with tracking once the order ships.
          </p>
          <Link
            to="/merch"
            className="inline-flex items-center justify-center px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Back to Merch
          </Link>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
