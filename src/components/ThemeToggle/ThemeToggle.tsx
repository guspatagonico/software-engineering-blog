import { useThemeStore } from '@/stores/themeStore';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button type="button" onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
      {theme === 'dark' ? '☾' : '☀'}
    </button>
  );
}
