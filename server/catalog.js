const MERCH_CATALOG = {
  currency: 'eur',
  products: [
    {
      id: 'hoodie',
      name: 'DRIPS | HOODIE',
      description: 'Heavyweight fleece with a clean front mark and relaxed street fit.',
      priceCents: 5000,
      colors: [
        { key: 'black', label: 'Black' },
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
      name: 'DRIPS | T-SHIRT',
      description: 'Soft-touch cotton tee with tonal graphics and a clean neckline.',
      priceCents: 3500,
      colors: [
        { key: 'black', label: 'Black' },
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

const findProduct = (productId) => MERCH_CATALOG.products.find((product) => product.id === productId);

const resolveVariantId = (productId, colorKey, size) => {
  const product = findProduct(productId);
  if (!product) {
    return null;
  }
  const key = `${colorKey}|${size}`;
  const variantId = product.variantMap[key];
  if (!variantId) {
    return null;
  }
  return variantId;
};

const getUnitPrice = (productId) => {
  const product = findProduct(productId);
  return product ? product.priceCents : null;
};

export { MERCH_CATALOG, findProduct, resolveVariantId, getUnitPrice };
