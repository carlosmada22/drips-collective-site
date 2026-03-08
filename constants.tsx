import { NavLink, SocialLink, Event, Resident, MerchProduct } from './types';
import { Instagram } from 'lucide-react';
import soundcloudIcon from './src/assets/icons/soundcloud.png';
import raIcon from './src/assets/icons/ra.png';
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
import maurerPhoto1 from './src/assets/residents/maurer1.jpg';
import maurerPhoto2 from './src/assets/residents/maurer2.jpg';
import voicexPhoto1 from './src/assets/residents/voicex.JPG';
import voicexPhoto2 from './src/assets/residents/voicex2.jpg';
import dripsPosterI from './src/assets/events/dripsI.jpg';
import dripsPosterChroma from './src/assets/events/dripsXchroma.jpg';
import dripsPosterLapsus from './src/assets/events/dripsXlapsus.jpg';
import dripsPosterVibrant from './src/assets/events/dripsXvibrant.jpg';
import liquidStatesPoster from './src/assets/events/liquid_states.jpg';
import baalsaalPoster from './src/assets/events/baalsaal.jpg';

export const FEATURES = {
  // Set merchEnabled to true to re-enable the full Merch experience.
  merchEnabled: false,
} as const;

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
  { platform: 'SoundCloud', url: 'https://soundcloud.com/drips-collective', iconSrc: soundcloudIcon },
  { platform: 'Resident Advisor', url: 'https://ra.co/promoters/157991', iconSrc: raIcon },
];

export const EVENTS: Event[] = [
  {
    id: '5',
    displayTitle: 'LIQUID STATES',
    fullTitle: 'LIQUID STATES',
    slug: 'liquid-states-drips-studio-db',
    poster: liquidStatesPoster,
    startDateTimeISO: '2026-02-27T19:00:00+01:00',
    timeRange: 'Doors open at 19:00h',
    venueName: 'Studio dB',
    venueAddress: 'Uferstrasse 8-11, Studio A14, 13357 Berlin, Germany',
    promoters: ['DRIPS'],
    description:
      'For the first time, DRIPS presents a different kind of night.\n' +
      'A night for the community — built on exchange, experimentation, and shared presence.\n\n' +
      'This is a space where artistic disciplines converge and move together:\n' +
      'fashion in motion, contemporary dance, live music, vinyl, and immersive visuals unfolding throughout the evening. Each element is part of a continuous dialogue between bodies, sound, and image.\n\n' +
      'An experience designed for creative encounter and collective energy — where performance and audience meet on the same frequency, and the boundaries between scenes begin to dissolve.\n\n' +
      'Fashion shows:\n' +
      'EXIL 01 — https://www.instagram.com/exil___01\n' +
      'UNSATURATED — https://www.instagram.com/unsaturated.de\n' +
      'SONNENKIND — https://www.instagram.com/sonnenkind.design\n\n' +
      'Dance performance:\n' +
      'FLYING STEPS — https://www.instagram.com/flyingstepsacademy\n\n' +
      'Visuals:\n' +
      'FVTHOM — https://www.instagram.com/fvthom.av\n' +
      'MITΣI — https://www.instagram.com/its.mitsi\n\n' +
      'Vinyl set:\n' +
      'DPM JAVI — https://www.instagram.com/dpmjavi\n\n' +
      'Live sets:\n' +
      'VOICEX — https://www.instagram.com/voicexmusic\n' +
      'XIORRO — https://www.instagram.com/xiorro_\n' +
      'MAURER — https://www.instagram.com/maurer_',
    raUrl: 'https://es.ra.co/events/2369325',
  },
  {
    id: '1',
    displayTitle: 'DRIPS I',
    fullTitle: 'DRIPS I',
    slug: 'drips-i',
    poster: dripsPosterI,
    startDateTimeISO: '2025-03-01T23:00:00+01:00',
    timeRange: '23:00 - 11:00',
    venueName: 'TBA',
    venueAddress: '',
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
    poster: dripsPosterLapsus,
    startDateTimeISO: '2025-05-31T23:00:00+02:00',
    timeRange: '23:00 - 10:00',
    venueName: 'ÆDEN',
    venueAddress: 'Schleusenufer 2, 10997 Berlin',
    promoters: ['Lapsus Events', 'DRIPS'],
    description:
      '31st May, AEDEN. Our biggest event to date.\n' +
      'LAPSUS x DRIPS is here to make you groove like never before with a curated lineup, a dreamlike space, and the exact vibe you’ve been craving to kick off the Berlin summer.\n\n' +
      'See you on the dancefloor.',
    raUrl: 'https://es.ra.co/events/2122767',
  },
  {
    id: '3',
    displayTitle: 'DRIPS x CHROMA XXL',
    fullTitle: 'Chroma XXL x DRIPS [2 STAGES INDOOR + GARDEN CHILL OUT]',
    slug: 'chroma-xxl-x-drips',
    poster: dripsPosterChroma,
    startDateTimeISO: '2025-09-11T22:00:00+02:00',
    timeRange: '22:00 - 08:00',
    venueName: 'OXI',
    venueAddress: 'Wiesenweg 1-4, 10365 Berlin',
    promoters: ['OXI Events', 'Chroma Berlin', 'DRIPS'],
    description:
      'CHROMA XXL x DRIPS - 11.09.2025\n\n' +
      'After teaming up a few times with artists from the DRIPS collective, CHROMA is closing out this amazing summer season at @oxi_club by uniting both collectives for one unforgettable night.\n\n' +
      'DRIPS will be rocking the O Floor stage, while CHROMA brings you a mix of international and local talents on the X Floor. A night that brings us close, sweating & moving as one, all for the love of sexy grooves.\n\n' +
      'Can’t wait to rock this with you, fam.\n\n' +
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
    poster: dripsPosterVibrant,
    startDateTimeISO: '2025-12-06T23:00:00+01:00',
    timeRange: '23:00 - 08:00',
    venueName: 'Lokschuppen Berlin',
    venueAddress: 'Warschauer Brücke, Revaler Straße 99 Zugang über, 10245 Berlin, Germany',
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
  },
  {
    id: '6',
    displayTitle: 'DRIPS Showcase',
    fullTitle: 'DRIPS Showcase with MAURER, VOICEX & rodmor',
    slug: 'drips-showcase-baalsaal',
    poster: baalsaalPoster,
    startDateTimeISO: '2026-03-13T23:00:00+01:00',
    timeRange: '23:00 - 06:00',
    venueName: 'Baalsaal',
    venueAddress: 'Reeperbahn 25, 20359 Hamburg, Germany',
    promoters: ['DRIPS'],
    description:
      'Baalsaal welcomes Berlin based Drips Collective with spanish rooted artists Maurer & Voicex. Local support by Rodmor\n\n' +
      'Location: BAALSAAL\n' +
      'Reeperbahn 25 Hamburg\n\n' +
      'Date: Friday, March 13th\n' +
      'Doors Open: 23:00\n\n' +
      'Free Entry with Ticket till 1am.\n' +
      'After 1am 10 Euro & Without 20 Euro\n\n' +
      'No Place for Discrimination:\n' +
      'We stand for inclusivity and respect.\n' +
      'No tolerance for homophobia, racism, or sexism.\n\n' +
      'Stay in the Moment:\n' +
      'No photos. No videos. Just music, movement and energy.\n\n' +
      'Lineup:\n' +
      'MAURER\n' +
      'VOICEX\n' +
      'rodmor\n\n' +
      'See you on the dancefloor.',
    raUrl: 'https://es.ra.co/events/2378334',
  }
];

