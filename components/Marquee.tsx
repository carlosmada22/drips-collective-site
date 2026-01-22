import React from 'react';
import { Link } from 'react-router-dom';

interface MarqueeProps {
  items: string[];
  separator?: string;
  includeTrailingSeparator?: boolean;
  linkTo?: string;
  animationClassName?: string;
  outerClassName?: string;
  itemClassName?: string;
  separatorClassName?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  items,
  separator = '\u2022',
  includeTrailingSeparator = true,
  linkTo,
  animationClassName = 'animate-marquee',
  outerClassName = '',
  itemClassName = '',
  separatorClassName = '',
}) => {
  if (items.length === 0) {
    return null;
  }

  const baseItemClassName =
    'text-6xl md:text-8xl font-heading font-bold uppercase tracking-widest mx-8 md:mx-16 text-transparent stroke-text opacity-50 hover:opacity-100 transition-opacity duration-300';
  const baseSeparatorClassName =
    'text-6xl md:text-8xl font-heading font-bold uppercase tracking-widest text-transparent stroke-text opacity-50';

  const combinedItemClassName = `${baseItemClassName} ${itemClassName}`.trim();
  const combinedSeparatorClassName = `${baseSeparatorClassName} mx-6 md:mx-8 ${separatorClassName}`.trim();

  const renderItems = (suffix: string) =>
    items.map((item, index) => {
      const content = (
        <span className={combinedItemClassName} style={{ WebkitTextStroke: '1px white' }}>
          {item}
        </span>
      );
      const showSeparator = includeTrailingSeparator || index < items.length - 1;

      return (
        <span key={`${item}-${index}${suffix}`} className="inline-flex items-center">
          {linkTo ? (
            <Link to={linkTo} className="inline-flex items-center">
              {content}
            </Link>
          ) : (
            content
          )}
          {showSeparator && (
            <span className={combinedSeparatorClassName} style={{ WebkitTextStroke: '1px white' }}>
              {separator}
            </span>
          )}
        </span>
      );
    });

  return (
    <div
      className={`relative w-full py-8 border-y border-white/10 bg-white/5 ${outerClassName}`.trim()}
    >
      <div className="overflow-hidden whitespace-nowrap">
        <div className={`${animationClassName} inline-block`}>
          {renderItems('')}
          {renderItems('-dup')}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
