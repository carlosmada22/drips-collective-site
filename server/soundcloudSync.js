import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const SOUNDCLOUD_PROFILE_URL = 'https://soundcloud.com/drips-collective';
const SOUNDCLOUD_BASE_URL = 'https://soundcloud.com';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const TRACKS_FILE = path.join(DATA_DIR, 'soundcloud_tracks.json');
let activeSync = null;

const buildEmbedUrl = (trackUrl) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}` +
  '&color=%23111111&auto_play=false&hide_related=false&show_comments=false' +
  '&show_user=true&show_reposts=false&show_teaser=true&visual=true';

export const fetchLatestSoundCloudTracks = async () => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(SOUNDCLOUD_PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`SoundCloud request failed with HTTP ${response.status}`);
    // SoundCloud places its accessible track list inside <noscript>.
    const $ = cheerio.load(await response.text(), { scriptingEnabled: false });
    const tracks = [];

    $('article.audible[itemprop="track"]').slice(0, 3).each((_, element) => {
      const item = $(element);
      const anchor = item.find('a[itemprop="url"]').first();
      const href = anchor.attr('href') || '';
      const title = anchor.text().replace(/\s+/g, ' ').trim();
      const publishedAt = item.find('time[pubdate]').first().text().trim();
      if (!href || !title) return;
      const url = new URL(href, SOUNDCLOUD_BASE_URL).toString();
      tracks.push({
        id: href.split('/').filter(Boolean).pop() || href,
        title,
        url,
        embedUrl: buildEmbedUrl(url),
        publishedAt,
      });
    });

    if (tracks.length === 0) {
      throw new Error('SoundCloud returned no tracks; preserving the existing cache');
    }
    return tracks;
  } finally {
    clearTimeout(timeout);
  }
};

const ensureDataFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try { await fs.access(TRACKS_FILE); }
  catch { await fs.writeFile(TRACKS_FILE, '[]\n', 'utf-8'); }
};

export const loadSoundCloudTracks = async () => {
  await ensureDataFile();
  try {
    const parsed = JSON.parse(await fs.readFile(TRACKS_FILE, 'utf-8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[SoundCloud Sync] Failed to read track cache:', error);
    return [];
  }
};

const performSync = async () => {
  const existing = await loadSoundCloudTracks();
  const tracks = await fetchLatestSoundCloudTracks();
  const existingById = new Map(existing.map((track) => [track.id, track]));
  const added = tracks.filter((track) => !existingById.has(track.id)).length;
  const updated = tracks.filter((track) => {
    const previous = existingById.get(track.id);
    return previous && JSON.stringify(previous) !== JSON.stringify(track);
  }).length;
  const temporaryFile = `${TRACKS_FILE}.tmp`;
  await fs.writeFile(temporaryFile, `${JSON.stringify(tracks, null, 2)}\n`, 'utf-8');
  await fs.rename(temporaryFile, TRACKS_FILE);
  return { tracks, total: tracks.length, added, updated };
};

export const syncSoundCloudTracks = async () => {
  if (activeSync) return activeSync;
  activeSync = performSync().finally(() => { activeSync = null; });
  return activeSync;
};
