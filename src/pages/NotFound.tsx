
import React from 'react';
import { FileJson2, AlertCircle } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      
      <div className="glass-panel p-10 max-w-md w-full text-center animate-slide-up shadow-xl">
        <div className="relative mb-8">
          <div className="absolute -top-3 -left-3 w-12 h-12 flex items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle size={22} className="text-destructive" />
          </div>
          <div className="p-4 rounded-full bg-primary/10 mb-4 mx-auto w-fit">
            <FileJson2 size={36} className="text-primary" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
        
        <a 
          href="/" 
          className="action-button inline-block no-underline hover:shadow-lg"
        >
          Return to Parser
        </a>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground/60">
        © JSON Parser
      </div>
    </div>
  );
};

export default NotFound;
