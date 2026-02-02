import hoodie1 from '../assets/merch/hoodie/1.png';
import hoodie2 from '../assets/merch/hoodie/2.png';
import hoodie3 from '../assets/merch/hoodie/3.jpg';
import hoodie4 from '../assets/merch/hoodie/4.png';
import hoodie5 from '../assets/merch/hoodie/5.png';
import hoodie6 from '../assets/merch/hoodie/6.png';
import hoodie7 from '../assets/merch/hoodie/7.png';
import tshirt1 from '../assets/merch/tshirt/1.png';
import tshirt2 from '../assets/merch/tshirt/2.png';
import tshirt3 from '../assets/merch/tshirt/3.png';
import tshirt4 from '../assets/merch/tshirt/4.png';

export type MerchColorOption = {
  key: string;
  label: string;
  swatch?: string;
};

export type MerchProductConfig = {
  id: 'hoodie' | 'tshirt';
  name: string;
  description: string;
  images: string[];
  priceCents: number;
  colors: MerchColorOption[];
  sizes: string[];
  variantMap: Record<string, number | null>;
};

export type MerchCatalog = {
  currency: 'eur';
  products: MerchProductConfig[];
};

export const MERCH_CATALOG: MerchCatalog = {
  currency: 'eur',
  products: [
    {
      id: 'hoodie',
      name: 'DRIPS HOODIE (OVERSIZE)',
      description: 'Heavyweight fleece with a clean front mark and relaxed street fit.',
      images: [hoodie1, hoodie2, hoodie3, hoodie4, hoodie5, hoodie6, hoodie7],
      priceCents: 5000,
      colors: [
        { key: 'black', label: 'Black', swatch: '#0b0b0b' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      // Replace with real Printful variant_ids from your Printful store setup.
      variantMap: {
        'black|S': 10779,
        'black|M': 10780,
        'black|L': 10781,
        'black|XL': 10782,
        'black|2XL': 10783,
        'black|3XL': 13416,
      },
    },
    {
      id: 'tshirt',
      name: 'DRIPS T-SHIRT (OVERSIZE)',
      description: 'Soft-touch cotton tee with tonal graphics and a clean neckline.',
      images: [tshirt1, tshirt2, tshirt3, tshirt4],
      priceCents: 3500,
      colors: [
        { key: 'black', label: 'Black', swatch: '#0b0b0b' },
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      // Replace with real Printful variant_ids from your Printful store setup.
      variantMap: {
        'black|S': 21000,
        'black|M': 21006,
        'black|L': 21012,
        'black|XL': 21018,
        'black|2XL': 21024,
      },
    },
  ],
};

export const findMerchProduct = (id: string) =>
  MERCH_CATALOG.products.find((product) => product.id === id);

export const formatPrice = (amountCents: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: MERCH_CATALOG.currency,
  }).format(amountCents / 100);
