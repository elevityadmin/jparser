
import React from 'react';
import { Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JsonControlsProps {
  onClear: () => void;
  onCopyFormatted: () => void;
  isValid: boolean;
  hasContent: boolean;
  className?: string;
}

const JsonControls: React.FC<JsonControlsProps> = ({
  onClear,
  onCopyFormatted,
  isValid,
  hasContent,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <button
        onClick={onClear}
        disabled={!hasContent}
        className={cn(
          "subtle-button flex items-center gap-2",
          !hasContent && "opacity-50 cursor-not-allowed"
        )}
      >
        <Trash2 size={16} />
        <span>Clear</span>
      </button>
      
      <button
        onClick={onCopyFormatted}
        disabled={!hasContent || !isValid}
        className={cn(
          "subtle-button flex items-center gap-2",
          (!hasContent || !isValid) && "opacity-50 cursor-not-allowed"
        )}
      >
        <Copy size={16} />
        <span>Copy Formatted</span>
      </button>
    </div>
  );
};

export default JsonControls;
