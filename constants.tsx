import { NavLink, SocialLink, Event, Resident } from './types';
import { Instagram, Youtube, CloudLightning, Globe } from 'lucide-react';

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
  { id: '1', name: 'KORMAN', imageUrl: 'https://picsum.photos/400/600?grayscale&random=3', slug: 'korman' },
  { id: '2', name: 'VEX', imageUrl: 'https://picsum.photos/400/600?grayscale&random=4', slug: 'vex' },
  { id: '3', name: 'ECHO', imageUrl: 'https://picsum.photos/400/600?grayscale&random=5', slug: 'echo' },
  { id: '4', name: 'NOVA', imageUrl: 'https://picsum.photos/400/600?grayscale&random=6', slug: 'nova' },
  // Adding more for marquee effect, though grid only shows 4 usually
  { id: '5', name: 'SYNTH', imageUrl: 'https://picsum.photos/400/600?grayscale&random=7', slug: 'synth' },
  { id: '6', name: 'PULSE', imageUrl: 'https://picsum.photos/400/600?grayscale&random=8', slug: 'pulse' },
];

export const RESIDENT_MARQUEE_NAMES = [
  'KORMAN', 'VEX', 'ECHO', 'NOVA', 'SYNTH', 'PULSE', 'VOID', 'NEXUS', 'FLUX', 'KORMAN', 'VEX', 'ECHO'
];

// Placeholder video URL (abstract dark ink/smoke)
export const HERO_VIDEO_URL = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";
