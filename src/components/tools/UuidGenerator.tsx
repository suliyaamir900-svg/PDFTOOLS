import React from 'react';
import { Button } from '@/components/ui/button';
import { Fingerprint, Copy, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [count, setCount] = React.useState(5);

  const generate = () => {
    const newUuids = Array(count).fill(0).map(() => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-end gap-4 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex-grow space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Number of UUIDs</label>
          <input 
            type="number" min="1" max="100" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none text-base"
          />
        </div>
        <Button className="h-12 px-8 rounded-xl font-bold" onClick={generate}>
          <RefreshCw className="mr-2 w-4 h-4" /> Generate
        </Button>
      </div>

      <div className="space-y-3">
        {uuids.map((uuid, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl group shadow-sm">
            <code className="font-mono text-sm text-zinc-800 dark:text-zinc-200">{uuid}</code>
            <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(uuid)} className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
