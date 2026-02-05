import React from 'react';
import { Link } from 'react-router-dom';

type CookieNoticeProps = {
  title?: string;
  description?: string;
  className?: string;
};

const CookieNotice: React.FC<CookieNoticeProps> = ({
  title = 'Content blocked',
  description = 'Accept cookies to view this embedded content.',
  className = '',
}) => {
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 text-center px-6 py-10 bg-black/70 border border-white/10 text-white/70 ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.35em] font-heading text-white/80">
        {title}
      </p>
      <p className="text-xs md:text-sm body-copy-font text-white/60 max-w-md leading-relaxed tracking-normal normal-case">
        {description}
      </p>
      <Link
        to="/cookie-policy"
        className="text-xs uppercase tracking-[0.3em] font-heading text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
      >
        Cookie Preferences
      </Link>
    </div>
  );
};

export default CookieNotice;
