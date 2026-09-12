
import React from 'react';
import { Moon, Sun, CloudSun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full transition-all duration-300 transform hover:scale-105",
        theme === 'night' 
          ? "bg-secondary/80 text-primary hover:bg-secondary" 
          : "bg-secondary/50 text-primary/80 hover:bg-secondary/70"
      )}
      aria-label={`Switch theme (currently ${theme})`}
    >
      <div className="relative w-5 h-5">
        {theme === 'night' ? (
          <Sun className="absolute inset-0 w-5 h-5 text-yellow-400 animate-scale-in" />
        ) : theme === 'dusk' ? <CloudSun className="absolute inset-0 w-5 h-5 text-orange-300 animate-scale-in" /> : (
          <Moon className="absolute inset-0 w-5 h-5 text-primary animate-scale-in" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
