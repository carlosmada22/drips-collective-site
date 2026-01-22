import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  to?: string;
  href?: string;
  variant?: 'outline' | 'solid';
  className?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  to,
  href,
  variant = 'outline',
  className = '',
  target,
  rel,
  ...props
}) => {
  const baseClasses = "px-8 py-3 uppercase tracking-widest text-sm font-medium transition-all duration-300 border border-white text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50";
  const solidClasses = "bg-white text-black hover:bg-gray-200 hover:border-gray-200";
  
  const finalClasses = `${baseClasses} ${variant === 'solid' ? solidClasses : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={`inline-block text-center ${finalClasses}`}>
        {label}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={`inline-block text-center ${finalClasses}`}>
        {label}
      </a>
    );
  }

  return (
    <button className={finalClasses} {...props}>
      {label}
    </button>
  );
};

export default Button;
