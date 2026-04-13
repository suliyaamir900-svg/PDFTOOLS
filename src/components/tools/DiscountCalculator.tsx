import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, Save, ShoppingCart } from 'lucide-react';

export default function DiscountCalculator() {
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [result, setResult] = React.useState<{ final: number; savings: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (!isNaN(p) && !isNaN(d)) {
      const savings = (p * d) / 100;
      setResult({ final: p - savings, savings });
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Original Price</label>
          <Input type="number" value={price} onChange={e => setPrice(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" placeholder="1000" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Discount (%)</label>
          <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" placeholder="20" />
        </div>
        <Button className="col-span-full h-14 rounded-xl text-lg font-bold" onClick={calculate}>
          Calculate Savings
        </Button>
      </div>

      {result && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-1">
            <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Final Price</div>
            <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">₹{result.final.toLocaleString()}</div>
          </div>
          <div className="p-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl text-center space-y-1">
            <div className="text-xs uppercase tracking-widest font-semibold text-green-600 dark:text-green-400">You Save</div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400">₹{result.savings.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
