import React, { createContext, useMemo, useState } from 'react';

export type CookieConsentStatus = 'accepted' | 'rejected' | null;

type CookieConsentContextValue = {
  consent: CookieConsentStatus;
  setConsent: (value: CookieConsentStatus) => void;
  isAccepted: boolean;
};

export const COOKIE_CONSENT_KEY = 'drips-cookie-consent';

export const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(
  undefined
);

const readStoredConsent = (): CookieConsentStatus => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      return stored;
    }
  } catch {
    // Storage access can fail in restricted environments.
  }

  return null;
};

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [consent, setConsentState] = useState<CookieConsentStatus>(() => readStoredConsent());

  const setConsent = (value: CookieConsentStatus) => {
    setConsentState(value);
    try {
      if (value) {
        localStorage.setItem(COOKIE_CONSENT_KEY, value);
      } else {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
      }
    } catch {
      // Ignore storage failures and keep UI responsive.
    }
  };

  const contextValue = useMemo(
    () => ({
      consent,
      setConsent,
      isAccepted: consent === 'accepted',
    }),
    [consent]
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
};
