const PRINTFUL_BASE_URL = 'https://api.printful.com';

const callPrintful = async (path, method = 'GET', body) => {
  const token = process.env.PRINTFUL_API_TOKEN;
  if (!token) {
    throw new Error('Missing PRINTFUL_API_TOKEN');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  if (process.env.PRINTFUL_STORE_ID) {
    headers['X-PF-Store-Id'] = process.env.PRINTFUL_STORE_ID;
  }

  const response = await fetch(`${PRINTFUL_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || data?.message || 'Printful API error';
    const err = new Error(message);
    err.status = response.status;
    err.details = data;
    throw err;
  }

  return data?.result ?? data;
};

const getShippingRates = async (recipient, items) => {
  return callPrintful('/shipping/rates', 'POST', { recipient, items });
};

const createOrder = async (orderPayload, confirm = false) => {
  const confirmParam = confirm ? 'true' : 'false';
  return callPrintful(`/orders?confirm=${confirmParam}`, 'POST', orderPayload);
};

export { callPrintful, getShippingRates, createOrder };
