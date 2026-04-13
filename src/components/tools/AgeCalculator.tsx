import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = React.useState('');
  const [age, setAge] = React.useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    nextBirthday: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const nextBdayDiff = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAge({ years, months, days, totalDays, totalWeeks, totalHours, nextBirthday: nextBdayDiff });
    
    if (nextBdayDiff === 0 || nextBdayDiff === 365) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date of Birth</label>
          <Input 
            type="date" 
            className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <Button className="w-full h-14 rounded-xl text-lg font-bold" onClick={calculateAge}>
          Calculate Age
        </Button>
      </div>

      {age && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-2">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{age.years}</div>
              <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Years</div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl text-center space-y-2 border border-zinc-200 dark:border-zinc-800">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{age.months}</div>
              <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Months</div>
            </div>
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-3xl text-center space-y-2 border border-zinc-200 dark:border-zinc-800">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{age.days}</div>
              <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Days</div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <h3 className="font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100"><Star className="w-5 h-5 text-yellow-500" /> Fun Facts</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Total Weeks</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{age.totalWeeks.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Total Days</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{age.totalDays.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Total Hours</div>
                <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{age.totalHours.toLocaleString()}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-widest font-semibold text-zinc-500">Next Birthday</div>
                <div className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  {age.nextBirthday} days <PartyPopper className="w-4 h-4 text-pink-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
