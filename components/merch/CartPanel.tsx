import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../src/context/CartContext';
import { findMerchProduct, formatPrice } from '../../src/data/merchCatalog';

const CartPanel: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, itemCount, subtotalCents } = useCart();

  if (items.length === 0) {
    return (
      <div className="border border-white/10 p-6 bg-black/60">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">Cart</p>
        <p className="mt-4 text-sm text-gray-300 font-body">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="border border-white/10 p-6 bg-black/60 space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">Cart</p>
        <span className="text-xs text-gray-400 font-mono">{itemCount} items</span>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const product = findMerchProduct(item.productId);
          if (!product) {
            return null;
          }
          return (
            <div key={`${item.productId}-${item.colorKey}-${item.size}`} className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-widest font-heading">{product.name}</p>
                  <p className="text-xs text-gray-400 font-mono tracking-wide">
                    {item.colorKey.toUpperCase()} / {item.size}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-xs text-gray-500 hover:text-white uppercase tracking-[0.2em]"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 border border-white/10">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="px-3 py-1 text-xs text-gray-300 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs text-gray-200 font-mono">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="px-3 py-1 text-xs text-gray-300 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-200 font-mono">
                  {formatPrice(product.priceCents * item.quantity)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="flex items-center justify-between text-sm font-mono text-gray-300">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalCents)}</span>
        </div>
        <Link
          to="/checkout"
          className="inline-flex w-full items-center justify-center px-6 py-3 bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-xs font-medium"
        >
          Checkout
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="w-full text-xs text-gray-500 hover:text-white uppercase tracking-[0.2em]"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
