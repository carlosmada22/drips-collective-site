import React from 'react';
import { Link } from 'react-router-dom';
import { EVENTS } from '../constants';
import { Event } from '../types';
import Marquee from './Marquee';
import Reveal from './Reveal';

const getEventTime = (event: Event) => {
  const time = Date.parse(event.startDateISO);
  return Number.isNaN(time) ? 0 : time;
};

const formatEventDate = (event: Event) => {
  const date = new Date(event.startDateISO);
  if (Number.isNaN(date.getTime())) {
    return event.startDateISO;
  }
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

const formatEventMonth = (event: Event) => {
  const date = new Date(event.startDateISO);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date).toUpperCase();
};

const formatEventDay = (event: Event) => {
  const date = new Date(event.startDateISO);
  if (Number.isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit' }).format(date);
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const dateLabel = formatEventDate(event);
  const monthLabel = formatEventMonth(event);
  const dayNumber = formatEventDay(event);
  const eventHash = `event-${event.slug}`;

  return (
    <Link
      to={`/events#${eventHash}`}
      className="group block w-full max-w-lg mx-auto transform transition-all duration-500 hover:scale-[1.02]"
    >
      <div className="mx-auto w-full max-w-xs">
        <div className="relative mx-auto aspect-[2/3] w-full overflow-hidden bg-gray-900 shadow-2xl">
          <img
            src={event.posterSrc}
            alt={event.displayTitle}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />

          {/* Date Badge */}
          <div className="absolute top-0 right-0 bg-white text-black p-4 flex flex-col items-center justify-center min-w-[80px]">
            <span className="text-sm font-bold tracking-widest uppercase">{monthLabel}</span>
            <span className="text-3xl font-heading font-bold leading-none mt-1">{dayNumber}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-white group-hover:text-gray-200 transition-colors">
            {event.displayTitle}
          </h3>
          <p className="mt-2 text-sm text-gray-400 font-mono tracking-wide">{dateLabel}</p>
          <p className="mt-2 text-xs text-gray-500 font-mono tracking-[0.3em] uppercase">
            {event.venue}
          </p>
        </div>
      </div>
    </Link>
  );
};

const EventsSection: React.FC = () => {
  const now = Date.now();
  const eventsByDateAsc = [...EVENTS].sort((a, b) => getEventTime(a) - getEventTime(b));
  const pastEvents = eventsByDateAsc.filter((event) => getEventTime(event) < now);
  const featuredEvents = [...pastEvents].sort((a, b) => getEventTime(b) - getEventTime(a)).slice(0, 2);
  const eventTitles = eventsByDateAsc.map((event) => ({
    label: event.displayTitle,
    to: `/events#event-${event.slug}`,
  }));

  return (
    <section id="events" className="relative w-full min-h-[75vh] py-24 flex items-center bg-black">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale&blur=2"
          alt="Crowd Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div>
      </div>

      <div className="relative z-10 w-full">
        <Reveal as="div" className="container mx-auto px-6 md:px-12 mb-12 text-center">
          <h2 className="text-2xl font-heading tracking-widest uppercase">OUR EVENTS</h2>
        </Reveal>

        <div className="relative w-screen left-1/2 -translate-x-1/2 mb-20">
          <Reveal as="div" amount={0.2}>
            <Marquee items={eventTitles} linkTo="/events" animationClassName="animate-marquee-fast" />
          </Reveal>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <Reveal as="div" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Reveal>

          <div className="mt-16 text-center">
            <Link
              to="/events"
              className="inline-block border-b border-white pb-1 text-sm tracking-widest hover:text-gray-400 transition-colors uppercase"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
