import React, { useEffect, useMemo, useRef } from 'react';
import useScrollLock from '../../hooks/useScrollLock';
import type { Event } from '../../types';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

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

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusableSelector = useMemo(
    () =>
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
    []
  );

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusableElements = Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    } else if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return;
      }

      const activeElement = document.activeElement;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusableSelector, isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!event) {
    return null;
  }

  const dateLabel = formatEventDate(event);
  const promotersLabel = event.promoters.join(' / ');

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6 py-10 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-full max-w-5xl overflow-hidden border border-white/10 bg-black shadow-2xl">
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-sm uppercase tracking-[0.3em] text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          aria-label="Close event details"
        >
          X
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          <div className="grid gap-10 p-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:p-12">
            <div className="w-full">
              <div className="mx-auto w-full max-w-lg">
                <div className="w-full shadow-2xl">
                  <img
                    src={event.posterSrc}
                    alt={event.displayTitle}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="mt-2">
                  <a
                    href={event.raUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center px-10 py-4 bg-white text-black border border-white hover:bg-black hover:text-white hover:border-white transition-colors duration-300 uppercase tracking-widest text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  >
                    TICKETS
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-left">
              <div>
                <h3
                  id="event-modal-title"
                  className="text-2xl md:text-3xl font-heading uppercase tracking-widest text-white"
                >
                  {event.displayTitle}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-gray-300 font-mono tracking-wide">
                <p>
                  {dateLabel} / {event.timeRange}
                </p>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500">Venue</p>
                <p className="text-sm text-gray-300">{event.venue}</p>
                {event.address && <p className="text-sm text-gray-500">{event.address}</p>}
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mt-4">Promoters</p>
                <p className="text-sm text-gray-300">{promotersLabel}</p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-mono">
                  Description
                </p>
                <p className="mt-3 whitespace-pre-line text-sm text-gray-300 font-body leading-relaxed tracking-normal normal-case">
                  {event.description}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
