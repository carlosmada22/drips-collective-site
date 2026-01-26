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
import maurerPhoto1 from './src/assets/residents/maurer.jpg';
import voicexPhoto1 from './src/assets/residents/voicex.JPG';
import voicexPhoto2 from './src/assets/residents/voicex2.JPG';

export const NAV_LINKS: NavLink[] = [
  { label: 'EVENTS', to: '/events' },
  { label: 'MERCH', to: '/merch' },
  { label: 'LABEL', to: '/label' },
  { label: 'STREAMS', to: '/streams' },
  { label: 'RESIDENTS', to: '/residents' },
  { label: 'ABOUT', to: '/about' },
];

export const BANDCAMP_PUBLIC_URL = "https://dripslabel.bandcamp.com/album/convergence";

export const BANDCAMP_EMBED_SRC =
  "https://bandcamp.com/EmbeddedPlayer/album=657721235/size=large/bgcol=000000/linkcol=ffffff/tracklist=true/transparent=true/";

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
  { platform: 'Instagram', url: 'https://www.instagram.com/drips.collective/', icon: Instagram },
  { platform: 'SoundCloud', url: 'https://soundcloud.com/drips-collective', icon: CloudLightning }, // CloudLightning as placeholder for SoundCloud
  { platform: 'Resident Advisor', url: 'https://ra.co/promoters/157991', icon: Globe }, // Globe as placeholder for RA
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
    bio: "With roots deeply embedded in hip-hop, MAURER's identity as a DJ and producer is marked by his extensive use of sampling in his music. He creates powerful atmospheres and an unmistakable groove that define his unique musical style. MAURER began his music career at the age of 9 in the music conservatory. His interest in electronic music ignited three years later. Originally from Spain, he has lived in the USA, Ibiza, and now calls Berlin his home. Over time, his production skills have evolved, now focusing intensely on hard groove, constantly perfecting and defining his unique sound. Drawing influences from hip hop his style deeply resonates with the underground movement. His journey in the music scene has seen him share venues with renowned artists like Ben Sims and P.E.A.R.L., and perform in prestigious clubs such as Lokschuppen Berlin. MAURER's dvnamic and immersive sets are a testament to his evolving sound and his ability to captivate audiences, making him a notable figure in the electronic music landscape. His sets are distinguished by a percussion-heavy, melody-infused blending of genres such as hard groove and hard techno, seamlessly integrating melodic elements throughout the journey. Moreover, his ability to fluidly and dynamically blend these genres, along with his sensitivity to read and respond to the crowd's energy, ensures a dynamic and immersive club experience in every performance.",
    images: [maurerPhoto1, maurerPhoto1],
    links: {
      music: {
        soundcloudUrl: 'https://soundcloud.com/maurersc',
        youtubeUrl: 'https://youtube.com/example/maurer',
        spotifyUrl: 'https://open.spotify.com/artist/2Mz4xppLRLkIsvMFb9STKO',
      },
      contact: {
        instagramUrl: 'https://www.instagram.com/maurer_',
        facebookUrl: 'https://facebook.com/example-maurer',
        email: 'maurer@drips-collective.com',
      },
    },
    youtubeEmbedUrl: 'https://www.youtube.com/embed/-EVzhOBovMw?si=iZ9PROOrE4qPdq9G',
  },
  {
    id: '2',
    name: 'VOICEX',
    slug: 'voicex',
    bio: "VOICEX is a Spanish music producer and DJ based in Berlin, known for crafting high-energy techno infused with raw textures, deep grooves, and a strong focus on sound design. Coming from a background in classical music, he constantly explores new techniques to push his sonic identity further, leaning towards a darker, more stripped-down and emotionally charged sound. Through his live sessions, VOICEX works with real-time manipulation to achieve a visceral and unpolished energy.Under his other name, Yoni Voicex also composes music for orchestral and audiovisual projects. His writing draws from contemporary classical language, focusing on texture, gradual development, and contrast to create immersive and atmospheric sound worlds. He has composed for short films, ensembles, and solo instruments, bridging minimalism, modern composition, and cinematic scoring.",
    images: [voicexPhoto1, voicexPhoto2],
    links: {
      music: {
        soundcloudUrl: 'https://soundcloud.com/voicex',
        youtubeUrl: 'https://youtube.com/example/voicex',
        spotifyUrl: 'https://open.spotify.com/artist/1Ox2d4YKQFfuxBIUEQc65o',
      },
      contact: {
        instagramUrl: 'https://www.instagram.com/voicexmusic',
        facebookUrl: 'https://facebook.com/example-voicex',
        email: 'voicex@drips-collective.com',
      },
    },
    youtubeEmbedUrl: 'https://www.youtube.com/embed/7HgGS9ZhSI0?si=Y81t2L06bZ1WVwnB',
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
