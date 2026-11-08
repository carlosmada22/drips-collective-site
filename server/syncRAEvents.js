import 'dotenv/config';
import { syncRAEvents } from './raSync.js';

try {
  console.log(JSON.stringify(await syncRAEvents(), null, 2));
} catch (error) {
  console.error('[RA Sync] Manual sync failed:', error.message);
  process.exitCode = 1;
}
