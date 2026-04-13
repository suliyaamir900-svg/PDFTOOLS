import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { 
  Banknote, 
  TrendingUp, 
  Percent, 
  CreditCard, 
  Wallet,
  Calculator,
  RefreshCw,
  ArrowRightLeft,
  Fuel,
  Zap,
  Coffee
} from 'lucide-react';

interface FinanceCalculatorsProps {
  mode: 'loan' | 'interest' | 'compound' | 'simple-interest' | 'investment' | 'sip' | 'tax' | 'salary' | 'currency' | 'tip' | 'fuel' | 'electricity';
}

export default function FinanceCalculators({ mode }: FinanceCalculatorsProps) {
  const [inputs, setInputs] = React.useState<Record<string, string>>({});
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    let res: any = null;
    const p = parseFloat(inputs.principal);
    const r = parseFloat(inputs.rate) / 100;
    const t = parseFloat(inputs.time);

    switch (mode) {
      case 'loan':
        const r_loan = r / 12;
        const n_loan = t * 12;
        const emi = p * r_loan * Math.pow(1 + r_loan, n_loan) / (Math.pow(1 + r_loan, n_loan) - 1);
        res = { 'Monthly EMI': emi.toFixed(2), 'Total Interest': (emi * n_loan - p).toFixed(2), 'Total Payment': (emi * n_loan).toFixed(2) };
        break;
      case 'interest':
        const si_int = p * r * t;
        const ci_int = p * Math.pow(1 + r, t) - p;
        res = { 'Simple Interest': si_int.toFixed(2), 'Compound Interest': ci_int.toFixed(2), 'Total (CI)': (p + ci_int).toFixed(2) };
        break;
      case 'investment':
        const fv = p * Math.pow(1 + r, t);
        res = { 'Invested': p.toFixed(2), 'Future Value': fv.toFixed(2), 'Total Gain': (fv - p).toFixed(2) };
        break;
      case 'tax':
        const income = parseFloat(inputs.income);
        const taxRate = parseFloat(inputs.taxRate) / 100;
        const taxAmount = income * taxRate;
        res = { 'Taxable Income': income.toFixed(2), 'Tax Amount': taxAmount.toFixed(2), 'After Tax': (income - taxAmount).toFixed(2) };
        break;
      case 'salary':
        const gross = parseFloat(inputs.gross);
        const deductions = parseFloat(inputs.deductions) || 0;
        const net = gross - deductions;
        res = { 'Gross Salary': gross.toFixed(2), 'Deductions': deductions.toFixed(2), 'Net Salary': net.toFixed(2) };
        break;
      case 'currency':
        const amount_curr = parseFloat(inputs.amount);
        const rate_curr = parseFloat(inputs.rate) || 1.1; // Mock rate
        res = { 'Amount': amount_curr.toFixed(2), 'Converted': (amount_curr * rate_curr).toFixed(2) };
        break;
      case 'simple-interest':
        const si = p * r * t;
        res = { 'Interest': si.toFixed(2), 'Total Amount': (p + si).toFixed(2) };
        break;
      case 'compound':
        const n = parseFloat(inputs.frequency || '1');
        const amount = p * Math.pow((1 + r / n), n * t);
        res = { 'Total Amount': amount.toFixed(2), 'Compound Interest': (amount - p).toFixed(2) };
        break;
      case 'sip':
        const monthlyRate = r / 12;
        const months = t * 12;
        const sipAmount = parseFloat(inputs.monthly);
        const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        res = { 'Invested Amount': (sipAmount * months).toFixed(2), 'Estimated Returns': (futureValue - (sipAmount * months)).toFixed(2), 'Total Value': futureValue.toFixed(2) };
        break;
      case 'tip':
        const bill = parseFloat(inputs.bill);
        const tipPercent = parseFloat(inputs.tipPercent);
        const tipAmount = bill * (tipPercent / 100);
        res = { 'Tip Amount': tipAmount.toFixed(2), 'Total Bill': (bill + tipAmount).toFixed(2) };
        break;
      case 'fuel':
        const dist = parseFloat(inputs.distance);
        const eff = parseFloat(inputs.efficiency);
        const price = parseFloat(inputs.price);
        const fuelNeeded = dist / eff;
        res = { 'Fuel Needed': fuelNeeded.toFixed(2) + ' L', 'Total Cost': (fuelNeeded * price).toFixed(2) };
        break;
      case 'electricity':
        const watts = parseFloat(inputs.watts);
        const hours = parseFloat(inputs.hours);
        const unitPrice = parseFloat(inputs.unitPrice);
        const kwh = (watts * hours * 30) / 1000;
        res = { 'Monthly Consumption': kwh.toFixed(2) + ' kWh', 'Estimated Bill': (kwh * unitPrice).toFixed(2) };
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
        <p className="text-zinc-500 text-lg">Plan your finances with precision and clarity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-10 shadow-sm space-y-8">
          <div className="space-y-6">
            {(mode === 'simple-interest' || mode === 'compound' || mode === 'loan' || mode === 'interest' || mode === 'investment') && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{mode === 'investment' ? 'Investment Amount' : 'Principal Amount'}</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.principal || ''} onChange={e => setInputs({...inputs, principal: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Interest Rate (%)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.rate || ''} onChange={e => setInputs({...inputs, rate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Time Period (Years)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.time || ''} onChange={e => setInputs({...inputs, time: e.target.value})} />
                </div>
                {mode === 'compound' && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Compounding Frequency (per year)</Label>
                    <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.frequency || '1'} onChange={e => setInputs({...inputs, frequency: e.target.value})} />
                  </div>
                )}
              </>
            )}

            {mode === 'tax' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Annual Income</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.income || ''} onChange={e => setInputs({...inputs, income: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Tax Rate (%)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.taxRate || ''} onChange={e => setInputs({...inputs, taxRate: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'salary' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Gross Monthly Salary</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.gross || ''} onChange={e => setInputs({...inputs, gross: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Total Deductions</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.deductions || ''} onChange={e => setInputs({...inputs, deductions: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'currency' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Amount</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.amount || ''} onChange={e => setInputs({...inputs, amount: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Exchange Rate</Label>
                  <Input type="number" placeholder="1.1" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.rate || ''} onChange={e => setInputs({...inputs, rate: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'sip' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Monthly Investment</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.monthly || ''} onChange={e => setInputs({...inputs, monthly: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Expected Return Rate (%)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.rate || ''} onChange={e => setInputs({...inputs, rate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Time Period (Years)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.time || ''} onChange={e => setInputs({...inputs, time: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'tip' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Bill Amount</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.bill || ''} onChange={e => setInputs({...inputs, bill: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Tip Percentage (%)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.tipPercent || '15'} onChange={e => setInputs({...inputs, tipPercent: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'fuel' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Distance (km)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.distance || ''} onChange={e => setInputs({...inputs, distance: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Fuel Efficiency (km/L)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.efficiency || ''} onChange={e => setInputs({...inputs, efficiency: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Fuel Price (per L)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.price || ''} onChange={e => setInputs({...inputs, price: e.target.value})} />
                </div>
              </>
            )}

            {mode === 'electricity' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Device Wattage (Watts)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.watts || ''} onChange={e => setInputs({...inputs, watts: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Usage Hours (per day)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.hours || ''} onChange={e => setInputs({...inputs, hours: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Unit Price (per kWh)</Label>
                  <Input type="number" className="h-12 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base" value={inputs.unitPrice || ''} onChange={e => setInputs({...inputs, unitPrice: e.target.value})} />
                </div>
              </>
            )}
          </div>

          <Button className="w-full h-14 rounded-xl font-bold text-lg" onClick={calculate}>
            Calculate Breakdown
          </Button>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-10 border border-zinc-200 dark:border-zinc-800 min-h-[400px] flex flex-col justify-center shadow-sm">
            {result ? (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Financial Analysis</div>
                  <h3 className="text-2xl font-bold tracking-tight">Calculation Results</h3>
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
                  <RefreshCw className="w-4 h-4 mr-2" /> Reset Calculator
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Banknote className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-bold tracking-tight">Ready to Calculate</p>
                  <p className="text-zinc-500 text-sm max-w-[200px] mx-auto">Enter your financial details to see a complete breakdown.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
