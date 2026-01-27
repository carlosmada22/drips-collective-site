import React from 'react';
import Reveal from '../../components/Reveal';
import ProductCard from '../../components/merch/ProductCard';
import CartPanel from '../../components/merch/CartPanel';
import merchHeroVideo from '../assets/merch/DRIPS_MODEL.mp4';
import { MERCH_CATALOG } from '../data/merchCatalog';

const Merch: React.FC = () => {
  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover object-[center_32%] scale-[1.12]"
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
        <div className="container mx-auto px-6 md:px-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-12">
          <div className="space-y-16">
            {MERCH_CATALOG.products.map((product, index) => (
              <Reveal
                key={product.id}
                as="article"
                className="mx-auto max-w-5xl border-b border-white/10 pb-16 last:border-b-0 last:pb-0"
                delay={Math.min(index * 100, 200)}
              >
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24 h-fit">
            <CartPanel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Merch;
