import type { Event } from '../../types';
import fallbackPoster from '../assets/bg/7h.png';

export interface RAEvent {
  id: string;
  displayTitle?: string;
  fullTitle?: string;
  slug?: string;
  poster?: string;
  startDateTimeISO?: string;
  endDateTimeISO?: string;
  timeRange?: string;
  venueName?: string;
  venueAddress?: string;
  cityCountry?: string;
  promoters?: string[];
  description?: string;
  raUrl?: string;
  title?: string;
  date?: string;
  venue?: string;
  city?: string;
  raLink?: string;
}

const normalizeRaLink = (value = '') => {
  const match = value.match(/\/events\/(\d+)/i);
  return match?.[1] ? `https://ra.co/events/${match[1]}` : value;
};

const slugify = (value: string) =>
  value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 64);

const mapRAEventToSiteEvent = (event: RAEvent): Event | null => {
  const title = event.displayTitle || event.title || '';
  const startDate = event.startDateTimeISO || event.date || '';
  const raUrl = normalizeRaLink(event.raUrl || event.raLink || '');
  if (!event.id || !title || !startDate || !raUrl) return null;
  return {
    id: `ra-${event.id}`,
    displayTitle: title,
    fullTitle: event.fullTitle || title,
    slug: event.slug || `ra-${event.id}-${slugify(title) || 'event'}`,
    poster: event.poster || fallbackPoster,
    startDateTimeISO: startDate,
    endDateTimeISO: event.endDateTimeISO,
    timeRange: event.timeRange || 'Check RA for schedule',
    venueName: event.venueName || event.venue || 'TBA',
    venueAddress: event.venueAddress || '',
    cityCountry: event.cityCountry || event.city || undefined,
    promoters: event.promoters?.length ? event.promoters : ['DRIPS'],
    description: event.description || 'See Resident Advisor for event details.',
    raUrl,
  };
};

export const fetchRAEvents = async (signal?: AbortSignal) => {
  try {
    const response = await fetch('/api/events-ra', { signal });
    if (!response.ok) return [] as RAEvent[];
    const data = await response.json();
    return Array.isArray(data?.events) ? (data.events as RAEvent[]) : [];
  } catch {
    return [] as RAEvent[];
  }
};

export const mergeEventsWithRA = (localEvents: Event[], raEvents: RAEvent[]) => {
  const mappedRA = raEvents.map(mapRAEventToSiteEvent)
    .filter((event): event is Event => event !== null);
  const raByLink = new Map(mappedRA.map((event) => [normalizeRaLink(event.raUrl), event]));
  const consumedLinks = new Set<string>();
  const reconciledLocal = localEvents.map((localEvent) => {
    const link = normalizeRaLink(localEvent.raUrl);
    const syncedEvent = raByLink.get(link);
    if (!syncedEvent) return localEvent;
    consumedLinks.add(link);
    return {
      ...localEvent,
      ...syncedEvent,
      id: localEvent.id,
      slug: localEvent.slug,
      poster: syncedEvent.poster || localEvent.poster,
    };
  });
  return [
    ...reconciledLocal,
    ...mappedRA.filter((event) => !consumedLinks.has(normalizeRaLink(event.raUrl))),
  ];
};
