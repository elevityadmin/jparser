
/**
 * Formats a JSON string with proper indentation
 */
export const formatJSON = (jsonString: string, spaces: number = 2): string => {
  try {
    const parsedJSON = JSON.parse(jsonString);
    return JSON.stringify(parsedJSON, null, spaces);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
};

/**
 * Minifies a JSON string by removing all whitespace
 */
export const minifyJSON = (jsonString: string): string => {
  try {
    const parsedJSON = JSON.parse(jsonString);
    return JSON.stringify(parsedJSON);
  } catch (error) {
    throw new Error(`Invalid JSON: ${(error as Error).message}`);
  }
};

/**
 * Validates if a string is valid JSON
 */
export const isValidJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Syntax highlights JSON for rendering
 */
export const highlightJSON = (jsonString: string): string => {
  if (!jsonString) return '';
  
  try {
    // Parse and re-stringify to ensure valid JSON
    const obj = JSON.parse(jsonString);
    // Use regular expression for custom highlighting
    const formatted = JSON.stringify(obj, null, 2);
    
    // Escape HTML characters to prevent XSS
    const escaped = formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Apply syntax highlighting
    return escaped
      // Keys
      .replace(/"([^"]+)":/g, '<span class="text-json-key">"$1"</span>:')
      // String values
      .replace(/:(\s*)"([^"]*)"/g, ':$1<span class="text-json-string">"$2"</span>')
      // Numbers
      .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="text-json-number">$1</span>')
      // Booleans
      .replace(/:\s*(true|false)/g, ': <span class="text-json-boolean">$1</span>')
      // null
      .replace(/:\s*(null)/g, ': <span class="text-json-null">$1</span>');
  } catch (error) {
    // If JSON parsing fails, return the escaped input
    return jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};

/**
 * Gets the size of a JSON string in KB
 */
export const getJSONSize = (jsonString: string): number => {
  return new Blob([jsonString]).size / 1024;
};

export const jsonToXML = (jsonString: string): string => {
  const root = JSON.parse(jsonString);
  const esc = (v: unknown) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const node = (name: string, value: unknown, depth: number): string => {
    const pad = '  '.repeat(depth);
    if (Array.isArray(value)) return value.map(v => node(name, v, depth)).join('\n');
    if (value && typeof value === 'object') { const children = Object.entries(value).map(([k,v]) => node(k,v,depth+1)).join('\n'); return `${pad}<${name}>\n${children}\n${pad}</${name}>`; }
    return `${pad}<${name}>${value === null ? '' : esc(value)}</${name}>`;
  };
  return `<?xml version="1.0" encoding="UTF-8"?>\n${node('root', root, 0)}`;
};

export const highlightXML = (xml: string): string => {
  const escaped = xml.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  return escaped
    .replace(/(&lt;\/?)([\w:-]+)/g, '$1<span class="text-json-key">$2</span>')
    .replace(/([\w:-]+)=(&quot;.*?&quot;)/g, '<span class="text-json-boolean">$1</span>=<span class="text-json-string">$2</span>')
    .replace(/(&lt;\?.*?\?&gt;)/g, '<span class="text-json-number">$1</span>');
};
