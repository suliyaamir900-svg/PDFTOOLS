import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent, ArrowRight, Calculator } from 'lucide-react';

export default function PercentageCalculator() {
  const [val1, setVal1] = React.useState('');
  const [val2, setVal2] = React.useState('');
  const [result, setResult] = React.useState<number | null>(null);

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setResult((v1 / 100) * v2);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-grow space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">What is</label>
            <div className="relative">
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} className="h-12 rounded-xl pr-10 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" placeholder="10" />
              <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            </div>
          </div>
          <div className="pt-8 font-bold text-zinc-400">of</div>
          <div className="flex-grow space-y-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Value</label>
            <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" placeholder="200" />
          </div>
        </div>
        <Button className="w-full h-14 rounded-xl text-lg font-bold" onClick={calculate}>
          Calculate
        </Button>
      </div>

      {result !== null && (
        <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Result</div>
          <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">{result.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
