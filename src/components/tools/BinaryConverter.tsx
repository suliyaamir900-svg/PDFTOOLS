import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Binary, Hash } from 'lucide-react';

export default function BinaryConverter() {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [mode, setMode] = React.useState<'text-to-binary' | 'binary-to-text'>('text-to-binary');

  const process = () => {
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      if (mode === 'text-to-binary') {
        const binary = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
        setOutput(binary);
      } else {
        const text = input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        setOutput(text);
      }
    } catch (err) {
      setOutput('Error: Invalid input for conversion');
    }
  };

  React.useEffect(() => {
    process();
  }, [input, mode]);

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl flex">
          <button 
            onClick={() => setMode('text-to-binary')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'text-to-binary' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}
          >
            Text to Binary
          </button>
          <button 
            onClick={() => setMode('binary-to-text')}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'binary-to-text' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500'}`}
          >
            Binary to Text
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Input</label>
          <textarea
            className="w-full h-64 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none font-mono text-sm"
            placeholder={mode === 'text-to-binary' ? 'Enter text...' : 'Enter binary (e.g. 01001000)...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Output</label>
          <div className="relative group">
            <textarea
              readOnly
              className="w-full h-64 p-6 rounded-3xl bg-zinc-900 text-zinc-100 border border-zinc-800 outline-none transition-all resize-none font-mono text-sm"
              value={output}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(output)} className="rounded-xl">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
