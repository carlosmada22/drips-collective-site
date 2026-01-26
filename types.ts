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
  slug: string;
  bio: string;
  images: string[];
  links: {
    music: {
      soundcloudUrl: string;
      youtubeUrl: string;
      spotifyUrl: string;
    };
    contact: {
      instagramUrl: string;
      facebookUrl: string;
      email: string;
    };
  };
  youtubeEmbedUrl: string;
}

export interface MerchProduct {
  id: 'hoodie' | 'tshirt';
  name: string;
  description: string;
  images: string[];
  tpopUrl: string;
}
