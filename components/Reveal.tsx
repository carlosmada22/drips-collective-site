import React from 'react';
import useInView from '../hooks/useInView';

type RevealDirection = 'up' | 'none';

type RevealProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  direction?: RevealDirection;
  amount?: number | number[];
  rootMargin?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const Reveal = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  delay,
  once = true,
  direction = 'up',
  amount,
  rootMargin,
  style,
  ...rest
}: RevealProps<T>) => {
  const { ref, inView } = useInView({ rootMargin, threshold: amount, once });
  const Tag = as ?? 'div';
  const classes = [
    'reveal-base',
    direction === 'up' ? 'reveal-up' : '',
    inView ? 'reveal-show' : 'reveal-hidden',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle = {
    ...(style ?? {}),
    ...(delay ? { transitionDelay: `${delay}ms` } : {}),
  };

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
