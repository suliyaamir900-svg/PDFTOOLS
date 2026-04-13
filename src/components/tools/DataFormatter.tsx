import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Check, AlertCircle, Braces, FileJson, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface DataFormatterProps {
  mode: 'json' | 'xml' | 'csv';
}

export default function DataFormatter({ mode }: DataFormatterProps) {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const format = () => {
    try {
      if (!input.trim()) return;
      
      if (mode === 'json') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (mode === 'xml') {
        let formatted = '';
        let indent = '';
        const tab = '  ';
        input.split(/>\s*</).forEach(node => {
          if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
          formatted += indent + '<' + node + '>\r\n';
          if (node.match(/^<?\w[^>]*[^\/]$/) && !node.startsWith('?')) indent += tab;
        });
        setOutput(formatted.substring(1, formatted.length - 3));
      } else if (mode === 'csv') {
        const lines = input.split('\n').map(line => line.trim()).filter(line => line);
        setOutput(lines.join('\n'));
      }
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      if (!input.trim()) return;
      if (mode === 'json') {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed));
      } else {
        setOutput(input.replace(/\s+/g, ' '));
      }
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <FileJson className="w-4 h-4 text-primary" /> Input {mode.toUpperCase()}
            </h3>
            <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950 font-semibold">
              <Trash2 className="w-3.5 h-3.5 mr-2" /> Clear
            </Button>
          </div>
          <div className="relative">
            <textarea
              className="w-full h-[400px] p-4 font-mono text-sm rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-zinc-400 shadow-sm"
              placeholder={`Paste your raw ${mode.toUpperCase()} here...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              <Braces className="w-4 h-4 text-primary" /> Formatted Output
            </h3>
            {output && (
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 rounded-lg text-primary hover:bg-primary/10 font-semibold">
                <Copy className="w-3.5 h-3.5 mr-2" /> Copy
              </Button>
            )}
          </div>
          <div className="relative w-full h-[400px] rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4 text-red-500"
                >
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">Invalid {mode.toUpperCase()}</div>
                    <div className="text-sm mt-1 font-mono">{error}</div>
                  </div>
                </motion.div>
              ) : output ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full"
                >
                  <pre className="p-4 font-mono text-sm h-full overflow-auto whitespace-pre-wrap">
                    {output}
                  </pre>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 flex flex-col items-center justify-center h-full text-center space-y-3 text-zinc-400"
                >
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium">
                    Formatted {mode.toUpperCase()} will appear here...
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-3"
      >
        <Button 
          size="lg" 
          className="h-12 px-8 rounded-xl text-base font-bold flex-grow sm:flex-grow-0" 
          onClick={format}
        >
          <Sparkles className="w-5 h-5 mr-2" /> Prettify {mode.toUpperCase()}
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="h-12 px-8 rounded-xl text-base font-bold flex-grow sm:flex-grow-0" 
          onClick={minify}
        >
          Minify {mode.toUpperCase()}
        </Button>
      </motion.div>
    </div>
  );
}
