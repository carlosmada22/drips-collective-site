import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const BANDCAMP_MUSIC_URL = 'https://dripslabel.bandcamp.com/music';
const BANDCAMP_BASE_URL = 'https://dripslabel.bandcamp.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const RELEASES_FILE = path.join(DATA_DIR, 'bandcamp_releases.json');
let activeSync = null;

const buildEmbedSrc = (albumId) =>
  `https://bandcamp.com/EmbeddedPlayer/album=${albumId}/size=large/bgcol=000000/linkcol=ffffff/tracklist=true/transparent=true/`;

export const fetchBandcampReleases = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(BANDCAMP_MUSIC_URL, {
      headers: {
        'User-Agent': 'DRIPS release sync (https://www.dripscollective.com)',
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Bandcamp request failed with HTTP ${response.status}`);

    const $ = cheerio.load(await response.text());
    const releases = [];

    $('.music-grid-item[data-item-id^="album-"]').each((_, element) => {
      const item = $(element);
      const albumId = (item.attr('data-item-id') || '').replace(/^album-/, '');
      const anchor = item.find('a[href^="/album/"]').first();
      const href = anchor.attr('href') || '';
      const titleNode = item.find('.title').first().clone();
      const artist = titleNode.find('.artist-override').text().trim();
      titleNode.find('.artist-override').remove();
      titleNode.find('br').remove();
      const title = titleNode.text().replace(/\s+/g, ' ').trim();
      const artwork = item.find('.art img').first().attr('src') || '';

      if (!albumId || !href || !title) return;
      releases.push({
        id: albumId,
        slug: href.split('/').filter(Boolean).pop() || albumId,
        title,
        artist: artist || 'DRIPS',
        artwork,
        url: new URL(href, BANDCAMP_BASE_URL).toString(),
        embedSrc: buildEmbedSrc(albumId),
      });
    });

    if (releases.length === 0) {
      throw new Error('Bandcamp returned no releases; preserving the existing cache');
    }
    return releases;
  } finally {
    clearTimeout(timeout);
  }
};

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(RELEASES_FILE); }
  catch { await fs.writeFile(RELEASES_FILE, '[]\n', 'utf-8'); }
};

export const loadBandcampReleases = async () => {
  await ensureDataFile();
  try {
    const parsed = JSON.parse(await fs.readFile(RELEASES_FILE, 'utf-8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[Bandcamp Sync] Failed to read release cache:', error);
    return [];
  }
};

const performSync = async () => {
  const existing = await loadBandcampReleases();
  const releases = await fetchBandcampReleases();
  const existingById = new Map(existing.map((release) => [String(release.id), release]));
  const added = releases.filter((release) => !existingById.has(String(release.id))).length;
  const updated = releases.filter((release) => {
    const previous = existingById.get(String(release.id));
    return previous && JSON.stringify(previous) !== JSON.stringify(release);
  }).length;
  const removed = existing.filter(
    (release) => !releases.some((current) => String(current.id) === String(release.id))
  ).length;
  const temporaryFile = `${RELEASES_FILE}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(releases, null, 2)}\n`, 'utf-8');
  await fs.rename(temporaryFile, RELEASES_FILE);
  return { releases, total: releases.length, added, updated, removed };
};

export const syncBandcampReleases = async () => {
  if (activeSync) return activeSync;
  activeSync = performSync().finally(() => { activeSync = null; });
  return activeSync;
};
