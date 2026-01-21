import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Shell: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Shell;
