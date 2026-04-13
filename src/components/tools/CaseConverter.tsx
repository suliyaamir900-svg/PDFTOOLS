import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Type, ArrowDown, ArrowUp, CaseSensitive } from 'lucide-react';

interface CaseConverterProps {
  initialMode?: 'upper' | 'lower' | 'sentence' | 'title' | 'capitalized';
}

export default function CaseConverter({ initialMode }: CaseConverterProps) {
  const [text, setText] = React.useState('');

  const convert = (type: 'upper' | 'lower' | 'sentence' | 'title' | 'capitalized') => {
    if (!text) return;
    let result = '';
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'title':
        result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'capitalized':
        result = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        break;
    }
    setText(result);
  };

  React.useEffect(() => {
    if (initialMode && text) {
      convert(initialMode);
    }
  }, [initialMode]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => convert('upper')} className="rounded-xl">UPPERCASE</Button>
        <Button variant="outline" size="sm" onClick={() => convert('lower')} className="rounded-xl">lowercase</Button>
        <Button variant="outline" size="sm" onClick={() => convert('sentence')} className="rounded-xl">Sentence case</Button>
        <Button variant="outline" size="sm" onClick={() => convert('title')} className="rounded-xl">Title Case</Button>
        <Button variant="outline" size="sm" onClick={() => convert('capitalized')} className="rounded-xl">Capitalized Case</Button>
      </div>

      <div className="relative">
        <textarea
          className="w-full h-80 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all resize-none text-lg leading-relaxed shadow-sm"
          placeholder="Type or paste text to convert case..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(text)} className="rounded-xl">
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setText('')} className="rounded-xl">
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
