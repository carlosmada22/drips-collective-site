import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroLoader from './components/IntroLoader';
import ScrollToTop from './components/ScrollToTop';
import Shell from './components/Shell';
import About from './src/pages/About';
import Blog from './src/pages/Blog';
import BlogDetail from './src/pages/BlogDetail';
import Events from './src/pages/Events';
import EventDetail from './src/pages/EventDetail';
import Home from './src/pages/Home';
import Stream from './src/pages/Stream';
import Label from './src/pages/Label';
import LabelDetail from './src/pages/LabelDetail';
import Residents from './src/pages/Residents';
import ResidentDetail from './src/pages/ResidentDetail';
import Shop from './src/pages/Shop';
import Merch from './src/pages/Merch';
import MerchProduct from './src/pages/MerchProduct';
import Checkout from './src/pages/Checkout';
import CheckoutSuccess from './src/pages/CheckoutSuccess';
import { CartProvider } from './src/context/CartContext';

const INTRO_STORAGE_KEY = 'drips-intro-loader-seen';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    try {
      return sessionStorage.getItem(INTRO_STORAGE_KEY) !== 'true';
    } catch {
      return false;
    }
  });

  const handleIntroDone = () => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage failures and just proceed.
    }
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        {showIntro && <IntroLoader onDone={handleIntroDone} />}
        <ScrollToTop />
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:slug" element={<EventDetail />} />
            <Route path="merch" element={<Merch />} />
            <Route path="merch/:id" element={<MerchProduct />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<CheckoutSuccess />} />
            <Route path="streams" element={<Stream />} />
            <Route path="shop" element={<Shop />} />
            <Route path="label" element={<Label />} />
            <Route path="label/:slug" element={<LabelDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="residents" element={<Residents />} />
            <Route path="residents/:slug" element={<ResidentDetail />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
