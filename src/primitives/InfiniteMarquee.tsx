import React from 'react';

interface InfiniteMarqueeProps {
  text: string;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  reverse?: boolean;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({
  text,
  className = '',
  speed = 'normal',
  reverse = false,
}) => {
  const duration = speed === 'slow' ? '40s' : speed === 'fast' ? '16s' : '26s';
  const direction = reverse ? 'reverse' : 'normal';

  // Duplicate text for seamless loop
  const content = `${text} `.repeat(6);

  return (
    <div
      className={`overflow-hidden w-full select-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: `marquee-scroll ${duration} linear infinite ${direction}`,
        }}
      >
        <span className="pr-0">{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
};
