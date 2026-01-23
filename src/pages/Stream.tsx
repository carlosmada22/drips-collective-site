import React, { useCallback, useEffect, useRef } from 'react';
import SoundCloudEmbed from '../../components/SoundCloudEmbed';
import streamsHero from '../assets/bg/6h.png';

declare global {
  interface Window {
    SC?: any;
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type SoundCloudWidget = {
  bind: (eventName: string, callback: () => void) => void;
  pause: () => void;
};

const soundCloudSessions = [
  {
    title: 'SESSION 01 — DRIPS ARCHIVE',
    trackUrl: 'https://soundcloud.com/forss/flickermood',
  },
  {
    title: 'SESSION 02 — NIGHT DRIVE',
    trackUrl: 'https://soundcloud.com/monstercat/empire-of-sound',
  },
  {
    title: 'SESSION 03 — BASEMENT CUT',
    trackUrl: 'https://soundcloud.com/ghostly/homes',
  },
  {
    title: 'SESSION 04 — AFTER HOURS',
    trackUrl: 'https://soundcloud.com/thisisnoisia/noisia-split-the-atom',
  },
  {
    title: 'SESSION 05 — DRIPS LIVE',
    trackUrl: 'https://soundcloud.com/frieder-greis/neo',
  },
];

const youtubeVideos = [
  { title: 'DRIPS LIVE 01', id: 'ScMzIvxBSi4' },
  { title: 'WAREHOUSE SESSION', id: 'M7lc1UVf-VE' },
  { title: 'DRIPS RESIDENT 04', id: 'ysz5S6PUM-U' },
  { title: 'DRIPS LIVE 02', id: 'dQw4w9WgXcQ' },
];

const spotifyEmbeds = [
  {
    title: 'DRIPS EDITION 01',
    url: 'https://open.spotify.com/embed/track/7ouMYWpwJ422jRcDASZB7P',
    height: 152,
  },
  {
    title: 'DRIPS EDITION 02',
    url: 'https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp',
    height: 152,
  },
  {
    title: 'DRIPS EDITION 03',
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4dyzvuaRJ0n',
    height: 380,
  },
  {
    title: 'DRIPS EDITION 04',
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U',
    height: 380,
  },
];

const buildSoundCloudEmbedUrl = (trackUrl: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl
  )}&color=%23111111&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

let youTubeScriptPromise: Promise<any> | null = null;

const ensureYouTubeApi = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('YouTube API can only load in the browser.'));
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youTubeScriptPromise) {
    youTubeScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      window.onYouTubeIframeAPIReady = () => resolve(window.YT);

      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.onerror = () => reject(new Error('Failed to load YouTube API'));
      document.body.appendChild(script);
    });
  }

  return youTubeScriptPromise;
};

const Stream: React.FC = () => {
  const soundCloudWidgetsRef = useRef<SoundCloudWidget[]>([]);
  const youTubePlayersRef = useRef<any[]>([]);
  const youtubeIframesRef = useRef<(HTMLIFrameElement | null)[]>([]);

  const pauseAllSoundCloud = useCallback((except?: SoundCloudWidget) => {
    soundCloudWidgetsRef.current.forEach((widget) => {
      if (!except || widget !== except) {
        widget.pause();
      }
    });
  }, []);

  const pauseAllYouTube = useCallback(() => {
    youTubePlayersRef.current.forEach((player) => {
      player?.pauseVideo?.();
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
      pauseAllYouTube();
    },
    [pauseAllSoundCloud, pauseAllYouTube]
  );

  useEffect(() => {
    let isMounted = true;

    ensureYouTubeApi()
      .then((YT) => {
        if (!isMounted || !YT?.Player) {
          return;
        }

        youTubePlayersRef.current = youtubeIframesRef.current
          .map((iframe) => {
            if (!iframe) {
              return null;
            }

            return new YT.Player(iframe, {
              events: {
                onStateChange: (event: any) => {
                  if (event.data === YT.PlayerState.PLAYING) {
                    pauseAllSoundCloud();
                  }
                },
              },
            });
          })
          .filter(Boolean);
      })
      .catch(() => {
        // Best effort only; the embeds still render without the API.
      });

    return () => {
      isMounted = false;
      youTubePlayersRef.current.forEach((player) => player?.destroy?.());
      youTubePlayersRef.current = [];
    };
  }, [pauseAllSoundCloud]);

  return (
    <div className="bg-black text-white">
      <section className="relative w-full min-h-[35vh] md:min-h-[40vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={streamsHero} alt="Streams hero" className="w-full h-full object-cover" />
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
            SOUNDCLOUD SESSIONS
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
            VIDEOS
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {youtubeVideos.map((video, index) => (
              <div key={video.id} className="aspect-video w-full">
                <iframe
                  ref={(el) => {
                    youtubeIframesRef.current[index] = el;
                  }}
                  title={video.title}
                  className="w-full h-full rounded-md border border-white/10"
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&enablejsapi=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-xl font-heading tracking-[0.35em] uppercase text-gray-200">
            SPOTIFY
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {spotifyEmbeds.map((embed) => (
              <div key={embed.url} className="space-y-2">
                <p className="text-xs font-mono tracking-[0.35em] text-gray-400 uppercase">
                  {embed.title}
                </p>
                <iframe
                  title={embed.title}
                  src={embed.url}
                  width="100%"
                  height={embed.height}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-md border border-white/10"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stream;
