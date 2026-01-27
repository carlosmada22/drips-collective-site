import React from 'react';
import { Link } from 'react-router-dom';
import { MerchProductConfig, formatPrice } from '../../src/data/merchCatalog';

type ProductCardProps = {
  product: MerchProductConfig;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const heroImage = product.images[0];

  return (
    <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start">
      <div className="relative overflow-hidden bg-gray-900 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
        {heroImage && (
          <img
            src={heroImage}
            alt={`${product.name} mockup`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">DRIPS Collective</p>
          <h2 className="mt-3 text-2xl md:text-3xl font-heading tracking-[0.3em] uppercase">
            {product.name}
          </h2>
          <p className="mt-3 text-sm text-gray-300 font-body">{product.description}</p>
          <p className="mt-4 text-lg tracking-[0.3em] font-heading">{formatPrice(product.priceCents)}</p>
        </div>

        <div className="space-y-2">
          <Link
            to={`/merch/${product.id}`}
            className="inline-flex items-center justify-center px-10 py-4 min-w-[180px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            VIEW PRODUCT
          </Link>
          <p className="text-xs text-gray-500 font-mono tracking-wide">Fulfilled on demand.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
