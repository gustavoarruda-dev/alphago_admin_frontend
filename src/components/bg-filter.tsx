import { useEffect, useState } from 'react';

export function BgFilter() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(!document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
        </filter>

        <linearGradient id="topGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
          <stop offset="30%" stopColor="#f9fafb" stopOpacity="0.02" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="topGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="var(--bgfilter-base)" />

      <circle
        cx="120%"
        cy="70%"
        r="100"
        fill="var(--bgfilter-circle1)"
        opacity="0.13"
        filter="url(#blur)"
      />
      <circle
        cx="-5%"
        cy="30%"
        r="70"
        fill="var(--bgfilter-circle2)"
        opacity="0.5"
        filter="url(#blur)"
      />
      <circle
        cx="60%"
        cy="80%"
        r="10"
        fill="var(--bgfilter-circle3)"
        opacity="0.15"
        filter="url(#blur)"
      />
      <circle
        cx="50%"
        cy="-20%"
        r="100"
        fill="var(--bgfilter-white)"
        opacity="0.3"
        filter="url(#blur)"
      />
      <circle
        cx="50%"
        cy="110%"
        r="100"
        fill="var(--bgfilter-gray)"
        opacity="0.3"
        filter="url(#blur)"
      />
      <circle
        cx="25%"
        cy="10%"
        r="80"
        fill="var(--bgfilter-white)"
        opacity="0.06"
        filter="url(#blur)"
      />
      <circle
        cx="75%"
        cy="10%"
        r="80"
        fill="var(--bgfilter-white)"
        opacity="0.06"
        filter="url(#blur)"
      />

      <rect
        width="100%"
        height="100%"
        fill={isLight ? 'url(#topGradientLight)' : 'url(#topGradientDark)'}
      />
    </svg>
  );
}
