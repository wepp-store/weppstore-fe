'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleModeSwitch = () => {
    const toggleTheme = () =>
      setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));

    if ('startViewTransition' in document) {
      (document as any).startViewTransition(toggleTheme);
      return;
    }
    toggleTheme();
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
