import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Copy, 
  Trash2, 
  RefreshCw, 
  User, 
  Lock, 
  Hash, 
  Dice5, 
  MapPin, 
  Quote,
  Check
} from 'lucide-react';

interface RandomGeneratorProps {
  mode: 'text' | 'name' | 'number' | 'password' | 'username' | 'address' | 'quote';
}

export default function RandomGenerator({ mode }: RandomGeneratorProps) {
  const [result, setResult] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    let output = '';
    switch (mode) {
      case 'name':
        const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        output = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        break;
      case 'number':
        output = Math.floor(Math.random() * 1000000).toString();
        break;
      case 'username':
        const prefixes = ['Cool', 'Super', 'Mega', 'Ultra', 'Hyper', 'Cyber', 'Neon', 'Shadow', 'Ghost', 'Swift'];
        const suffixes = ['Warrior', 'Ninja', 'Hacker', 'Coder', 'Gamer', 'Pilot', 'Rider', 'King', 'Queen', 'Star'];
        output = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}${Math.floor(Math.random() * 99)}`;
        break;
      case 'address':
        const streets = ['Main St', 'Oak Ave', 'Washington Blvd', 'Lakeview Dr', 'Parkway Dr', 'Broadway', 'Maple St'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];
        output = `${Math.floor(Math.random() * 9999)} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, USA`;
        break;
      case 'quote':
        const quotes = [
          "The only way to do great work is to love what you do. - Steve Jobs",
          "Innovation distinguishes between a leader and a follower. - Steve Jobs",
          "Stay hungry, stay foolish. - Steve Jobs",
          "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
          "Be the change that you wish to see in the world. - Mahatma Gandhi",
          "In the middle of difficulty lies opportunity. - Albert Einstein",
          "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
        ];
        output = quotes[Math.floor(Math.random() * quotes.length)];
        break;
      case 'text':
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt'];
        output = Array.from({ length: 20 }, () => words[Math.floor(Math.random() * words.length)]).join(' ') + '.';
        break;
    }
    setResult(output);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTitle = () => {
    switch (mode) {
      case 'name': return 'Random Name Generator';
      case 'number': return 'Random Number Generator';
      case 'username': return 'Random Username Generator';
      case 'address': return 'Fake Address Generator';
      case 'quote': return 'Random Quote Generator';
      case 'text': return 'Random Text Generator';
      default: return 'Random Generator';
    }
  };

  const getIcon = () => {
    switch (mode) {
      case 'name': return <User className="w-8 h-8" />;
      case 'number': return <Hash className="w-8 h-8" />;
      case 'username': return <Lock className="w-8 h-8" />;
      case 'address': return <MapPin className="w-8 h-8" />;
      case 'quote': return <Quote className="w-8 h-8" />;
      default: return <Dice5 className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Generate random data instantly for testing or fun.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-12 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center space-y-8 min-h-[400px] shadow-sm">
        <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-700 text-zinc-500">
          {getIcon()}
        </div>

        <div className="w-full max-w-2xl text-center">
          {result ? (
            <div className="p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative group">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{result}</p>
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0 rounded-lg">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 italic">Click generate to start...</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button size="lg" className="rounded-xl px-8 font-bold h-14" onClick={generate}>
            <RefreshCw className="w-5 h-5 mr-2" /> Generate
          </Button>
          {result && (
            <Button variant="outline" size="lg" className="rounded-xl px-8 font-bold h-14 border-zinc-200 dark:border-zinc-800" onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy Result'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
