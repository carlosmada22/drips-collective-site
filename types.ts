import React from 'react';

export interface NavLink {
  label: string;
  to: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconSrc?: string;
}

export interface Event {
  id: string;
  displayTitle: string;
  fullTitle: string;
  slug: string;
  poster: string;
  startDateTimeISO: string;
  endDateTimeISO?: string;
  timeRange: string;
  venueName: string;
  venueAddress: string;
  cityCountry?: string;
  promoters: string[];
  description: string;
  raUrl: string;
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
      spotifyUrl: string;
      raUrl: string;
    };
    contact: {
      instagramUrl: string;
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
