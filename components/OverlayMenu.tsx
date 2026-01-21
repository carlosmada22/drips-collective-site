import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import useScrollLock from '../hooks/useScrollLock';
import type { NavLink, SocialLink } from '../types';

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuId: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({
  isOpen,
  onClose,
  menuId,
  navLinks,
  socialLinks,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const focusableSelector = useMemo(
    () =>
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
    []
  );

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusableElements = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) {
        return;
      }

      const activeElement = document.activeElement;
      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusableSelector, isOpen, onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id={menuId}
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      onClick={handleOverlayClick}
      className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <nav className="flex flex-col items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            onClick={onClose}
            tabIndex={isOpen ? 0 : -1}
            className="text-2xl font-heading uppercase tracking-widest hover:text-gray-500 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12 flex gap-8">
        {socialLinks.map((social) => (
          <a
            key={social.platform}
            href={social.url}
            className="hover:opacity-60 transition-opacity duration-300"
            aria-label={social.platform}
            tabIndex={isOpen ? 0 : -1}
          >
            {social.icon && <social.icon size={24} />}
          </a>
        ))}
      </div>
    </div>
  );
};

export default OverlayMenu;
