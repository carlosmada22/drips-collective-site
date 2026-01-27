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
  variantMap: Record<string, string | null>;
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
      priceCents: 8500,
      colors: [
        { key: 'black', label: 'Black', swatch: '#0b0b0b' },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      // Replace with real Printful variant_ids from your Printful store setup.
      variantMap: {
        'black|S': '6977d16c5da2d3',
        'black|M': '6977d16c5da373',
        'black|L': '6977d16c5da408',
        'black|XL': '6977d16c5da488',
        'black|XXL': '6977d16c5da512',
        'black|XXXL': '6977d16c5da593',
      },
    },
    {
      id: 'tshirt',
      name: 'DRIPS T-SHIRT (OVERSIZE)',
      description: 'Soft-touch cotton tee with tonal graphics and a clean neckline.',
      images: [tshirt1, tshirt2, tshirt3, tshirt4],
      priceCents: 4500,
      colors: [
        { key: 'black', label: 'Black', swatch: '#0b0b0b' },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      // Replace with real Printful variant_ids from your Printful store setup.
      variantMap: {
        'black|S': '69778588593ab1',
        'black|M': '69778588593b21',
        'black|L': '69778588593b83',
        'black|XL': '69778588593bd9',
        'black|XXL': '69778588593c22',
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
