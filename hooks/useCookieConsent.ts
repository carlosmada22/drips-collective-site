import { useContext } from 'react';
import { CookieConsentContext } from '../src/context/CookieConsentContext';

const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider.');
  }
  return context;
};

export default useCookieConsent;
