import React, { createContext, useContext, useMemo, useState } from 'react';

type HomeHeroNavContextValue = {
  heroNavVisible: boolean;
  setHeroNavVisible: (visible: boolean) => void;
};

const HomeHeroNavContext = createContext<HomeHeroNavContextValue | undefined>(undefined);

const useHomeHeroNav = () => {
  const context = useContext(HomeHeroNavContext);
  if (!context) {
    throw new Error('useHomeHeroNav must be used within HomeHeroNavProvider');
  }
  return context;
};

const HomeHeroNavProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [heroNavVisible, setHeroNavVisible] = useState(true);

  const value = useMemo(
    () => ({
      heroNavVisible,
      setHeroNavVisible,
    }),
    [heroNavVisible]
  );

  return <HomeHeroNavContext.Provider value={value}>{children}</HomeHeroNavContext.Provider>;
};

export { HomeHeroNavProvider, useHomeHeroNav };
