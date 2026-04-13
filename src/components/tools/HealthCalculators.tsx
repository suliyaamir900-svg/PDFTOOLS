import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { 
  Activity, 
  Heart, 
  Flame, 
  Scale, 
  User,
  Calculator,
  RefreshCw
} from 'lucide-react';

interface HealthCalculatorsProps {
  mode: 'bmr' | 'calorie' | 'body-fat' | 'ideal-weight';
}

export default function HealthCalculators({ mode }: HealthCalculatorsProps) {
  const [inputs, setInputs] = React.useState<Record<string, string>>({ gender: 'male' });
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    const age = parseFloat(inputs.age);
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height);
    let res: any = null;

    switch (mode) {
      case 'bmr':
        // Mifflin-St Jeor Equation
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = inputs.gender === 'male' ? bmr + 5 : bmr - 161;
        res = { 'BMR': bmr.toFixed(0) + ' kcal/day' };
        break;
      case 'calorie':
        let baseBmr = (10 * weight) + (6.25 * height) - (5 * age);
        baseBmr = inputs.gender === 'male' ? baseBmr + 5 : baseBmr - 161;
        res = {
          'Sedentary': (baseBmr * 1.2).toFixed(0) + ' kcal',
          'Lightly Active': (baseBmr * 1.375).toFixed(0) + ' kcal',
          'Moderately Active': (baseBmr * 1.55).toFixed(0) + ' kcal',
          'Very Active': (baseBmr * 1.725).toFixed(0) + ' kcal'
        };
        break;
      case 'body-fat':
        const neck = parseFloat(inputs.neck);
        const waist = parseFloat(inputs.waist);
        const hip = parseFloat(inputs.hip || '0');
        let bodyFat = 0;
        if (inputs.gender === 'male') {
          bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
          bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
        res = { 'Body Fat': bodyFat.toFixed(1) + '%' };
        break;
      case 'ideal-weight':
        // Devine Formula
        const heightInches = height / 2.54;
        const baseHeight = 60; // 5 feet
        const extraInches = Math.max(0, heightInches - baseHeight);
        let ideal = inputs.gender === 'male' ? 50 + (2.3 * extraInches) : 45.5 + (2.3 * extraInches);
        res = { 'Ideal Weight': ideal.toFixed(1) + ' kg' };
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
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500 text-lg">Monitor your health and fitness goals with precision.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 shadow-sm space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant={inputs.gender === 'male' ? 'default' : 'outline'} 
              className={cn(
                "rounded-xl h-14 text-base font-semibold transition-all",
                inputs.gender === 'male' ? "bg-primary text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
              onClick={() => setInputs({...inputs, gender: 'male'})}
            >
              <User className="w-5 h-5 mr-2" /> Male
            </Button>
            <Button 
              variant={inputs.gender === 'female' ? 'default' : 'outline'} 
              className={cn(
                "rounded-xl h-14 text-base font-semibold transition-all",
                inputs.gender === 'female' ? "bg-primary text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
              onClick={() => setInputs({...inputs, gender: 'female'})}
            >
              <User className="w-5 h-5 mr-2" /> Female
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Age (years)</Label>
              <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.age || ''} onChange={e => setInputs({...inputs, age: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Weight (kg)</Label>
              <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.weight || ''} onChange={e => setInputs({...inputs, weight: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Height (cm)</Label>
              <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.height || ''} onChange={e => setInputs({...inputs, height: e.target.value})} />
            </div>

            {mode === 'body-fat' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Neck (cm)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.neck || ''} onChange={e => setInputs({...inputs, neck: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Waist (cm)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.waist || ''} onChange={e => setInputs({...inputs, waist: e.target.value})} />
                </div>
                {inputs.gender === 'female' && (
                  <div className="space-y-2 col-span-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Hip (cm)</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.hip || ''} onChange={e => setInputs({...inputs, hip: e.target.value})} />
                  </div>
                )}
              </div>
            )}
          </div>

          <Button className="w-full h-14 rounded-xl font-bold text-lg" onClick={calculate}>
            Calculate Stats
          </Button>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800 min-h-[400px] flex flex-col justify-center shadow-sm">
            {result ? (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Health Analysis</div>
                  <h3 className="text-2xl font-bold tracking-tight">Your Results</h3>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(result).map(([key, value]) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={key} 
                      className="p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center"
                    >
                      <span className="text-zinc-500 font-semibold text-sm">{key}</span>
                      <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{value as string}</span>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-xl font-bold border-zinc-200 dark:border-zinc-800" onClick={() => setResult(null)}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold tracking-tight">Ready to Analyze</p>
                  <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">Enter your measurements to see your health metrics.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
