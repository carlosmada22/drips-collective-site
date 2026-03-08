import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import cron from 'node-cron';
import puppeteer from 'puppeteer';

const RA_PROMOTER_URL = 'https://ra.co/promoters/157991';
const RA_EVENT_BASE_URL = 'https://ra.co/events';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events_ra.json');
let schedulerStarted = false;

const createBrowserFetcher = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36'
  );

  const fetchHtml = async (url) => {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    return page.content();
  };

  return {
    fetchHtml,
    close: async () => {
      await browser.close();
    },
  };
};

const parseNextData = (html) => {
  const $ = cheerio.load(html);
  const scriptContent = $('script#__NEXT_DATA__').html();
  if (!scriptContent) {
    throw new Error('Missing __NEXT_DATA__ script');
  }
  return JSON.parse(scriptContent);
};

const findObjectWithKeys = (value, requiredKeys) => {
  if (!value || typeof value !== 'object') return null;
  if (requiredKeys.every((key) => key in value)) return value;

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findObjectWithKeys(item, requiredKeys);
      if (found) return found;
    }
    return null;
  }

  for (const nested of Object.values(value)) {
    const found = findObjectWithKeys(nested, requiredKeys);
    if (found) return found;
  }

  return null;
};

const collectEventIds = (value, bucket = new Set()) => {
  if (!value) return bucket;

  if (Array.isArray(value)) {
    value.forEach((entry) => collectEventIds(entry, bucket));
    return bucket;
  }

  if (typeof value !== 'object') {
    if (typeof value === 'string') {
      const id = getEventIdFromLink(value);
      if (id) bucket.add(id);
    }
    return bucket;
  }

  Object.values(value).forEach((entry) => collectEventIds(entry, bucket));
  return bucket;
};

const pickFirstString = (...values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
};

const delay = (ms = 1500) => new Promise((resolve) => setTimeout(resolve, ms));

const getEventIdFromLink = (value = '') => value.match(/\/events\/(\d+)/i)?.[1] || null;

const normalizePoster = (value = '') => {
  if (!value) return '';
  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return `https://ra.co${value}`;
  return value;
};

const normalizeDate = (value = '') => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
};

