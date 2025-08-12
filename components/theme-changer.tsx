'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MonitorIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { Button } from './ui/button';

const THEMES = ['light', 'system', 'dark'] as const;
const THEME_ICON = {
  light: <MonitorIcon />,
  system: <MoonStarIcon />,
  dark: <SunIcon />,
};

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);

  const changeTheme = () => {
    let nextThemeIdx = THEMES.indexOf(theme as keyof typeof THEME_ICON) + 1;
    if (nextThemeIdx === THEMES.length) nextThemeIdx = 0;
    setTheme(THEMES[nextThemeIdx]);
  };

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return <button className='w-6'></button>;
  }

  return (
    <>
      <button onClick={changeTheme} className='btn-icon'>
        {THEME_ICON[theme as keyof typeof THEME_ICON]}
      </button>
    </>
  );
}
