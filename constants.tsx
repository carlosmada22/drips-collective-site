import { NavLink, SocialLink, Event, Resident, MerchProduct } from './types';
import { Instagram, Youtube, CloudLightning, Globe } from 'lucide-react';
import hoodie1 from './src/assets/merch/hoodie/1.png';
import hoodie2 from './src/assets/merch/hoodie/2.png';
import hoodie3 from './src/assets/merch/hoodie/3.jpg';
import hoodie4 from './src/assets/merch/hoodie/4.png';
import hoodie5 from './src/assets/merch/hoodie/5.png';
import hoodie6 from './src/assets/merch/hoodie/6.png';
import hoodie7 from './src/assets/merch/hoodie/7.png';
import tshirt1 from './src/assets/merch/tshirt/1.png';
import tshirt2 from './src/assets/merch/tshirt/2.png';
import tshirt3 from './src/assets/merch/tshirt/3.png';
import tshirt4 from './src/assets/merch/tshirt/4.png';
import maurerPhoto from './src/assets/residents/maurer.jpg';
import voicexPhoto from './src/assets/residents/voicex.JPG';

export const NAV_LINKS: NavLink[] = [
  { label: 'EVENTS', to: '/events' },
  { label: 'MERCH', to: '/merch' },
  { label: 'LABEL', to: '/label' },
  { label: 'STREAMS', to: '/streams' },
  { label: 'RESIDENTS', to: '/residents' },
  { label: 'ABOUT', to: '/about' },
];

// Reusing same links for the CTA buttons in Hero
export const HERO_CTA_LINKS: NavLink[] = [
  { label: 'EVENTS', to: '/events' },
  { label: 'MERCH', to: '/merch' },
  { label: 'LABEL', to: '/label' },
  { label: 'STREAMS', to: '/streams' },
  { label: 'RESIDENTS', to: '/residents' },
  { label: 'ABOUT', to: '/about' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Instagram', url: '#', icon: Instagram },
  { platform: 'YouTube', url: '#', icon: Youtube },
  { platform: 'SoundCloud', url: '#', icon: CloudLightning }, // CloudLightning as placeholder for SoundCloud
  { platform: 'Resident Advisor', url: '#', icon: Globe }, // Globe as placeholder for RA
];

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'WAREHOUSE SERIES: 004',
    dateStart: 'Feb 6, 2026',
    dateEnd: 'Feb 7, 2026',
    monthLabel: 'FEB',
    dayNumber: '06',
    coverImageUrl: 'https://picsum.photos/800/600?grayscale&random=1',
    slug: 'warehouse-series-004',
    location: 'BUNKER HALL, BERLIN',
    ticketUrl: 'https://example.com/tickets/warehouse-series-004'
  },
  {
    id: '2',
    title: 'ALL NIGHT LONG: KORMAN',
    dateStart: 'Feb 14, 2026',
    dateEnd: 'Feb 15, 2026',
    monthLabel: 'FEB',
    dayNumber: '14',
    coverImageUrl: 'https://picsum.photos/800/600?grayscale&random=2',
    slug: 'korman-all-night',
    location: 'DRIPS MAIN ROOM, BERLIN'
  },
  {
    id: '3',
    title: 'DRIPS x SUBLEVEL TAKEOVER',
    dateStart: 'Mar 20, 2026',
    dateEnd: 'Mar 21, 2026',
    monthLabel: 'MAR',
    dayNumber: '20',
    coverImageUrl: 'https://picsum.photos/800/600?grayscale&random=9',
    slug: 'sublevel-takeover',
    location: 'SUBLEVEL 02, BERLIN',
    ticketUrl: 'https://example.com/tickets/sublevel-takeover'
  },
  {
    id: '4',
    title: 'OPEN AIR: TEMPLE RUINS',
    dateStart: 'Aug 9, 2025',
    dateEnd: 'Aug 10, 2025',
    monthLabel: 'AUG',
    dayNumber: '09',
    coverImageUrl: 'https://picsum.photos/800/600?grayscale&random=10',
    slug: 'temple-ruins-open-air',
    location: 'TEMPLE RUINS, BERLIN'
  },
  {
    id: '5',
    title: 'WAREHOUSE SERIES: 003',
    dateStart: 'Nov 22, 2024',
    dateEnd: 'Nov 23, 2024',
    monthLabel: 'NOV',
    dayNumber: '22',
    coverImageUrl: 'https://picsum.photos/800/600?grayscale&random=11',
    slug: 'warehouse-series-003',
    location: 'BUNKER HALL, BERLIN'
  }
];

export const RESIDENTS: Resident[] = [
  {
    id: '1',
    name: 'MAURER',
    slug: 'maurer',
    bio: 'Austere grooves and slow-burning tension sculpted for late-room pressure.',
    images: [maurerPhoto, maurerPhoto],
    links: {
      music: {
        soundcloudUrl: 'https://soundcloud.com/example/maurer',
        youtubeUrl: 'https://youtube.com/example/maurer',
        spotifyUrl: 'https://open.spotify.com/artist/example-maurer',
      },
      contact: {
        instagramUrl: 'https://instagram.com/example-maurer',
        facebookUrl: 'https://facebook.com/example-maurer',
        email: 'maurer@drips-collective.com',
      },
    },
    youtubeEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  {
    id: '2',
    name: 'VOICEX',
    slug: 'voicex',
    bio: 'Raw techno lines with metallic edges and a controlled sense of chaos.',
    images: [voicexPhoto, voicexPhoto],
    links: {
      music: {
        soundcloudUrl: 'https://soundcloud.com/example/voicex',
        youtubeUrl: 'https://youtube.com/example/voicex',
        spotifyUrl: 'https://open.spotify.com/artist/example-voicex',
      },
      contact: {
        instagramUrl: 'https://instagram.com/example-voicex',
        facebookUrl: 'https://facebook.com/example-voicex',
        email: 'voicex@drips-collective.com',
      },
    },
    youtubeEmbedUrl: 'https://www.youtube.com/embed/FTQbiNvZqaY',
  },
];

/*
  Developer note:
  - tpopUrl can be replaced by POD product pages.
  - Later we can integrate a POD API (create order, shipping rates, webhooks).
*/
export const MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'hoodie',
    name: 'DRIPS Hoodie',
    description: 'Heavyweight fleece with a clean front mark and relaxed street fit.',
    images: [hoodie1, hoodie2, hoodie3, hoodie4, hoodie5, hoodie6, hoodie7],
    tpopUrl: 'https://example.com/hoodie',
  },
  {
    id: 'tshirt',
    name: 'DRIPS T-Shirt',
    description: 'Soft-touch cotton tee with tonal graphics and a clean neckline.',
    images: [tshirt1, tshirt2, tshirt3, tshirt4],
    tpopUrl: 'https://example.com/tshirt',
  },
];

export const RESIDENT_MARQUEE_NAMES = [
  'MAURER', 'VOICEX', 'MAURER', 'VOICEX'
];

// Placeholder video URL (abstract dark ink/smoke)
export const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";
