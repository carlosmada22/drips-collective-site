import React from 'react';
import { MerchColorOption } from '../../src/data/merchCatalog';

type VariantSelectorProps = {
  colors: MerchColorOption[];
  sizes: string[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (colorKey: string) => void;
  onSizeChange: (size: string) => void;
};

const VariantSelector: React.FC<VariantSelectorProps> = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">Color</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((color) => {
            const isActive = color.key === selectedColor;
            return (
              <button
                key={color.key}
                type="button"
                onClick={() => onColorChange(color.key)}
                className={`flex items-center gap-3 px-4 py-2 border text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-white/20 text-gray-300 hover:border-white/60'
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-white/30"
                  style={{ backgroundColor: color.swatch || '#111' }}
                />
                {color.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-body">Size</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {sizes.map((size) => {
            const isActive = size === selectedSize;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSizeChange(size)}
                className={`px-4 py-2 border text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive
                    ? 'border-white text-white'
                    : 'border-white/20 text-gray-300 hover:border-white/60'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VariantSelector;
