import 'dotenv/config';
import { syncBandcampReleases } from './bandcampSync.js';

try {
  const { releases: _releases, ...result } = await syncBandcampReleases();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('[Bandcamp Sync] Manual sync failed:', error.message);
  process.exitCode = 1;
}
