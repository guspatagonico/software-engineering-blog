import { useThemeStore } from '@/stores/themeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button type="button" onClick={toggle} style={buttonStyle} aria-label="Toggle theme">
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}

const buttonStyle: React.CSSProperties = {
  background: 'var(--surface2)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  padding: '4px 10px',
  fontSize: '14px',
  cursor: 'pointer',
  color: 'var(--text)',
  lineHeight: 1,
};
