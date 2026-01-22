import React from 'react';
import { Link } from 'react-router-dom';
import { EVENTS } from '../../constants';
import { Event } from '../../types';
import eventsHero from '../assets/footer-bg.jpg';

const getEventTime = (event: Event) => {
  const time = Date.parse(event.dateStart);
  return Number.isNaN(time) ? 0 : time;
};

const formatDateRange = (event: Event) =>
  event.dateEnd ? `${event.dateStart} - ${event.dateEnd}` : event.dateStart;

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const eventLink = event.slug ? `/events/${event.slug}` : '/events';

  return (
    <article className="py-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="relative h-56 md:h-64 overflow-hidden bg-gray-900 shadow-2xl">
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-5 text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-white">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-gray-300 font-mono tracking-wide">{formatDateRange(event)}</p>
            {event.location && (
              <p className="mt-2 text-xs text-gray-500 font-mono tracking-[0.3em] uppercase">
                {event.location}
              </p>
            )}
          </div>

          <div className="md:pt-1 shrink-0 flex justify-center md:justify-end">
            <Link
              to={eventLink}
              className="inline-flex items-center justify-center px-10 py-4 min-w-[180px] bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              VIEW EVENT
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Events: React.FC = () => {
  const now = Date.now();
  const upcomingEvents = EVENTS.filter((event) => getEventTime(event) >= now).sort(
    (a, b) => getEventTime(a) - getEventTime(b)
  );
  const pastEvents = EVENTS.filter((event) => getEventTime(event) < now).sort(
    (a, b) => getEventTime(b) - getEventTime(a)
  );

  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={eventsHero} alt="Events hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <h1 className="font-heading text-4xl md:text-6xl tracking-[0.4em] uppercase">EVENTS</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">UPCOMING</h2>

          {upcomingEvents.length === 0 ? (
            <p className="mt-8 text-sm text-gray-500 font-mono tracking-wide">
              No upcoming events yet.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-white/10">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">PAST</h2>

          <div className="mt-4 divide-y divide-white/10">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
