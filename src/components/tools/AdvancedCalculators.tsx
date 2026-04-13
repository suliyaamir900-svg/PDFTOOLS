import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { 
  Binary, 
  Code, 
  GraduationCap, 
  ShieldCheck, 
  Calculator,
  RefreshCw,
  Check,
  X
} from 'lucide-react';

interface AdvancedCalculatorsProps {
  mode: 'binary' | 'hex' | 'gpa' | 'password-strength';
}

export default function AdvancedCalculators({ mode }: AdvancedCalculatorsProps) {
  const [inputs, setInputs] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    let res: any = null;
    switch (mode) {
      case 'hex':
        const hex1 = inputs.hex1;
        const hex2 = inputs.hex2;
        const op_hex = inputs.op || '+';
        const dec_h1 = parseInt(hex1, 16);
        const dec_h2 = parseInt(hex2, 16);
        let decRes_h = 0;
        if (op_hex === '+') decRes_h = dec_h1 + dec_h2;
        if (op_hex === '-') decRes_h = dec_h1 - dec_h2;
        if (op_hex === '*') decRes_h = dec_h1 * dec_h2;
        if (op_hex === '/') decRes_h = Math.floor(dec_h1 / dec_h2);
        res = { 'Hex Result': decRes_h.toString(16).toUpperCase(), 'Decimal Result': decRes_h.toString() };
        break;
      case 'binary':
        const bin1 = inputs.bin1;
        const bin2 = inputs.bin2;
        const op = inputs.op || '+';
        const dec1 = parseInt(bin1, 2);
        const dec2 = parseInt(bin2, 2);
        let decRes = 0;
        if (op === '+') decRes = dec1 + dec2;
        if (op === '-') decRes = dec1 - dec2;
        if (op === '*') decRes = dec1 * dec2;
        if (op === '/') decRes = Math.floor(dec1 / dec2);
        res = { 'Binary Result': decRes.toString(2), 'Decimal Result': decRes.toString() };
        break;
      case 'password-strength':
        const pwd = inputs.password || '';
        let score = 0;
        if (pwd.length > 8) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
        res = { 'Strength': labels[score], 'Score': `${score}/4` };
        break;
      case 'gpa':
        const grades = inputs.grades.split(',').map(g => parseFloat(g.trim())).filter(g => !isNaN(g));
        const gpa = grades.reduce((a, b) => a + b, 0) / grades.length;
        res = { 'GPA': gpa.toFixed(2) };
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
        <p className="text-zinc-500 text-lg">Specialized tools for technical and academic needs.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 shadow-sm max-w-md mx-auto space-y-8">
        <div className="space-y-6">
          {mode === 'hex' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Hex Number 1</Label>
                <Input placeholder="A1B2..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.hex1 || ''} onChange={e => setInputs({...inputs, hex1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Operation</Label>
                <select className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-base appearance-none" value={inputs.op || '+'} onChange={e => setInputs({...inputs, op: e.target.value})}>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">*</option>
                  <option value="/">/</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Hex Number 2</Label>
                <Input placeholder="C3D4..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.hex2 || ''} onChange={e => setInputs({...inputs, hex2: e.target.value})} />
              </div>
            </>
          )}

          {mode === 'binary' && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Binary Number 1</Label>
                <Input placeholder="1010..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.bin1 || ''} onChange={e => setInputs({...inputs, bin1: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Operation</Label>
                <select className="w-full h-12 px-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-base appearance-none" value={inputs.op || '+'} onChange={e => setInputs({...inputs, op: e.target.value})}>
                  <option value="+">+</option>
                  <option value="-">-</option>
                  <option value="*">*</option>
                  <option value="/">/</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Binary Number 2</Label>
                <Input placeholder="1100..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.bin2 || ''} onChange={e => setInputs({...inputs, bin2: e.target.value})} />
              </div>
            </>
          )}

          {mode === 'password-strength' && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Enter Password</Label>
              <Input type="password" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.password || ''} onChange={e => setInputs({...inputs, password: e.target.value})} />
            </div>
          )}

          {mode === 'gpa' && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Grade Points (comma separated)</Label>
              <Input placeholder="4.0, 3.5, 3.8..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.grades || ''} onChange={e => setInputs({...inputs, grades: e.target.value})} />
            </div>
          )}
        </div>

        <Button className="w-full h-14 rounded-xl font-bold text-lg" onClick={calculate}>
          Calculate Result
        </Button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4"
          >
            {Object.entries(result).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-zinc-500 font-semibold text-sm">{key}</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{value as string}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
