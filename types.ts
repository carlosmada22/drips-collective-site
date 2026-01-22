import React from 'react';

export interface NavLink {
  label: string;
  to: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface Event {
  id: string;
  title: string;
  dateStart: string; // ISO date string or formatted
  dateEnd: string;
  monthLabel: string;
  dayNumber: string;
  coverImageUrl: string;
  slug: string;
  location?: string;
  ticketUrl?: string;
}

export interface Resident {
  id: string;
  name: string;
  imageUrl: string;
  slug: string;
}
