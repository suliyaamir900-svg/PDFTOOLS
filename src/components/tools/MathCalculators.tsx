import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calculator, 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Equal, 
  RefreshCw,
  Hash,
  Activity,
  FunctionSquare
} from 'lucide-react';

interface MathCalculatorsProps {
  mode: 'simple' | 'scientific' | 'algebra' | 'equation' | 'lcm-hcf' | 'prime' | 'factorial' | 'log' | 'trig' | 'matrix' | 'statistics' | 'root-cube' | 'ratio' | 'fraction' | 'average' | 'profit-loss';
}

export default function MathCalculators({ mode }: MathCalculatorsProps) {
  const [display, setDisplay] = React.useState('0');
  const [equation, setEquation] = React.useState('');
  const [inputs, setInputs] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<string | null>(null);

  const handleInput = (key: string) => {
    setInputs(prev => ({ ...prev, [key]: inputs[key] || '' }));
  };

  const calculate = () => {
    try {
      let res = '';
      switch (mode) {
        case 'simple':
        case 'scientific':
          res = eval(display).toString();
          break;
        case 'algebra':
          const a_alg = parseFloat(inputs.a);
          const b_alg = parseFloat(inputs.b);
          const c_alg = parseFloat(inputs.c);
          // ax + b = c => x = (c - b) / a
          res = `x = ${(c_alg - b_alg) / a_alg}`;
          break;
        case 'equation':
          const a_eq = parseFloat(inputs.a);
          const b_eq = parseFloat(inputs.b);
          const c_eq = parseFloat(inputs.c);
          const disc = b_eq * b_eq - 4 * a_eq * c_eq;
          if (disc < 0) res = "No real roots";
          else if (disc === 0) res = `x = ${-b_eq / (2 * a_eq)}`;
          else {
            const x1 = (-b_eq + Math.sqrt(disc)) / (2 * a_eq);
            const x2 = (-b_eq - Math.sqrt(disc)) / (2 * a_eq);
            res = `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
          }
          break;
        case 'log':
          const base = parseFloat(inputs.base) || 10;
          const val_log = parseFloat(inputs.num);
          res = `log${base}(${val_log}) = ${(Math.log(val_log) / Math.log(base)).toFixed(4)}`;
          break;
        case 'trig':
          const angle = parseFloat(inputs.num);
          const rad = (angle * Math.PI) / 180;
          res = `sin: ${Math.sin(rad).toFixed(4)}, cos: ${Math.cos(rad).toFixed(4)}, tan: ${Math.tan(rad).toFixed(4)}`;
          break;
        case 'matrix':
          // Simple 2x2 matrix addition for now
          const m1 = [parseFloat(inputs.m11), parseFloat(inputs.m12), parseFloat(inputs.m21), parseFloat(inputs.m22)];
          const m2 = [parseFloat(inputs.n11), parseFloat(inputs.n12), parseFloat(inputs.n21), parseFloat(inputs.n22)];
          res = `Result: [${m1[0]+m2[0]}, ${m1[1]+m2[1]}] [${m1[2]+m2[2]}, ${m1[3]+m2[3]}]`;
          break;
        case 'statistics':
          const s_nums = inputs.nums.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
          const s_mean = s_nums.reduce((a, b) => a + b, 0) / s_nums.length;
          const s_variance = s_nums.reduce((a, b) => a + Math.pow(b - s_mean, 2), 0) / s_nums.length;
          res = `Mean: ${s_mean.toFixed(2)}, SD: ${Math.sqrt(s_variance).toFixed(2)}`;
          break;
        case 'ratio':
          const r1 = parseInt(inputs.num1);
          const r2 = parseInt(inputs.num2);
          const r_gcd = (a: number, b: number): number => b === 0 ? a : r_gcd(b, a % b);
          const common = r_gcd(r1, r2);
          res = `Simplified Ratio: ${r1/common}:${r2/common}`;
          break;
        case 'fraction':
          const n_f1 = parseInt(inputs.n1);
          const d_f1 = parseInt(inputs.d1);
          const n_f2 = parseInt(inputs.n2);
          const d_f2 = parseInt(inputs.d2);
          const common_d = d_f1 * d_f2;
          const common_n = (n_f1 * d_f2) + (n_f2 * d_f1);
          const f_gcd = (a: number, b: number): number => b === 0 ? a : f_gcd(b, a % b);
          const f_common = f_gcd(common_n, common_d);
          res = `Result: ${common_n/f_common}/${common_d/f_common}`;
          break;
        case 'lcm-hcf':
          const n1 = parseInt(inputs.num1);
          const n2 = parseInt(inputs.num2);
          const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
          const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
          res = `GCD: ${gcd(n1, n2)}, LCM: ${lcm(n1, n2)}`;
          break;
        case 'prime':
          const num = parseInt(inputs.num);
          const isPrime = (n: number) => {
            for (let i = 2, s = Math.sqrt(n); i <= s; i++) if (n % i === 0) return false;
            return n > 1;
          };
          res = isPrime(num) ? 'Prime Number' : 'Not a Prime Number';
          break;
        case 'factorial':
          const f = (n: number): number => n <= 1 ? 1 : n * f(n - 1);
          res = f(parseInt(inputs.num)).toString();
          break;
        case 'root-cube':
          const val = parseFloat(inputs.num);
          res = `Square Root: ${Math.sqrt(val).toFixed(4)}, Cube Root: ${Math.cbrt(val).toFixed(4)}`;
          break;
        case 'average':
          const nums = inputs.nums.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
          const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
          res = `Average: ${avg.toFixed(2)}`;
          break;
        case 'profit-loss':
          const cp = parseFloat(inputs.cp);
          const sp = parseFloat(inputs.sp);
          const diff = sp - cp;
          const percent = (Math.abs(diff) / cp) * 100;
          res = diff >= 0 ? `Profit: ${diff} (${percent.toFixed(2)}%)` : `Loss: ${Math.abs(diff)} (${percent.toFixed(2)}%)`;
          break;
        default:
          res = "Calculation logic for this mode is coming soon!";
      }
      setResult(res);
    } catch (e) {
      setResult('Error');
    }
  };

  const getTitle = () => {
    return mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Calculator';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500 text-lg">Accurate and fast mathematical calculations in your browser.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 shadow-sm">
        {(mode === 'simple' || mode === 'scientific') ? (
          <div className="max-w-md mx-auto space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl text-right border border-zinc-200 dark:border-zinc-800 shadow-inner">
              <div className="text-zinc-500 text-sm h-6 font-mono tracking-wider">{equation}</div>
              <div className="text-4xl font-bold font-mono truncate text-zinc-900 dark:text-zinc-100">{display}</div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map(btn => (
                <Button 
                  key={btn} 
                  variant={btn === '=' ? 'default' : 'outline'}
                  className={cn(
                    "h-14 rounded-xl text-xl font-semibold transition-all duration-200",
                    btn === '=' ? "bg-primary text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                    btn === 'C' ? "text-red-500 hover:text-red-600" : ""
                  )}
                  onClick={() => {
                    if (btn === 'C') { setDisplay('0'); setEquation(''); }
                    else if (btn === '=') { calculate(); }
                    else { setDisplay(display === '0' ? btn : display + btn); }
                  }}
                >
                  {btn}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="space-y-5">
              {(mode === 'lcm-hcf' || mode === 'ratio') && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Number 1</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.num1 || ''} onChange={e => setInputs({...inputs, num1: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Number 2</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.num2 || ''} onChange={e => setInputs({...inputs, num2: e.target.value})} />
                  </div>
                </>
              )}
              {(mode === 'algebra' || mode === 'equation') && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">a</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.a || ''} onChange={e => setInputs({...inputs, a: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">b</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.b || ''} onChange={e => setInputs({...inputs, b: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">c</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.c || ''} onChange={e => setInputs({...inputs, c: e.target.value})} />
                  </div>
                </div>
              )}
              {mode === 'log' && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Base</Label>
                    <Input type="number" placeholder="10" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.base || ''} onChange={e => setInputs({...inputs, base: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Number</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.num || ''} onChange={e => setInputs({...inputs, num: e.target.value})} />
                  </div>
                </>
              )}
              {mode === 'matrix' && (
                <div className="grid grid-cols-4 gap-2">
                  {['m11', 'm12', 'm21', 'm22', 'n11', 'n12', 'n21', 'n22'].map(key => (
                    <div key={key} className="space-y-1">
                      <Label className="text-xs font-semibold text-zinc-500 uppercase">{key}</Label>
                      <Input type="number" className="h-10 rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-sm" value={inputs[key] || ''} onChange={e => setInputs({...inputs, [key]: e.target.value})} />
                    </div>
                  ))}
                </div>
              )}
              {mode === 'fraction' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Input type="number" placeholder="N1" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-center" value={inputs.n1 || ''} onChange={e => setInputs({...inputs, n1: e.target.value})} />
                    <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
                    <Input type="number" placeholder="D1" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-center" value={inputs.d1 || ''} onChange={e => setInputs({...inputs, d1: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <Input type="number" placeholder="N2" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-center" value={inputs.n2 || ''} onChange={e => setInputs({...inputs, n2: e.target.value})} />
                    <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
                    <Input type="number" placeholder="D2" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-center" value={inputs.d2 || ''} onChange={e => setInputs({...inputs, d2: e.target.value})} />
                  </div>
                </div>
              )}
              {(mode === 'prime' || mode === 'factorial' || mode === 'root-cube' || mode === 'trig') && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Enter Number</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.num || ''} onChange={e => setInputs({...inputs, num: e.target.value})} />
                </div>
              )}
              {mode === 'average' && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Numbers (comma separated)</Label>
                  <Input placeholder="10, 20, 30..." className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.nums || ''} onChange={e => setInputs({...inputs, nums: e.target.value})} />
                </div>
              )}
              {mode === 'profit-loss' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Cost Price</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.cp || ''} onChange={e => setInputs({...inputs, cp: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Selling Price</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.sp || ''} onChange={e => setInputs({...inputs, sp: e.target.value})} />
                  </div>
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
                className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-2"
              >
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Result Output</div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{result}</div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
