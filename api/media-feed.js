import { fetchBandcampReleases, loadBandcampReleases } from '../server/bandcampSync.js';
import { fetchLatestSoundCloudTracks, loadSoundCloudTracks } from '../server/soundcloudSync.js';

export const maxDuration = 60;

const withFallback = async (fetchLive, loadFallback) => {
  try {
    return { data: await fetchLive(), live: true };
  } catch (error) {
    console.error('[Media API] Live source failed:', error.message);
    return { data: await loadFallback(), live: false };
  }
};

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const [bandcamp, soundcloud] = await Promise.all([
    withFallback(fetchBandcampReleases, loadBandcampReleases),
    withFallback(fetchLatestSoundCloudTracks, loadSoundCloudTracks),
  ]);

  if (bandcamp.data.length === 0 && soundcloud.data.length === 0) {
    return response.status(502).json({ error: 'Unable to load media feeds.' });
  }

  const live = bandcamp.live && soundcloud.live;
  response.setHeader(
    'Cache-Control',
    live
      ? 'public, s-maxage=3600, stale-while-revalidate=86400'
      : 'public, s-maxage=300, stale-while-revalidate=3600'
  );
  return response.status(200).json({
    releases: bandcamp.data,
    tracks: soundcloud.data,
    syncedAt: live ? new Date().toISOString() : null,
    source: live ? 'bandcamp-and-soundcloud' : 'partial-fallback',
    stale: !live,
  });
}
