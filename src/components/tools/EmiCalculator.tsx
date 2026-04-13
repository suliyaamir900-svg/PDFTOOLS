import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Landmark, CalendarDays } from 'lucide-react';

export default function EmiCalculator() {
  const [loan, setLoan] = React.useState('100000');
  const [interest, setInterest] = React.useState('8.5');
  const [tenure, setTenure] = React.useState('12');
  const [result, setResult] = React.useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(loan);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseFloat(tenure);

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    });
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Loan Amount</label>
          <Input type="number" value={loan} onChange={e => setLoan(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</label>
          <Input type="number" value={interest} onChange={e => setInterest(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Tenure (Months)</label>
          <Input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <Button className="col-span-full h-14 rounded-xl font-bold text-lg" onClick={calculate}>Calculate EMI</Button>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-1">
            <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Monthly EMI</div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">₹{result.emi.toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl text-center space-y-1 border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Total Interest</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">₹{result.totalInterest.toLocaleString()}</div>
          </div>
          <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl text-center space-y-1 border border-zinc-200 dark:border-zinc-800">
            <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Total Payment</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">₹{result.totalPayment.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
