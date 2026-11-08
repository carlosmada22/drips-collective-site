import { fetchBandcampReleases, loadBandcampReleases } from '../server/bandcampSync.js';

export const maxDuration = 60;

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const releases = await fetchBandcampReleases();
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return response.status(200).json({
      releases,
      syncedAt: new Date().toISOString(),
      source: 'bandcamp',
    });
  } catch (error) {
    console.error('[Bandcamp API] Live synchronization failed:', error.message);
    const releases = await loadBandcampReleases();
    if (releases.length > 0) {
      response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
      return response.status(200).json({
        releases,
        syncedAt: null,
        source: 'bundled-fallback',
        stale: true,
      });
    }
    return response.status(502).json({ error: 'Unable to load Bandcamp releases.' });
  }
}
