import { cn } from '@/lib/utils';

type AdminSidebarIconProps = {
  src: string;
  isActive: boolean;
  isDisabled: boolean;
  className?: string;
};

export function AdminSidebarIcon({
  src,
  isActive,
  isDisabled,
  className,
}: AdminSidebarIconProps) {
  const opacity = isDisabled ? 0.35 : 1;

  return (
    <span
      aria-hidden
      className={cn('inline-block size-6', className)}
      style={{
        backgroundColor: isActive ? '#ffffff' : 'hsl(var(--foreground))',
        opacity,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskImage: `url(${src})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
      }}
    />
  );
}
