import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Info } from 'lucide-react';

export default function BmiCalculator() {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [bmi, setBmi] = React.useState<number | null>(null);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      setBmi(parseFloat((w / (h * h)).toFixed(1)));
    }
  };

  const getCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
    if (val < 25) return { label: 'Normal weight', color: 'text-green-500' };
    if (val < 30) return { label: 'Overweight', color: 'text-yellow-500' };
    return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Weight (kg)</label>
          <Input 
            type="number" 
            placeholder="e.g. 70" 
            className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Height (cm)</label>
          <Input 
            type="number" 
            placeholder="e.g. 175" 
            className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <Button className="col-span-full h-14 rounded-xl text-lg font-bold" onClick={calculateBmi}>
          Calculate BMI
        </Button>
      </div>

      {bmi && (
        <div className="text-center space-y-4 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Your BMI is</div>
          <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">{bmi}</div>
          <div className={`text-xl font-bold ${getCategory(bmi).color}`}>
            {getCategory(bmi).label}
          </div>
          <div className="pt-6 grid grid-cols-4 gap-2 text-[10px] font-bold uppercase tracking-tighter text-zinc-500">
            <div className="space-y-1"><div className="h-1.5 bg-blue-500 rounded-full" /><span>&lt; 18.5</span></div>
            <div className="space-y-1"><div className="h-1.5 bg-green-500 rounded-full" /><span>18.5 - 25</span></div>
            <div className="space-y-1"><div className="h-1.5 bg-yellow-500 rounded-full" /><span>25 - 30</span></div>
            <div className="space-y-1"><div className="h-1.5 bg-red-500 rounded-full" /><span>&gt; 30</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
