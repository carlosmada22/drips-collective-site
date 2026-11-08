import 'dotenv/config';
import { syncSoundCloudTracks } from './soundcloudSync.js';

try {
  const { tracks: _tracks, ...result } = await syncSoundCloudTracks();
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('[SoundCloud Sync] Manual sync failed:', error.message);
  process.exitCode = 1;
}
