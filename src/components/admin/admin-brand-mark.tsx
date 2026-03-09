import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme';

type AdminBrandMarkProps = {
  logoLinkTo?: string;
  ariaLabel?: string;
  className?: string;
  logoClassName?: string;
};

export function AdminBrandMark({
  logoLinkTo,
  ariaLabel = 'AlphaGo',
  className,
  logoClassName,
}: AdminBrandMarkProps) {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/images/goin-light.png' : '/images/logo3alphago.svg';
  const alt = theme === 'light' ? 'GO IN' : 'AlphaGo Inside';
  const defaultSizeClass =
    'block w-28 sm:w-36 min-h-16 sm:min-h-24 object-contain logo-no-invert';

  const logo = (
    <figure>
      <img
        src={logoSrc}
        alt={alt}
        className={cn(defaultSizeClass, logoClassName)}
      />
    </figure>
  );

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {logoLinkTo ? (
        <Link to={logoLinkTo} aria-label={ariaLabel}>
          {logo}
        </Link>
      ) : (
        logo
      )}
    </div>
  );
}