export const RESIDENTS: Resident[] = [
  {
    id: '1',
    name: 'MAURER',
    slug: 'maurer',
    bio: "With roots deeply embedded in hip-hop, MAURER's identity as a DJ and producer is marked by his extensive use of sampling in his music. He creates powerful atmospheres and an unmistakable groove that define his unique musical style. MAURER began his music career at the age of 9 in the music conservatory. His interest in electronic music ignited three years later. Originally from Spain, he has lived in the USA, Ibiza, and now calls Berlin his home. Over time, his production skills have evolved, now focusing intensely on hard groove, constantly perfecting and defining his unique sound. Drawing influences from hip hop his style deeply resonates with the underground movement. His journey in the music scene has seen him share venues with renowned artists like Ben Sims and P.E.A.R.L., and perform in prestigious clubs such as Lokschuppen Berlin. MAURER's dvnamic and immersive sets are a testament to his evolving sound and his ability to captivate audiences, making him a notable figure in the electronic music landscape. His sets are distinguished by a percussion-heavy, melody-infused blending of genres such as hard groove and hard techno, seamlessly integrating melodic elements throughout the journey. Moreover, his ability to fluidly and dynamically blend these genres, along with his sensitivity to read and respond to the crowd's energy, ensures a dynamic and immersive club experience in every performance.",
    images: [maurerPhoto1, maurerPhoto2],
    links: {
      music: {
        soundcloudUrl: 'https://soundcloud.com/maurersc',
        spotifyUrl: 'https://open.spotify.com/artist/2Mz4xppLRLkIsvMFb9STKO',
        raUrl: 'https://ra.co/dj/maurer',
      },
      contact: {
        instagramUrl: 'https://www.instagram.com/maurer_',
        email: 'collectivedrips@gmail.com',
      },
    },
    youtubeEmbedUrl: 'https://www.youtube.com/embed/SaFRWYFMjqA?si=rIhMctqDUN2H6IAO',
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
        spotifyUrl: 'https://open.spotify.com/artist/1Ox2d4YKQFfuxBIUEQc65o',
        raUrl: 'https://ra.co/dj/voicex',
      },
      contact: {
        instagramUrl: 'https://www.instagram.com/voicexmusic',
        email: 'collectivedrips@gmail.com',
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
