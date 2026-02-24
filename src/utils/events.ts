import type { Event } from '../../types';

export const parseEventDate = (event: Event) => {
  return new Date(event.startDateTimeISO);
};

const getEventTime = (event: Event) => {
  const time = parseEventDate(event).getTime();
  return Number.isNaN(time) ? 0 : time;
};

export const getEventStatus = (event: Event, now = new Date()) => {
  return getEventTime(event) >= now.getTime() ? 'upcoming' : 'past';
};

export const sortUpcoming = (events: Event[], now = new Date()) => {
  return events
    .filter((event) => getEventStatus(event, now) === 'upcoming')
    .sort((a, b) => getEventTime(a) - getEventTime(b));
};

export const sortPast = (events: Event[], now = new Date()) => {
  return events
    .filter((event) => getEventStatus(event, now) === 'past')
    .sort((a, b) => getEventTime(b) - getEventTime(a));
};

export const getOrderedEvents = (events: Event[], now = new Date()) => {
  return {
    upcoming: sortUpcoming(events, now),
    past: sortPast(events, now),
  };
};

export const getHomeFeaturedEvents = (events: Event[], now = new Date()) => {
  const upcomingSorted = sortUpcoming(events, now);
  const pastSorted = sortPast(events, now);
  const featured = [...upcomingSorted.slice(0, 2)];
  if (featured.length < 2) {
    featured.push(...pastSorted.slice(0, 2 - featured.length));
  }
  return featured;
};
