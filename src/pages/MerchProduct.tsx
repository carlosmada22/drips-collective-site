import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../../components/Reveal';
import CartPanel from '../../components/merch/CartPanel';
import VariantSelector from '../../components/merch/VariantSelector';
import { useCart } from '../context/CartContext';
import { findMerchProduct, formatPrice } from '../data/merchCatalog';

const MerchProduct: React.FC = () => {
  const { id } = useParams();
  const product = findMerchProduct(id ?? '');
  const { addItem } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.key ?? '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? '');

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.key ?? '');
      setSelectedSize(product.sizes[0] ?? '');
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product) {
    return (
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-gray-300 font-body">Merch item not found.</p>
          <Link
            to="/merch"
            className="inline-flex mt-6 items-center justify-center px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm"
          >
            Back to Merch
          </Link>
        </div>
      </section>
    );
  }

  const activeImage = product.images[activeImageIndex] ?? product.images[0];
  const variantKey = `${selectedColor}|${selectedSize}`;
  const variantId = product.variantMap[variantKey];
  const isVariantReady = Boolean(variantId);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      colorKey: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div className="bg-black text-white">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            to="/merch"
            className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
          >
            Back to Merch
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] gap-12">
          <div className="space-y-10">
            <Reveal as="div" className="space-y-6">
              <div className="relative overflow-hidden bg-gray-900 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
                {activeImage && (
                  <img src={activeImage} alt={`${product.name} mockup`} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex flex-wrap gap-3">
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
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div className="space-y-10">
              <div>
                <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">DRIPS Collective</p>
                <h1 className="mt-3 text-3xl md:text-4xl font-heading tracking-[0.3em] uppercase">
                  {product.name}
                </h1>
                <p className="mt-3 text-sm text-gray-300 font-body max-w-xl">{product.description}</p>
                <p className="mt-4 text-xl tracking-[0.3em] font-heading">{formatPrice(product.priceCents)}</p>
              </div>

              <VariantSelector
                colors={product.colors}
                sizes={product.sizes}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onColorChange={setSelectedColor}
                onSizeChange={setSelectedSize}
              />

              {!isVariantReady && (
                <p className="text-xs text-amber-400 font-mono tracking-wide">
                  Variant not configured yet. Replace Printful variant IDs to enable checkout.
                </p>
              )}

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isVariantReady}
                  className="inline-flex items-center justify-center px-10 py-4 min-w-[180px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24 h-fit">
            <CartPanel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchProduct;
