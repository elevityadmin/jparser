
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'day' | 'dusk' | 'night';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    // Check system preference if no saved theme
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'night' : 'day';
    }
    
    return (['day', 'dusk', 'night'] as Theme[]).includes(savedTheme) ? savedTheme : 'day';
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'day' ? 'dusk' : prev === 'dusk' ? 'night' : 'day');
  };

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement;
    
    html.classList.remove('day', 'dusk', 'night', 'dark');
    html.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
