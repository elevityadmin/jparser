
import React, { useState } from 'react';
import { Copy, Check, Code, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { highlightJSON, highlightXML, getJSONSize } from '@/utils/jsonUtils';

interface JsonViewerProps {
  formattedJson: string;
  className?: string;
  onClear: () => void;
}

const JsonViewer: React.FC<JsonViewerProps> = ({
  formattedJson,
  className,
  onClear
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSpacesVisible, setIsSpacesVisible] = useState(false);

  const handleCopy = async () => {
    if (!formattedJson) return;
    
    try {
      await navigator.clipboard.writeText(formattedJson);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleSpacesVisibility = () => {
    setIsSpacesVisible(!isSpacesVisible);
  };

  const formatSize = (size: number): string => {
    if (size < 1) {
      return `${(size * 1000).toFixed(2)} bytes`;
    }
    return `${size.toFixed(2)} KB`;
  };

  const getFormattedJsonWithLineNumbers = () => {
    if (!formattedJson) return { lineNumbers: '', formattedContent: '' };
    
    const lines = formattedJson.split('\n');
    const lineNumbers = lines.map((_, i) => i + 1).join('\n');
    
    let formattedContent = '';
    if (isSpacesVisible) {
      formattedContent = formattedJson.replace(/ /g, '·').replace(/\n/g, '↵\n');
    } else {
      formattedContent = formattedJson;
    }
    
    return { lineNumbers, formattedContent };
  };

  const { lineNumbers, formattedContent } = getFormattedJsonWithLineNumbers();
  // Generate highlighted HTML only if needed
  const highlightedJson = !isSpacesVisible && formattedJson ? (formattedJson.startsWith('<?xml') ? highlightXML(formattedJson) : highlightJSON(formattedJson)) : '';

  return (
    <div className={cn('relative h-full flex flex-col', className)}>
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Code size={16} />
          <span>Formatted JSON</span>
          {formattedJson && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-secondary rounded-full">
              {formatSize(getJSONSize(formattedJson))}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpacesVisibility}
            className={cn("subtle-button p-1.5", {
              "bg-accent text-accent-foreground": isSpacesVisible
            })}
            title={isSpacesVisible ? "Hide whitespace" : "Show whitespace"}
            disabled={!formattedJson}
          >
            <Code size={16} />
          </button>
          <button
            onClick={handleCopy}
            className="action-icon-button p-1.5"
            disabled={!formattedJson}
            title="Copy to clipboard"
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <button
            onClick={onClear}
            className="subtle-button p-1.5 hover:text-destructive"
            disabled={!formattedJson}
            title="Clear"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {formattedJson ? (
        <div className="flex items-start h-full">
          <div className="line-numbers select-none text-muted-foreground/60 pr-2 text-right pt-8 h-full">
            {lineNumbers.split('\n').map((num, i) => (
              <div key={i} className="line-number">{num}</div>
            ))}
          </div>
          <div className="json-viewer-container flex-1 h-full">
            {isSpacesVisible ? (
              <pre className="json-viewer animate-fade-in h-full whitespace-pre-wrap break-all">
                {formattedContent}
              </pre>
            ) : (
              <pre 
                className="json-viewer animate-fade-in h-full whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlightedJson }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="json-viewer flex items-center justify-center h-full">
          <div className="text-muted-foreground text-sm flex flex-col items-center gap-3 animate-pulse">
            <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center">
              <Code size={28} className="text-muted-foreground/40" />
            </div>
            <p>Formatted JSON will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JsonViewer;
