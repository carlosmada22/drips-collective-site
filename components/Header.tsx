import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';
import OverlayMenu from './OverlayMenu';

const OVERLAY_MENU_ID = 'site-overlay-menu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen && wasMenuOpen.current) {
      toggleButtonRef.current?.focus();
    }
    wasMenuOpen.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/90 py-4 backdrop-blur-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="z-50 relative">
            <Link to="/" className="flex items-center gap-2 group" aria-label="DRIPS home">
              {/* Minimal SVG Logo Placeholder */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                className="fill-white transition-opacity duration-300 group-hover:opacity-80"
                aria-hidden="true"
              >
                <rect x="20" y="20" width="60" height="60" rx="0" fill="white" />
                <rect x="35" y="35" width="30" height="30" fill="black" />
              </svg>
              <span className="font-heading text-xl tracking-widest font-bold hidden sm:block">DRIPS</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs font-medium tracking-widest hover:text-gray-400 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  aria-label={social.platform}
                  className="hover:opacity-60 transition-opacity duration-300"
                >
                  {social.icon && <social.icon size={18} strokeWidth={1.5} />}
                </a>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              ref={toggleButtonRef}
              onClick={toggleMenu}
              className="xl:hidden z-50 text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-controls={OVERLAY_MENU_ID}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      <OverlayMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMenu}
        menuId={OVERLAY_MENU_ID}
        navLinks={NAV_LINKS}
        socialLinks={SOCIAL_LINKS}
      />
    </>
  );
};

export default Header;
