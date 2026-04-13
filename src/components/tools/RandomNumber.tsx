import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dices, RefreshCw } from 'lucide-react';

export default function RandomNumber() {
  const [min, setMin] = React.useState('1');
  const [max, setMax] = React.useState('100');
  const [result, setResult] = React.useState<number | null>(null);

  const generate = () => {
    const mn = parseInt(min);
    const mx = parseInt(max);
    if (!isNaN(mn) && !isNaN(mx) && mx > mn) {
      setResult(Math.floor(Math.random() * (mx - mn + 1)) + mn);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Min</label>
          <Input type="number" value={min} onChange={e => setMin(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Max</label>
          <Input type="number" value={max} onChange={e => setMax(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <Button className="col-span-full h-14 rounded-xl text-lg font-bold" onClick={generate}>
          <Dices className="mr-2 w-5 h-5" /> Generate Random Number
        </Button>
      </div>

      {result !== null && (
        <div className="p-16 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Your Random Number</div>
          <div className="text-8xl font-bold text-zinc-900 dark:text-zinc-100">{result}</div>
        </div>
      )}
    </div>
  );
}
