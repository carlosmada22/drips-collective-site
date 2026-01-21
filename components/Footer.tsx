import React, { useState } from 'react';
import Button from './ui/Button';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    // Simulate API call
    setTimeout(() => setStatus('success'), 1000);
  };

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 overflow-hidden">
      
      {/* Background with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/800?grayscale&blur=4" 
          alt="Footer background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Newsletter */}
        <div className="w-full max-w-xl mb-20">
          <h3 className="text-2xl font-heading uppercase tracking-widest mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-400 text-sm mb-8 tracking-wide">
            Be the first to know about upcoming warehouse events and releases.
          </p>
          
          {status === 'success' ? (
            <div className="p-4 border border-green-500/50 text-green-400 text-sm tracking-widest uppercase">
              You have been subscribed.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="YOUR@EMAIL.COM" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-black px-4 py-3 text-sm focus:outline-none placeholder:text-gray-500 rounded-none uppercase tracking-wide"
              />
              <Button type="submit" label="Sign Up" variant="solid" />
            </form>
          )}
          {status === 'error' && <p className="mt-2 text-red-500 text-xs uppercase tracking-wide">Please enter a valid email.</p>}
        </div>

        {/* Socials */}
        <div className="flex items-center gap-8 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a 
              key={social.platform}
              href={social.url}
              className="hover:text-gray-400 transition-colors duration-300"
              aria-label={social.platform}
            >
              {social.icon && <social.icon size={20} />}
            </a>
          ))}
        </div>

        {/* Brand & Info */}
        <div className="mb-12 space-y-2">
          <h4 className="text-xl font-heading font-bold uppercase tracking-widest mb-6">DRIPS COLLECTIVE</h4>
          <p className="text-sm text-gray-400 font-mono">123 WAREHOUSE DISTRICT, BERLIN</p>
          <div className="flex flex-col gap-1 text-sm text-gray-400 font-mono mt-4">
             <a href="mailto:tickets@drips.com" className="hover:text-white transition-colors">TICKETS@DRIPS.COM</a>
             <a href="mailto:info@drips.com" className="hover:text-white transition-colors">INFO@DRIPS.COM</a>
             <a href="mailto:booking@drips.com" className="hover:text-white transition-colors">BOOKING@DRIPS.COM</a>
          </div>
        </div>

        {/* Legal / Cookie */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] text-gray-600 uppercase tracking-widest">
           <span>&copy; {new Date().getFullYear()} DRIPS COLLECTIVE. ALL RIGHTS RESERVED.</span>
           <div className="flex gap-6 mt-4 sm:mt-0">
             <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
             <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
             <a href="#cookies" className="hover:text-gray-400 transition-colors underline decoration-gray-700 underline-offset-4">Cookie Preferences</a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;