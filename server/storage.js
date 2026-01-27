import { promises as fs } from 'fs';
import path from 'path';

const storagePath = path.resolve('server', 'data', 'orders.json');

const ensureStorage = async () => {
  await fs.mkdir(path.dirname(storagePath), { recursive: true });
  try {
    await fs.access(storagePath);
  } catch {
    await fs.writeFile(storagePath, JSON.stringify([]));
  }
};

const loadOrders = async () => {
  await ensureStorage();
  const contents = await fs.readFile(storagePath, 'utf-8');
  try {
    return JSON.parse(contents);
  } catch {
    return [];
  }
};

const storeOrder = async (record) => {
  const orders = await loadOrders();
  orders.push(record);
  await fs.writeFile(storagePath, JSON.stringify(orders, null, 2));
  return record;
};

export { loadOrders, storeOrder };
