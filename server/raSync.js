import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';

const RA_GRAPHQL_URL = 'https://ra.co/graphql';
const RA_PROMOTER_ID = process.env.RA_PROMOTER_ID || '157991';
const RA_EVENT_BASE_URL = 'https://ra.co/events';
const RA_ARCHIVE_START_YEAR = Number(process.env.RA_ARCHIVE_START_YEAR || 2023);
const RA_SYNC_CRON = process.env.RA_SYNC_CRON || '0 */6 * * *';
const REQUEST_DELAY_MS = Number(process.env.RA_REQUEST_DELAY_MS || 500);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const EVENTS_FILE = path.join(DATA_DIR, 'events_ra.json');
let schedulerStarted = false;
let activeSync = null;

const PROMOTER_EVENTS_QUERY = `
  query GET_PROMOTER_EVENTS($id: ID!, $type: EventQueryType!, $year: Int) {
    promoter(id: $id) {
      id
      name
      events(limit: 100, type: $type, year: $year) { id }
    }
  }
`;

const EVENT_DETAIL_QUERY = `
  query GET_EVENT($id: ID!) {
    event(id: $id) {
      id title date startTime endTime content contentUrl flyerFront
      images { filename type }
      venue { name address area { name } country { name } }
      area { name }
      artists { name }
      promoters { name }
    }
  }
`;

const delay = (ms = REQUEST_DELAY_MS) =>
  ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();

const executeRAQuery = async (query, variables) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(RA_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://ra.co/',
        'User-Agent': 'DRIPS event sync (https://www.dripscollective.com)',
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`RA request failed with HTTP ${response.status}`);
    const payload = await response.json();
    if (payload.errors?.length) {
      throw new Error(payload.errors.map((error) => error.message).join('; '));
    }
    return payload.data || {};
  } finally {
    clearTimeout(timeout);
  }
};

const pickFirstString = (...values) => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
};

const slugify = (value = '') =>
  value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 64);

const normalizePoster = (eventNode = {}) => {
  const images = Array.isArray(eventNode.images) ? eventNode.images : [];
  const front = images.find((image) => image?.type === 'FLYERFRONT');
  return pickFirstString(front?.filename, eventNode.flyerFront, images[0]?.filename);
};

const formatTime = (value = '') => {
  const match = value.match(/T(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '';
};

const buildTimeRange = (startTime = '', endTime = '') => {
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  if (start && end) return `${start} - ${end}`;
  return start || end || 'Check RA for schedule';
};

const buildDescription = (eventNode = {}) => {
  const content = pickFirstString(eventNode.content);
  const lineup = (eventNode.artists || []).map((artist) => pickFirstString(artist?.name))
    .filter(Boolean).join(', ');
  if (content && lineup && !content.toLowerCase().includes('lineup')) {
    return `${content}\n\nLineup: ${lineup}`;
  }
  return content || (lineup ? `Lineup: ${lineup}` : 'See Resident Advisor for event details.');
};

const mapRAEvent = (eventNode) => {
  const id = String(eventNode?.id || '');
  const title = pickFirstString(eventNode?.title, `RA Event ${id}`);
  const venue = eventNode?.venue || {};
  const city = pickFirstString(venue.area?.name, eventNode?.area?.name);
  const country = pickFirstString(venue.country?.name);
  const cityCountry = [city, country].filter(Boolean).join(', ');
  const promoters = (eventNode?.promoters || []).map((promoter) => pickFirstString(promoter?.name))
    .filter(Boolean);
  const raUrl = `${RA_EVENT_BASE_URL}/${id}`;
  const startDateTimeISO = pickFirstString(eventNode.startTime, eventNode.date);

  return {
    id,
    source: 'resident-advisor',
    displayTitle: title,
    fullTitle: title,
    slug: `ra-${id}-${slugify(title) || 'event'}`,
    poster: normalizePoster(eventNode),
    startDateTimeISO,
    endDateTimeISO: pickFirstString(eventNode.endTime) || undefined,
    timeRange: buildTimeRange(eventNode.startTime, eventNode.endTime),
    venueName: pickFirstString(venue.name, 'TBA'),
    venueAddress: pickFirstString(venue.address),
    cityCountry: cityCountry || undefined,
    promoters: promoters.length ? promoters : ['DRIPS'],
    description: buildDescription(eventNode),
    raUrl,
    lastSyncedAt: new Date().toISOString(),
    title,
    date: startDateTimeISO,
    venue: pickFirstString(venue.name, 'TBA'),
    city: cityCountry,
    raLink: raUrl,
  };
};

const getPromoterEventIds = async () => {
  const ids = new Set();
  const currentYear = new Date().getUTCFullYear();
  const latestData = await executeRAQuery(PROMOTER_EVENTS_QUERY, {
    id: RA_PROMOTER_ID, type: 'LATEST', year: null,
  });
  if (!latestData.promoter) throw new Error(`RA promoter ${RA_PROMOTER_ID} was not found`);
  latestData.promoter.events?.forEach((event) => event?.id && ids.add(String(event.id)));

  for (let year = RA_ARCHIVE_START_YEAR; year <= currentYear; year += 1) {
    const archiveData = await executeRAQuery(PROMOTER_EVENTS_QUERY, {
      id: RA_PROMOTER_ID, type: 'ARCHIVE', year,
    });
    archiveData.promoter?.events?.forEach((event) => event?.id && ids.add(String(event.id)));
    await delay();
  }
  if (ids.size === 0) throw new Error('RA returned no events; preserving the existing cache');
  return Array.from(ids);
};

const fetchEventDetail = async (eventId) => {
  const data = await executeRAQuery(EVENT_DETAIL_QUERY, { id: eventId });
  if (!data.event?.id) throw new Error(`RA event ${eventId} was not found`);
  return mapRAEvent(data.event);
};

export const scrapeRAEvents = async () => {
  const eventIds = await getPromoterEventIds();
  const events = [];
  const failedIds = [];
  for (const eventId of eventIds) {
    try {
      events.push(await fetchEventDetail(eventId));
    } catch (error) {
      failedIds.push(eventId);
      console.error(`[RA Sync] Failed to fetch event ${eventId}:`, error.message);
    }
    await delay();
  }
  if (events.length === 0) {
    throw new Error('RA event detail requests all failed; preserving the existing cache');
  }
  return { events, eventIds, failedIds };
};

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(EVENTS_FILE); } catch { await fs.writeFile(EVENTS_FILE, '[]\n', 'utf-8'); }
};

