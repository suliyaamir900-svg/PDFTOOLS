import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeftRight, Ruler, Weight, Thermometer } from 'lucide-react';

interface UnitConverterProps {
  mode?: 'length' | 'weight' | 'temperature' | 'speed' | 'area' | 'volume' | 'data';
}

const UNITS = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, yd: 1.09361, mi: 0.000621371 },
  weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
  temperature: { c: 'c', f: 'f', k: 'k' },
  speed: { 'm/s': 1, 'km/h': 3.6, 'mph': 2.23694, 'knots': 1.94384 },
  area: { 'sq m': 1, 'sq km': 0.000001, 'sq ft': 10.7639, 'acre': 0.000247105, 'hectare': 0.0001 },
  volume: { 'liter': 1, 'ml': 1000, 'gallon': 0.264172, 'cup': 4.22675 },
  data: { 'B': 1, 'KB': 1/1024, 'MB': 1/(1024**2), 'GB': 1/(1024**3), 'TB': 1/(1024**4) }
};

export default function UnitConverter({ mode = 'length' }: UnitConverterProps) {
  const [type, setType] = React.useState(mode);
  const [value, setValue] = React.useState('1');
  const [from, setFrom] = React.useState(Object.keys(UNITS[mode])[0]);
  const [to, setTo] = React.useState(Object.keys(UNITS[mode])[1] || Object.keys(UNITS[mode])[0]);
  const [result, setResult] = React.useState<number | string | null>(null);

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;

    if (type === 'temperature') {
      let celsius = v;
      if (from === 'f') celsius = (v - 32) * 5/9;
      if (from === 'k') celsius = v - 273.15;

      let res = celsius;
      if (to === 'f') res = (celsius * 9/5) + 32;
      if (to === 'k') res = celsius + 273.15;
      setResult(res);
      return;
    }

    const units = UNITS[type];
    // @ts-ignore
    const base = v / units[from];
    // @ts-ignore
    const converted = base * units[to];
    setResult(converted);
  };

  React.useEffect(() => {
    setType(mode);
    setFrom(Object.keys(UNITS[mode])[0]);
    setTo(Object.keys(UNITS[mode])[1] || Object.keys(UNITS[mode])[0]);
  }, [mode]);

  React.useEffect(() => {
    convert();
  }, [value, from, to, type]);

  const displayResult = typeof result === 'number' ? result.toLocaleString(undefined, { maximumFractionDigits: 4 }) : result;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight capitalize">{type} Converter</h2>
        <p className="text-zinc-500">Quick and accurate unit conversion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 items-end shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Value</label>
          <Input type="number" value={value} onChange={e => setValue(e.target.value)} className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">From</label>
          <select 
            value={from} onChange={e => setFrom(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none text-base appearance-none"
          >
            {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">To</label>
          <select 
            value={to} onChange={e => setTo(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none text-base appearance-none"
          >
            {Object.keys(UNITS[type]).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>

      {result !== null && (
        <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{value} {from} equals</div>
          <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">{displayResult} {to}</div>
        </div>
      )}
    </div>
  );
}
