import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  Timer, 
  History, 
  Briefcase,
  Calculator,
  RefreshCw
} from 'lucide-react';

interface DateTimeCalculatorsProps {
  mode: 'date-diff' | 'time' | 'work-hours' | 'countdown';
}

export default function DateTimeCalculators({ mode }: DateTimeCalculatorsProps) {
  const [inputs, setInputs] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    let res: any = null;
    switch (mode) {
      case 'time':
        const t1 = inputs.time1;
        const t2 = inputs.time2;
        const op = inputs.op || 'add';
        if (t1 && t2) {
          const [h1, m1] = t1.split(':').map(Number);
          const [h2, m2] = t2.split(':').map(Number);
          let totalM = op === 'add' ? (h1 * 60 + m1) + (h2 * 60 + m2) : (h1 * 60 + m1) - (h2 * 60 + m2);
          if (totalM < 0) totalM = 0;
          const h = Math.floor(totalM / 60);
          const m = totalM % 60;
          res = { 'Result': `${h}h ${m}m` };
        }
        break;
      case 'countdown':
        const target = new Date(inputs.targetDate);
        const now = new Date();
        const diff = target.getTime() - now.getTime();
        if (diff < 0) {
          res = { 'Countdown': 'Time is up!' };
        } else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          res = { 'Countdown': `${d}d ${h}h ${m}m remaining` };
        }
        break;
      case 'date-diff':
        const d1 = new Date(inputs.date1);
        const d2 = new Date(inputs.date2);
        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        res = { 'Difference': diffDays + ' days' };
        break;
      case 'work-hours':
        const start = inputs.startTime;
        const end = inputs.endTime;
        const breakTime = parseFloat(inputs.break || '0');
        if (start && end) {
          const [sH, sM] = start.split(':').map(Number);
          const [eH, eM] = end.split(':').map(Number);
          let totalMinutes = (eH * 60 + eM) - (sH * 60 + sM);
          if (totalMinutes < 0) totalMinutes += 24 * 60;
          totalMinutes -= breakTime;
          const h = Math.floor(totalMinutes / 60);
          const m = totalMinutes % 60;
          res = { 'Total Work Time': `${h}h ${m}m` };
        }
        break;
      default:
        res = { 'Message': 'Calculation logic coming soon!' };
    }
    setResult(res);
  };

  const getTitle = () => {
    return mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Calculator';
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500 text-lg">Manage your time and dates with precision and clarity.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 shadow-sm max-w-md mx-auto space-y-8">
        <div className="space-y-6">
          {mode === 'time' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Time 1</Label>
                <Input type="time" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.time1 || ''} onChange={e => setInputs({...inputs, time1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Operation</Label>
                <select 
                  className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-base appearance-none"
                  value={inputs.op || 'add'} onChange={e => setInputs({...inputs, op: e.target.value})}
                >
                  <option value="add">Add Time</option>
                  <option value="sub">Subtract Time</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Time 2</Label>
                <Input type="time" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.time2 || ''} onChange={e => setInputs({...inputs, time2: e.target.value})} />
              </div>
            </>
          )}

          {mode === 'countdown' && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Target Date & Time</Label>
              <Input type="datetime-local" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.targetDate || ''} onChange={e => setInputs({...inputs, targetDate: e.target.value})} />
            </div>
          )}

          {mode === 'date-diff' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Date</Label>
                <Input type="date" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.date1 || ''} onChange={e => setInputs({...inputs, date1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Date</Label>
                <Input type="date" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.date2 || ''} onChange={e => setInputs({...inputs, date2: e.target.value})} />
              </div>
            </>
          )}

          {mode === 'work-hours' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Start Time</Label>
                <Input type="time" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.startTime || ''} onChange={e => setInputs({...inputs, startTime: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">End Time</Label>
                <Input type="time" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.endTime || ''} onChange={e => setInputs({...inputs, endTime: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Break Duration (minutes)</Label>
                <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.break || ''} onChange={e => setInputs({...inputs, break: e.target.value})} />
              </div>
            </>
          )}
        </div>

        <Button className="w-full h-14 rounded-xl font-bold text-lg" onClick={calculate}>
          Calculate Time
        </Button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-2"
          >
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Calculation Result</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{Object.values(result)[0] as string}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
