import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, FileText, Hash, AlignLeft, Type, Clock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function WordCounter() {
  const [text, setText] = React.useState('');
  
  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    lines: text.trim() ? text.split('\n').length : 0,
    readingTime: Math.ceil(text.trim().split(/\s+/).length / 200),
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Words', value: stats.words, icon: FileText, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
          { label: 'Characters', value: stats.chars, icon: Hash, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { label: 'No Spaces', value: stats.charsNoSpaces, icon: AlignLeft, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
          { label: 'Lines', value: stats.lines, icon: Type, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
          { label: 'Reading Time', value: `${stats.readingTime} min`, icon: Clock, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/30' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-80 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-base leading-relaxed placeholder:text-zinc-400 shadow-sm"
          placeholder="Paste or type your text here for instant analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleCopy} 
            className="rounded-lg font-semibold"
          >
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClear} 
            className="rounded-lg font-semibold"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Deep Text Analysis</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Sentences</div>
              <div className="text-sm text-zinc-400">Total number of sentences</div>
            </div>
            <span className="text-xl font-bold text-primary">{text.split(/[.!?]+/).filter(Boolean).length}</span>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <div className="space-y-1">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Paragraphs</div>
              <div className="text-sm text-zinc-400">Total number of paragraphs</div>
            </div>
            <span className="text-xl font-bold text-primary">{text.split(/\n\s*\n/).filter(Boolean).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