export const loadRAEvents = async () => {
  await ensureDataFile();
  try {
    const parsed = JSON.parse(await fs.readFile(EVENTS_FILE, 'utf-8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read RA events JSON:', error);
    return [];
  }
};

const writeEventsAtomically = async (events) => {
  const temporaryFile = `${EVENTS_FILE}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(events, null, 2)}\n`, 'utf-8');
  await fs.rename(temporaryFile, EVENTS_FILE);
};

const performSync = async () => {
  const existingEvents = await loadRAEvents();
  const existingById = new Map(existingEvents.map((event) => [String(event.id), event]));
  const { events: fetchedEvents, eventIds, failedIds } = await scrapeRAEvents();
  const fetchedById = new Map(fetchedEvents.map((event) => [String(event.id), event]));
  failedIds.forEach((id) => {
    const existing = existingById.get(String(id));
    if (existing) fetchedById.set(String(id), existing);
  });
  const reconciled = eventIds.map((id) => fetchedById.get(String(id))).filter(Boolean)
    .sort((a, b) => new Date(a.startDateTimeISO).getTime() - new Date(b.startDateTimeISO).getTime());
  const added = reconciled.filter((event) => !existingById.has(String(event.id))).length;
  const updated = reconciled.filter((event) => {
    const existing = existingById.get(String(event.id));
    if (!existing) return false;
    const { lastSyncedAt: _oldSync, ...oldComparable } = existing;
    const { lastSyncedAt: _newSync, ...newComparable } = event;
    return JSON.stringify(oldComparable) !== JSON.stringify(newComparable);
  }).length;
  const removed = existingEvents.filter((event) => !eventIds.includes(String(event.id))).length;
  await writeEventsAtomically(reconciled);
  return { total: reconciled.length, added, updated, removed, failed: failedIds.length };
};

export const syncRAEvents = async () => {
  if (activeSync) return activeSync;
  activeSync = performSync().finally(() => { activeSync = null; });
  return activeSync;
};

const logSyncResult = (label, result) => {
  console.log(`[RA Sync] ${label}. Added ${result.added}, updated ${result.updated}, removed ${result.removed}, failed ${result.failed}, total ${result.total}.`);
};

export const startRASyncScheduler = () => {
  if (schedulerStarted || process.env.RA_SYNC_ENABLED === 'false') return;
  schedulerStarted = true;
  syncRAEvents().then((result) => logSyncResult('Initial sync complete', result))
    .catch((error) => console.error('[RA Sync] Initial sync failed:', error.message));
  cron.schedule(RA_SYNC_CRON, async () => {
    try { logSyncResult('Scheduled sync complete', await syncRAEvents()); }
    catch (error) { console.error('[RA Sync] Scheduled sync failed:', error.message); }
  });
};
