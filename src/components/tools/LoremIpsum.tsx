import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Trash2, FileText, Hash, Type } from 'lucide-react';

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [result, setResult] = React.useState('');

  const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    const arr = Array(paragraphs).fill(LOREM);
    setResult(arr.join('\n\n'));
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-end gap-4 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex-grow space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Number of Paragraphs</label>
          <Input 
            type="number" min="1" max="50" 
            value={paragraphs} 
            onChange={(e) => setParagraphs(parseInt(e.target.value))}
            className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base"
          />
        </div>
        <Button className="h-12 px-8 rounded-xl font-bold" onClick={generate}>Generate</Button>
      </div>

      <div className="relative">
        <textarea
          readOnly
          className="w-full h-80 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-serif text-lg leading-relaxed outline-none shadow-sm"
          value={result}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(result)} className="rounded-xl">
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
        </div>
      </div>
    </div>
  );
}
