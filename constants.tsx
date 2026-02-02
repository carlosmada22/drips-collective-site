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
import voicexPhoto2 from './src/assets/residents/voicex2.jpg';
import dripsPosterI from './src/assets/events/dripsI.jpg';
import dripsPosterChroma from './src/assets/events/dripsXchroma.jpg';
import dripsPosterLapsus from './src/assets/events/dripsXlapsus.jpg';
import dripsPosterVibrant from './src/assets/events/dripsXvibrant.jpg';

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
    displayTitle: 'DRIPS I',
    fullTitle: 'DRIPS I',
    slug: 'drips-i',
    posterSrc: dripsPosterI,
    startDateISO: '2025-03-01T23:00:00+01:00',
    timeRange: '23:00 - 11:00',
    venue: 'TBA',
    promoters: ['DRIPS'],
    description:
      'Experience the raw energy of techno with us on a night full of immersive, boundary-pushing sounds. Celebrate chaos, introspection, and the fluid beauty of the underground.\n' +
      'Lose yourself in the sound. Find yourself in the rhythm. Welcome to DRIPS.\n\n' +
      'In order to buy tickets check the link at our Instagram page: @drips.collective',
    raUrl: 'https://es.ra.co/events/2094935',
  },
  {
    id: '2',
    displayTitle: 'DRIPS x LAPSUS',
    fullTitle: 'LAPSUS x DRIPS w/ BIXBITA, Atonism, Schicktanz, EMIRA, AND MORE',
    slug: 'lapsus-x-drips',
    posterSrc: dripsPosterLapsus,
    startDateISO: '2025-05-31T23:00:00+02:00',
    timeRange: '23:00 - 10:00',
    venue: 'ÆDEN',
    address: 'Schleusenufer 2, 10997 Berlin',
    promoters: ['Lapsus Events', 'DRIPS'],
    description:
      '31st May, AEDEN. Our biggest event to date.\n' +
      'LAPSUS x DRIPS is here to make you groove like never before with a curated lineup, a dreamlike space, and the exact vibe you’ve been craving to kick off the Berlin summer.\n\n' +
      'Lineup:\n' +
      'ATONISM\n' +
      'BIXBITA\n' +
      'DAVE.IT aka BUENRI\n' +
      'EMIRA\n' +
      'MAURER\n' +
      'ORBITAL DEPTHS\n' +
      'POVE\n' +
      'RAGE AMORETTY\n' +
      'SANTOS\n' +
      'SCHICKTANZ\n' +
      'VIVACE\n' +
      'VOICEX\n' +
      'YONTO\n' +
      'ZELYNA JE BELLE\n\n' +
      'See you on the dancefloor.',
    raUrl: 'https://es.ra.co/events/2122767',
  },
  {
    id: '3',
    displayTitle: 'DRIPS x CHROMA XXL',
    fullTitle: 'Chroma XXL x DRIPS [2 STAGES INDOOR + GARDEN CHILL OUT]',
    slug: 'chroma-xxl-x-drips',
    posterSrc: dripsPosterChroma,
    startDateISO: '2025-09-11T22:00:00+02:00',
    timeRange: '22:00 - 08:00',
    venue: 'OXI',
    address: 'Wiesenweg 1-4, 10365 Berlin',
    promoters: ['OXI Events', 'Chroma Berlin', 'DRIPS'],
    description:
      'CHROMA XXL x DRIPS - 11.09.2025\n\n' +
      'After teaming up a few times with artists from the DRIPS collective, CHROMA is closing out this amazing summer season at @oxi_club by uniting both collectives for one unforgettable night.\n\n' +
      'DRIPS will be rocking the O Floor stage, while CHROMA brings you a mix of international and local talents on the X Floor. A night that brings us close, sweating & moving as one, all for the love of sexy grooves.\n\n' +
      'Can’t wait to rock this with you, fam.\n\n' +
      'LINE UP\n' +
      '@brtinzz.music\n' +
      '@a.cheka_\n' +
      '@dj_fugitive_\n' +
      '@franeva_\n' +
      '@glia.dj\n' +
      '@jkm.wav\n' +
      '@maurer_\n' +
      '@mislaw_music\n' +
      '@voicexmusic\n\n' +
      '*\n' +
      'This event is QUEER friendly. Anyone who does not respect the values of the event will be welcome to leave the club. No racism. No transphobia. No sexism. No homophobia. No discrimination of any type.\n\n' +
      '**Tickets on RA and at the door!\n\n' +
      'CHROMA evolves to a higher state of mind.',
    raUrl: 'https://es.ra.co/events/2049017',
  },
  {
    id: '4',
    displayTitle: 'DRIPS x VIBRANT',
    fullTitle: 'DRIPS X VIBRANT',
    slug: 'drips-x-vibrant',
    posterSrc: dripsPosterVibrant,
    startDateISO: '2025-12-06T23:00:00+01:00',
    timeRange: '23:00 - 08:00',
    venue: 'Lokschuppen Berlin',
    address: 'Warschauer Brücke, Revaler Straße 99 Zugang über, 10245 Berlin, Germany',
    promoters: ['DRIPS'],
    description:
      'From Amsterdam to Berlin, two cities of pulse and power finally meet. Frequencies intertwine, energy converges: this is where the current flows one last time before the year fades.\n' +
      'A cross-current of sound, sweat, and motion, where walls breathe and floors shift beneath the weight of rhythm.\n' +
      'Two areas, two energies, one living organism of light and bass.\n\n' +
      'With artists like SLV, Filtrack, or L’Attitude, the night unfolds layer by layer. Expect moments that stretch beyond the clock, until time bends and the floor dissolves into pure movement.\n\n' +
      '23h till late.\n' +
      'Come for the closure.\n' +
      'Stay for the release.',
    raUrl: 'https://es.ra.co/events/2303579',
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
