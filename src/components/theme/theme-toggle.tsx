import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from './theme-provider';

export function ThemeToggle({
  className,
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? 'Modo claro' : 'Modo escuro';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn('gap-2', className)}
      aria-label={label}
      title={label}
      data-testid="theme-toggle"
    >
      <Icon className="size-4" />
      {showLabel ? <span className="text-sm">{label}</span> : null}
    </Button>
  );
}
