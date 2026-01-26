import React, { useState } from 'react';
import { MERCH_PRODUCTS } from '../../constants';
import { MerchProduct } from '../../types';
import Reveal from '../../components/Reveal';
import merchHeroVideo from '../assets/merch/DRIPS_MODEL.mp4';

const MerchCard: React.FC<{ product: MerchProduct }> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  return (
    <div className="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-start">
      <div>
        <div className="relative overflow-hidden bg-gray-900 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
          {activeImage && (
            <img
              src={activeImage}
              alt={`${product.name} mockup ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.images.map((image, index) => {
            const isActive = index === activeImageIndex;
            return (
              <button
                key={`${product.id}-${index}`}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`h-16 w-16 overflow-hidden border transition-colors duration-300 ${
                  isActive ? 'border-white' : 'border-white/20 hover:border-white/60'
                }`}
                aria-label={`View ${product.name} mockup ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">DRIPS Collective</p>
            <h2 className="mt-3 text-2xl md:text-3xl font-heading tracking-[0.3em] uppercase">
              {product.name}
            </h2>
            <p className="mt-3 text-sm text-gray-300 font-body">{product.description}</p>
          </div>

          <div className="space-y-2">
            <a
              href={product.tpopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 min-w-[180px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              SHOP ON TPOP
            </a>
            <p className="text-xs text-gray-500 font-mono tracking-wide">Fulfilled on demand.</p>
          </div>
      </div>
    </div>
  );
};

const Merch: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover object-[center_35%] scale-[1.12]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={merchHeroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <Reveal as="div">
            <h1
              className="font-heading text-4xl md:text-6xl tracking-[0.4em] uppercase"
              style={{ textShadow: '0 4px 18px rgba(0, 0, 0, 0.35)' }}
            >
              MERCH
            </h1>
            <p className="mt-4 text-sm md:text-base text-gray-300 font-body tracking-wide">
              Print on demand. Made when you order.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-12 space-y-16">
          {MERCH_PRODUCTS.map((product, index) => (
            <Reveal
              key={product.id}
              as="article"
              className="mx-auto max-w-5xl border-b border-white/10 pb-16 last:border-b-0 last:pb-0"
              delay={Math.min(index * 100, 200)}
            >
              <MerchCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Merch;
