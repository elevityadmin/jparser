
import React, { useRef, useState } from 'react';
import { Copy, FileJson, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  isValid: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  placeholder = 'Paste your JSON here...',
  className,
  isValid
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleCopy = async () => {
    if (!value) return;
    
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn('relative h-full flex flex-col', className)}>
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <FileJson size={16} />
          <span>JSON Input</span>
          {value && isValid && (
            <span className="ml-2 text-xs text-green-500">Auto-formatting</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="action-icon-button p-1.5"
          disabled={!value}
          title="Copy to clipboard"
        >
          {isCopied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn(
          'json-editor flex-grow resize-none focus:outline-none',
          {
            'border-red-500 focus:ring-red-500/20': value && !isValid,
            'border-green-500 focus:ring-green-500/20': value && isValid,
            'animate-pulse': !isValid && value,
          }
        )}
        spellCheck={false}
        data-gramm="false"
      />
    </div>
  );
};

export default JsonEditor;
