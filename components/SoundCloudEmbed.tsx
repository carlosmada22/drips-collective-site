import React, { useEffect, useRef } from 'react';
import useCookieConsent from '../hooks/useCookieConsent';
import CookieNotice from './CookieNotice';

declare global {
  interface Window {
    SC?: any;
  }
}

type SoundCloudWidget = {
  bind: (eventName: string, callback: () => void) => void;
  pause: () => void;
  unbind: (eventName: string) => void;
};

type SoundCloudEmbedProps = {
  url: string;
  title: string;
  registerWidget: (widget: SoundCloudWidget) => void;
  onPlay: (widget: SoundCloudWidget) => void;
};

let soundCloudScriptPromise: Promise<any> | null = null;

const ensureSoundCloudScript = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('SoundCloud script can only load in the browser.'));
  }

  if (window.SC?.Widget) {
    return Promise.resolve(window.SC);
  }

  if (!soundCloudScriptPromise) {
    soundCloudScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://w.soundcloud.com/player/api.js"]'
      );

      if (existingScript && window.SC?.Widget) {
        resolve(window.SC);
        return;
      }

      const script = existingScript ?? document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => resolve(window.SC);
      script.onerror = () => reject(new Error('Failed to load SoundCloud API'));

      if (!existingScript) {
        document.body.appendChild(script);
      }
    });
  }

  return soundCloudScriptPromise;
};

const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({
  url,
  title,
  registerWidget,
  onPlay,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { isAccepted } = useCookieConsent();

  useEffect(() => {
    if (!isAccepted) {
      return;
    }

    let widget: SoundCloudWidget | null = null;
    let isMounted = true;
    let playEvent: string | null = null;

    ensureSoundCloudScript()
      .then((SC) => {
        if (!isMounted || !iframeRef.current || !SC?.Widget) {
          return;
        }

        widget = SC.Widget(iframeRef.current);
        registerWidget(widget);
        playEvent = SC.Widget.Events?.PLAY ?? null;
        if (playEvent) {
          widget.bind(playEvent, () => onPlay(widget as SoundCloudWidget));
        }
      })
      .catch(() => {
        // Best effort only; embeds still render without the API.
      });

    return () => {
      isMounted = false;
      if (widget && playEvent) {
        try {
          widget.unbind(playEvent);
        } catch {
          // Ignore widget cleanup errors.
        }
      }
    };
  }, [isAccepted, onPlay, registerWidget, url]);

  if (!isAccepted) {
    return (
      <div className="w-full rounded-md overflow-hidden border border-white/10">
        <div className="h-[320px]">
          <CookieNotice />
        </div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={url}
      width="100%"
      height="320"
      allow="autoplay"
      className="w-full rounded-md overflow-hidden border border-white/10"
    />
  );
};

export default SoundCloudEmbed;
