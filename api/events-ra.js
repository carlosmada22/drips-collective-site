import { loadRAEvents, scrapeRAEvents } from '../server/raSync.js';

export const maxDuration = 60;

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { events } = await scrapeRAEvents();
    response.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
    return response.status(200).json({
      events,
      syncedAt: new Date().toISOString(),
      source: 'resident-advisor',
    });
  } catch (error) {
    console.error('[RA API] Live synchronization failed:', error.message);

    const cachedEvents = await loadRAEvents();
    if (cachedEvents.length > 0) {
      response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
      return response.status(200).json({
        events: cachedEvents,
        syncedAt: null,
        source: 'bundled-fallback',
        stale: true,
      });
    }

    return response.status(502).json({ error: 'Unable to load Resident Advisor events.' });
  }
}
