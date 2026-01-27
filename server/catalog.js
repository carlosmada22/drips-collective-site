const MERCH_CATALOG = {
  currency: 'usd',
  products: [
    {
      id: 'hoodie',
      name: 'DRIPS | HOODIE',
      description: 'Heavyweight fleece with a clean front mark and relaxed street fit.',
      priceCents: 8500,
      colors: [
        { key: 'black', label: 'Black' },
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
      name: 'DRIPS | T-SHIRT',
      description: 'Soft-touch cotton tee with tonal graphics and a clean neckline.',
      priceCents: 4500,
      colors: [
        { key: 'black', label: 'Black' },
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
