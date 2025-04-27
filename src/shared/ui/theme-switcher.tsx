'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleModeSwitch = () => {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
      });
      return;
    }
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      suppressHydrationWarning
      onClick={handleModeSwitch}
      type="button"
      aria-label="Theme Switcher"
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  );
}

export { ThemeSwitcher };
