import type { Event } from '../../types';

export interface RAEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  poster: string;
  raLink: string;
}

const normalizeRaLink = (value = '') => {
  const match = value.match(/\/events\/(\d+)/i);
  if (!match?.[1]) {
    return value;
  }
  return `https://ra.co/events/${match[1]}`;
};

const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
};

const mapRAEventToSiteEvent = (event: RAEvent): Event | null => {
  if (!event.id || !event.title || !event.date || !event.poster || !event.raLink) {
    return null;
  }

  const normalizedLink = normalizeRaLink(event.raLink);

  return {
    id: `ra-${event.id}`,
    displayTitle: event.title,
    fullTitle: event.title,
    slug: `ra-${event.id}-${slugify(event.title) || 'event'}`,
    poster: event.poster,
    startDateTimeISO: event.date,
    timeRange: 'Check RA for schedule',
    venueName: event.venue || 'TBA',
    venueAddress: '',
    cityCountry: event.city || undefined,
    promoters: ['DRIPS'],
    description: '',
    raUrl: normalizedLink,
  };
};

export const fetchRAEvents = async (signal?: AbortSignal) => {
  try {
    const response = await fetch('/api/events-ra', { signal });
    if (!response.ok) {
      return [] as RAEvent[];
    }
    const data = await response.json();
    return Array.isArray(data?.events) ? (data.events as RAEvent[]) : [];
  } catch {
    return [] as RAEvent[];
  }
};

export const mergeEventsWithRA = (localEvents: Event[], raEvents: RAEvent[]) => {
  const localRaLinks = new Set(localEvents.map((event) => normalizeRaLink(event.raUrl)));
  const localIds = new Set(localEvents.map((event) => event.id));
  const mappedRaEvents: Event[] = [];

  raEvents.forEach((event) => {
    const normalizedLink = normalizeRaLink(event.raLink);
    if (normalizedLink && localRaLinks.has(normalizedLink)) {
      return;
    }
    const mapped = mapRAEventToSiteEvent(event);
    if (!mapped || localIds.has(mapped.id)) {
      return;
    }
    localIds.add(mapped.id);
    mappedRaEvents.push(mapped);
  });

  return [...localEvents, ...mappedRaEvents];
};

