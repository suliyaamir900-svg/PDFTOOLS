import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Copy, 
  Trash2, 
  RefreshCw, 
  Search, 
  Replace, 
  AlignLeft,
  List,
  ListOrdered,
  Eraser,
  FileText
} from 'lucide-react';

interface TextEditorToolsProps {
  mode: 'find-replace' | 'cleaner' | 'list-gen' | 'formatter';
}

export default function TextEditorTools({ mode }: TextEditorToolsProps) {
  const [text, setText] = React.useState('');
  const [find, setFind] = React.useState('');
  const [replace, setReplace] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'find-replace': return 'Find and Replace';
      case 'cleaner': return 'Text Cleaner';
      case 'list-gen': return 'List Generator';
      case 'formatter': return 'Text Formatter';
      default: return 'Text Editor Tool';
    }
  };

  const handleAction = (action: string) => {
    let result = text;
    switch (action) {
      case 'replace':
        if (find) {
          result = text.split(find).join(replace);
        }
        break;
      case 'trim':
        result = text.split('\n').map(line => line.trim()).join('\n');
        break;
      case 'remove-extra-spaces':
        result = text.replace(/\s+/g, ' ');
        break;
      case 'remove-empty-lines':
        result = text.split('\n').filter(line => line.trim() !== '').join('\n');
        break;
      case 'remove-duplicates':
        result = Array.from(new Set(text.split('\n'))).join('\n');
        break;
      case 'bullet-list':
        result = text.split('\n').map(line => line.trim() ? `• ${line.trim()}` : '').join('\n');
        break;
      case 'numbered-list':
        let count = 1;
        result = text.split('\n').map(line => line.trim() ? `${count++}. ${line.trim()}` : '').join('\n');
        break;
      case 'reverse-lines':
        result = text.split('\n').reverse().join('\n');
        break;
      case 'sort-lines':
        result = text.split('\n').sort().join('\n');
        break;
    }
    setText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    if (!text) return;
    switch (mode) {
      case 'cleaner': handleAction('trim'); break;
      case 'formatter': handleAction('remove-extra-spaces'); break;
      case 'list-gen': handleAction('bullet-list'); break;
    }
  }, [mode]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Powerful text manipulation and formatting utilities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
            {mode === 'find-replace' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Find</Label>
                  <Input value={find} onChange={(e) => setFind(e.target.value)} placeholder="Text to find..." />
                </div>
                <div className="space-y-2">
                  <Label>Replace With</Label>
                  <Input value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text..." />
                </div>
                <Button className="w-full rounded-xl" onClick={() => handleAction('replace')}>
                  <Replace className="w-4 h-4 mr-2" /> Replace All
                </Button>
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Quick Actions</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('trim')}>
                  <Eraser className="w-4 h-4 mr-2" /> Trim Lines
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('remove-extra-spaces')}>
                  <AlignLeft className="w-4 h-4 mr-2" /> Remove Extra Spaces
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('remove-empty-lines')}>
                  <FileText className="w-4 h-4 mr-2" /> Remove Empty Lines
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('remove-duplicates')}>
                  <Copy className="w-4 h-4 mr-2" /> Remove Duplicate Lines
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('bullet-list')}>
                  <List className="w-4 h-4 mr-2" /> Bullet List
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('numbered-list')}>
                  <ListOrdered className="w-4 h-4 mr-2" /> Numbered List
                </Button>
                <Button variant="outline" size="sm" className="justify-start rounded-xl" onClick={() => handleAction('sort-lines')}>
                  <RefreshCw className="w-4 h-4 mr-2" /> Sort Lines
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="relative">
            <Textarea
              className="h-[500px] p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all resize-none text-lg leading-relaxed"
              placeholder="Paste or type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="absolute bottom-6 right-6 flex gap-2">
              <Button variant="secondary" size="sm" onClick={copyToClipboard} className="rounded-xl">
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setText('')} className="rounded-xl">
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
