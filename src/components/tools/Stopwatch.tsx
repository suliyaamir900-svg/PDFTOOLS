import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square, RotateCcw, Timer } from 'lucide-react';

export default function Stopwatch() {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
  };

  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-12 max-w-xl mx-auto text-center">
      <div className="p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="text-6xl md:text-8xl font-mono font-bold tracking-tighter tabular-nums text-zinc-900 dark:text-zinc-100">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <Button size="lg" className="h-20 w-20 rounded-full shadow-sm" onClick={start}>
            <Play className="w-8 h-8 fill-current" />
          </Button>
        ) : (
          <Button size="lg" variant="destructive" className="h-20 w-20 rounded-full shadow-sm" onClick={stop}>
            <Square className="w-8 h-8 fill-current" />
          </Button>
        )}
        <Button size="lg" variant="outline" className="h-20 w-20 rounded-full" onClick={reset}>
          <RotateCcw className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
