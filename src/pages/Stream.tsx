import React, { useCallback, useEffect, useRef } from 'react';
import SoundCloudEmbed from '../../components/SoundCloudEmbed';
import CookieNotice from '../../components/CookieNotice';
import useCookieConsent from '../../hooks/useCookieConsent';
import streamsHero from '../assets/bg/8h.png';

declare global {
  interface Window {
    SC?: any;
  }
}

type SoundCloudWidget = {
  bind: (eventName: string, callback: () => void) => void;
  pause: () => void;
};

const soundCloudSessions = [
  {
    title: 'CONVERGENCE VA',
    trackUrl: 'https://soundcloud.com/drips-collective/sets/convergence-va-drips001',
  },
  {
    title: 'DRIP SESSIONS 1 - MAURER',
    trackUrl: 'https://soundcloud.com/drips-collective/drip-sessions-1-maurer',
  },
  {
    title: 'DRIP SESSIONS 3 - VOICEX',
    trackUrl: 'https://soundcloud.com/drips-collective/drip-sessions-3-voicex',
  },
];

const spotifyEmbeds = [
  {
    url: 'https://open.spotify.com/embed/artist/2Mz4xppLRLkIsvMFb9STKO',
  },
  {
    url: 'https://open.spotify.com/embed/artist/1Ox2d4YKQFfuxBIUEQc65o',
  },
];

const SPOTIFY_EMBED_HEIGHT = 380;

const buildSoundCloudEmbedUrl = (trackUrl: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%23111111&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

const Stream: React.FC = () => {
  const soundCloudWidgetsRef = useRef<SoundCloudWidget[]>([]);
  const { isAccepted } = useCookieConsent();

  const pauseAllSoundCloud = useCallback((except?: SoundCloudWidget) => {
    soundCloudWidgetsRef.current.forEach((widget) => {
      if (!except || widget !== except) {
        try {
          widget.pause();
        } catch {
          // Ignore SoundCloud widget errors during route changes.
        }
      }
    });
  }, []);

  const registerSoundCloudWidget = useCallback((widget: SoundCloudWidget) => {
    if (!soundCloudWidgetsRef.current.includes(widget)) {
      soundCloudWidgetsRef.current.push(widget);
    }
  }, []);

  const handleSoundCloudPlay = useCallback(
    (activeWidget: SoundCloudWidget) => {
      pauseAllSoundCloud(activeWidget);
    },
    [pauseAllSoundCloud]
  );

  useEffect(() => {
    return () => {
      soundCloudWidgetsRef.current.forEach((widget) => {
        try {
          widget.pause();
        } catch {
          // Ignore SoundCloud widget errors during unmount.
        }
      });
      soundCloudWidgetsRef.current = [];
    };
  }, []);

  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[35vh] md:min-h-[40vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={streamsHero}
            alt="Streams hero"
            className="w-full h-full object-cover blur-[3px]"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.4em] uppercase">
            STREAMS
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">
            THE SESSIONS
          </h2>
          <div className="mt-8 space-y-10">
            {soundCloudSessions.map((session) => (
              <div key={session.trackUrl} className="space-y-3">
                <p className="text-xs font-mono tracking-[0.35em] text-gray-400 uppercase">
                  {session.title}
                </p>
                <SoundCloudEmbed
                  title={session.title}
                  url={buildSoundCloudEmbedUrl(session.trackUrl)}
                  registerWidget={registerSoundCloudWidget}
                  onPlay={handleSoundCloudPlay}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">
            THE ARTISTS
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {spotifyEmbeds.map((embed) => (
              <div
                key={embed.url}
                className="rounded-md border border-white/10 overflow-hidden bg-black h-[380px]"
              >
                {isAccepted ? (
                  <iframe
                    title="Spotify artist"
                    src={embed.url}
                    width="100%"
                    height={SPOTIFY_EMBED_HEIGHT}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full h-full"
                  />
                ) : (
                  <CookieNotice />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stream;
