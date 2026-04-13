import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, RefreshCw, Shield, ShieldAlert, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function PasswordGenerator() {
  const [password, setPassword] = React.useState('');
  const [length, setLength] = React.useState(16);
  const [options, setOptions] = React.useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = React.useCallback(() => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPassword(result);
  }, [length, options]);

  React.useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const strength = length < 8 ? 'Weak' : length < 12 ? 'Medium' : 'Strong';
  const StrengthIcon = length < 8 ? ShieldAlert : length < 12 ? Shield : ShieldCheck;
  const strengthColor = length < 8 ? 'text-red-600 dark:text-red-400' : length < 12 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400';
  const strengthBg = length < 8 ? 'bg-red-100 dark:bg-red-900/30' : length < 12 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-green-100 dark:bg-green-900/30';

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
          <div className="text-3xl md:text-4xl font-mono font-bold break-all tracking-wider text-zinc-900 dark:text-zinc-100">{password}</div>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]", strengthBg, strengthColor)}>
              <StrengthIcon className="w-3.5 h-3.5" />
              {strength} Security
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
              <Zap className="w-3.5 h-3.5" />
              {length} Characters
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              className="h-12 px-6 rounded-xl font-semibold"
              onClick={generatePassword}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="h-12 px-6 rounded-xl font-semibold"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Password Length</h4>
            <span className="text-xl font-bold text-primary">{length}</span>
          </div>
          <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
              style={{ width: `${(length / 50) * 100}%` }}
            />
            <input 
              type="range" 
              min="4" 
              max="50" 
              value={length} 
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setOptions(prev => ({ ...prev, [key]: !value }))}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
                value 
                  ? 'bg-primary/5 border-primary/30 text-primary' 
                  : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", value ? "bg-primary text-white" : "bg-zinc-200 dark:bg-zinc-700")}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="capitalize font-semibold text-sm">{key}</span>
              </div>
              <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", value ? "border-primary bg-primary" : "border-zinc-300 dark:border-zinc-600")}>
                {value && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </button>
          ))}
        </div>

        <Button 
          className="w-full h-14 rounded-xl text-base font-bold" 
          onClick={generatePassword}
        >
          <Sparkles className="w-5 h-5 mr-2" /> Generate Secure Password
        </Button>
      </div>
    </div>
  );
}
