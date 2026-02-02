import React, { useRef, useState } from 'react';
import { EVENTS } from '../../constants';
import { Event } from '../../types';
import eventsHero from '../assets/bg/7h.png';
import Reveal from '../../components/Reveal';
import EventModal from '../../components/events/EventModal';

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

const EventCard: React.FC<{ event: Event; onOpen: (event: Event, trigger: HTMLElement) => void }> = ({
  event,
  onOpen,
}) => {
  const dateLabel = formatEventDate(event);

  const handleKeyDown = (keyboardEvent: React.KeyboardEvent<HTMLDivElement>) => {
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      keyboardEvent.preventDefault();
      onOpen(event, keyboardEvent.currentTarget);
    }
  };

  return (
    <article id={`event-${event.slug}`} className="py-6">
      <div className="mx-auto w-full max-w-2xl">
        <div
          role="button"
          tabIndex={0}
          onClick={(clickEvent) => onOpen(event, clickEvent.currentTarget)}
          onKeyDown={handleKeyDown}
          className="group"
        >
          <div className="relative mx-auto aspect-[2/3] w-full max-w-sm md:max-w-md overflow-hidden bg-black shadow-2xl">
            <img
              src={event.posterSrc}
              alt={event.displayTitle}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-white">
              {event.displayTitle}
            </h3>
            <p className="mt-2 text-sm text-gray-300 font-mono tracking-wide">
              {dateLabel} / {event.timeRange}
            </p>
            <p className="mt-2 text-xs text-gray-500 font-mono tracking-[0.3em] uppercase">
              {event.venue}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

const Events: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const now = Date.now();
  const upcomingEvents = EVENTS.filter((event) => getEventTime(event) >= now).sort(
    (a, b) => getEventTime(a) - getEventTime(b)
  );
  const pastEvents = EVENTS.filter((event) => getEventTime(event) < now).sort(
    (a, b) => getEventTime(b) - getEventTime(a)
  );

  const handleOpenModal = (event: Event, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveEvent(event);
  };

  const handleCloseModal = () => {
    setActiveEvent(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={eventsHero}
            alt="Events hero"
            className="w-full h-full object-cover scale-[1.45] blur-[4px]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <h1
            className="font-heading text-4xl md:text-6xl tracking-[0.4em] uppercase"
            style={{ textShadow: '0 4px 18px rgba(0, 0, 0, 0.35)' }}
          >
            EVENTS
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal as="div">
            <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">UPCOMING</h2>
          </Reveal>

          {upcomingEvents.length === 0 ? (
            <p className="mt-8 text-sm text-gray-500 font-mono tracking-wide">
              Coming soon.
            </p>
          ) : (
            <div className="mt-4 divide-y divide-white/10">
              {upcomingEvents.map((event, index) => (
                <Reveal key={event.id} as="div" delay={Math.min(index * 60, 360)}>
                  <EventCard event={event} onOpen={handleOpenModal} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal as="div">
            <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">PAST</h2>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {pastEvents.map((event, index) => (
              <Reveal key={event.id} as="div" delay={Math.min(index * 60, 360)}>
                <EventCard event={event} onOpen={handleOpenModal} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EventModal event={activeEvent} isOpen={activeEvent !== null} onClose={handleCloseModal} />
    </div>
  );
};

export default Events;