const slugify = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const parsePromoters = (text = '') => {
  const chunks = text
    .split(/,|•|·|\||\//g)
    .map((entry) => entry.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const unique = new Set(['DRIPS']);
  chunks.forEach((entry) => unique.add(entry));
  return Array.from(unique);
};

const pickVenueName = (eventNode = {}) => {
  const venue = eventNode.venue || eventNode.location || {};
  return pickFirstString(eventNode.venueName, venue.name, venue.title, eventNode.club?.name);
};

const pickVenueAddress = (eventNode = {}) => {
  const venue = eventNode.venue || eventNode.location || {};
  const address = venue.address || {};
  return pickFirstString(
    eventNode.venueAddress,
    venue.address,
    address.streetAddress,
    address.addressLocality,
    address.name
  );
};

const pickCity = (eventNode = {}) => {
  const venue = eventNode.venue || eventNode.location || {};
  const address = venue.address || {};
  return pickFirstString(eventNode.city, venue.city, address.addressLocality);
};

const pickLineup = (eventNode = {}) => {
  const artists = Array.isArray(eventNode.artists) ? eventNode.artists : [];
  if (!artists.length) return '';
  return artists
    .map((artist) => pickFirstString(artist?.name, artist?.title))
    .filter(Boolean)
    .join(', ');
};

const extractEventFromNextData = (jsonData) => {
  const pageProps = jsonData?.props?.pageProps || {};
  return (
    pageProps?.event ||
    pageProps?.data?.event ||
    findObjectWithKeys(pageProps, ['id', 'title']) ||
    {}
  );
};

const pickPoster = (eventNode = {}, pageProps = {}) => {
  const image = eventNode.image || eventNode.images?.[0] || {};
  const openGraph = pageProps?.openGraph || pageProps?.seo || {};
  return normalizePoster(
    pickFirstString(image.url, image.src, eventNode.poster, openGraph.image, openGraph.imageUrl)
  );
};

const buildDescription = (eventNode = {}, lineup = '') => {
  const description = pickFirstString(
    eventNode.content,
    eventNode.description,
    eventNode.summary,
    eventNode.blurb
  );

  if (description && lineup) {
    return `${description}\n\nLineup: ${lineup}`;
  }

  return description || (lineup ? `Lineup: ${lineup}` : '');
};

const extractEventIdsFromPromoter = async (fetchHtml) => {
  const html = await fetchHtml(RA_PROMOTER_URL);

  try {
    const jsonData = parseNextData(html);
    const idsFromJson = Array.from(collectEventIds(jsonData?.props?.pageProps));
    if (idsFromJson.length > 0) {
      return idsFromJson;
    }
  } catch {
    // Fall back to anchor extraction.
  }

  const $ = cheerio.load(html);
  const ids = new Set();

  $('a[href*="/events/"]').each((_, element) => {
    const href = $(element).attr('href') || '';
    const id = getEventIdFromLink(href);
    if (id) {
      ids.add(id);
    }
  });

  return Array.from(ids);
};

const scrapeEventPage = async (eventId, fetchHtml) => {
  const url = `${RA_EVENT_BASE_URL}/${eventId}`;
  const html = await fetchHtml(url);
  const jsonData = parseNextData(html);
  const pageProps = jsonData?.props?.pageProps || {};
  const eventNode = extractEventFromNextData(jsonData);

  const title = pickFirstString(eventNode.title, eventNode.name, pageProps?.title);
  const dateRaw = pickFirstString(
    eventNode.date,
    eventNode.startDate,
    eventNode.startTime,
    eventNode.startsAt
  );
  const lineup = pickLineup(eventNode);
  const poster = pickPoster(eventNode, pageProps);
  const venueName = pickVenueName(eventNode);
  const venueAddress = pickVenueAddress(eventNode);
  const city = pickCity(eventNode);
  const description = buildDescription(eventNode, lineup);

  const promotersRaw = pickFirstString(
    eventNode.promoterName,
    eventNode.promoter?.name,
    eventNode.promoters?.map?.((p) => p?.name).filter(Boolean).join(', ')
  );

  const promoters = parsePromoters(promotersRaw);
  const isoDate = normalizeDate(dateRaw);
  const safeTitle = title || `RA Event ${eventId}`;
  const safeSlug = slugify(safeTitle) || `ra-event-${eventId}`;

  // Keep both DRIPS Event fields and legacy RA fields for compatibility.
  return {
    id: eventId,
    displayTitle: safeTitle,
    fullTitle: safeTitle,
    slug: safeSlug,
    poster,
    startDateTimeISO: isoDate,
    timeRange: '',
    venueName: venueName || '',
    venueAddress: venueAddress || '',
    promoters,
    description: description || '',
    raUrl: `${RA_EVENT_BASE_URL}/${eventId}`,
    title: safeTitle,
    date: isoDate,
    venue: venueName || '',
    city,
    raLink: `${RA_EVENT_BASE_URL}/${eventId}`,
  };
};

export const scrapeRAEvents = async () => {
  const { fetchHtml, close } = await createBrowserFetcher();

  try {
    const eventIds = await extractEventIdsFromPromoter(fetchHtml);
    const events = [];

    for (const eventId of eventIds) {
      try {
        const event = await scrapeEventPage(eventId, fetchHtml);
        events.push(event);
      } catch (error) {
        console.error(`[RA Sync] Failed to scrape event ${eventId}:`, error.message);
      }
      await delay(1500);
    }

    return events;
  } finally {
    await close();
  }
};

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(EVENTS_FILE);
  } catch {
    await fs.writeFile(EVENTS_FILE, '[]\n', 'utf-8');
  }
};

export const loadRAEvents = async () => {
  await ensureDataFile();
  try {
    const content = await fs.readFile(EVENTS_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read RA events JSON:', error);
    return [];
  }
};

export const syncRAEvents = async () => {
  await ensureDataFile();

  const existingEvents = await loadRAEvents();
  const latestEvents = await scrapeRAEvents();
  const existingIds = new Set(existingEvents.map((event) => String(event.id)));
  const newEvents = latestEvents.filter((event) => event?.id && !existingIds.has(String(event.id)));
  const merged = [...existingEvents, ...newEvents];

  await fs.writeFile(EVENTS_FILE, `${JSON.stringify(merged, null, 2)}\n`, 'utf-8');
  return { total: merged.length, added: newEvents.length };
};

export const startRASyncScheduler = () => {
  if (schedulerStarted) {
    return;
  }
  schedulerStarted = true;

  syncRAEvents()
    .then((result) => {
      console.log(`[RA Sync] Initial sync complete. Added ${result.added}, total ${result.total}.`);
    })
    .catch((error) => {
      console.error('[RA Sync] Initial sync failed:', error.message);
    });

  cron.schedule('0 */6 * * *', async () => {
    try {
      const result = await syncRAEvents();
      console.log(`[RA Sync] Scheduled sync complete. Added ${result.added}, total ${result.total}.`);
    } catch (error) {
      console.error('[RA Sync] Scheduled sync failed:', error.message);
    }
  });
};
