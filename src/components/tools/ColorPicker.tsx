import React from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Copy, Check } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = React.useState('#000000');
  const [copied, setCopied] = React.useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="flex flex-col items-center space-y-8">
        <div 
          className="w-48 h-48 rounded-[3rem] shadow-lg border-8 border-white dark:border-zinc-800 transition-colors duration-300"
          style={{ backgroundColor: color }}
        />
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          className="w-32 h-12 rounded-xl cursor-pointer bg-transparent border-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">HEX</div>
            <div className="text-xl font-mono font-bold uppercase">{color}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => copy(color)}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">RGB</div>
            <div className="text-xl font-mono font-bold">rgb({hexToRgb(color)})</div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => copy(`rgb(${hexToRgb(color)})`)}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
