import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Copy, 
  Trash2, 
  RefreshCw, 
  Code, 
  FileCode, 
  FileJson, 
  FileText,
  Binary,
  Hash,
  Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TextConverterProps {
  mode: 'html-to-text' | 'text-to-html' | 'markdown-to-html' | 'html-to-markdown' | 'binary-to-text' | 'text-to-binary' | 'morse-code' | 'url-encode' | 'url-decode' | 'unicode-encode' | 'unicode-decode' | 'ascii-encode' | 'ascii-decode' | 'rot13' | 'base64-encode' | 'base64-decode';
}

export default function TextConverter({ mode }: TextConverterProps) {
  const [input, setInput] = React.useState('');
  const [output, setOutput] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  const getTitle = () => {
    switch (mode) {
      case 'html-to-text': return 'HTML to Text';
      case 'text-to-html': return 'Text to HTML';
      case 'markdown-to-html': return 'Markdown to HTML';
      case 'html-to-markdown': return 'HTML to Markdown';
      case 'binary-to-text': return 'Binary to Text';
      case 'text-to-binary': return 'Text to Binary';
      case 'morse-code': return 'Morse Code Converter';
      case 'url-encode': return 'URL Encoder';
      case 'url-decode': return 'URL Decoder';
      case 'unicode-encode': return 'Unicode Encoder';
      case 'unicode-decode': return 'Unicode Decoder';
      case 'ascii-encode': return 'ASCII Encoder';
      case 'ascii-decode': return 'ASCII Decoder';
      case 'rot13': return 'ROT13 Encoder';
      case 'base64-encode': return 'Base64 Encoder';
      case 'base64-decode': return 'Base64 Decoder';
      default: return 'Text Converter';
    }
  };

  const convert = () => {
    if (!input) {
      setOutput('');
      return;
    }

    let result = '';
    try {
      switch (mode) {
        case 'html-to-text':
          const temp = document.createElement('div');
          temp.innerHTML = input;
          result = temp.textContent || temp.innerText || '';
          break;
        case 'text-to-html':
          result = input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br/>');
          break;
        case 'markdown-to-html':
          result = input
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
            .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
            .replace(/^\* (.*?)$/gm, '<li>$1</li>')
            .replace(/\n/g, '<br/>');
          break;
        case 'html-to-markdown':
          result = input
            .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<b>(.*?)<\/b>/gi, '**$1**')
            .replace(/<em>(.*?)<\/em>/gi, '*$1*')
            .replace(/<i>(.*?)<\/i>/gi, '*$1*')
            .replace(/<h1>(.*?)<\/h1>/gi, '# $1')
            .replace(/<h2>(.*?)<\/h2>/gi, '## $1')
            .replace(/<li>(.*?)<\/li>/gi, '* $1')
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<[^>]+>/g, '');
          break;
        case 'text-to-binary':
          result = input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          break;
        case 'binary-to-text':
          result = input.split(/\s+/).map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
          break;
        case 'url-encode':
          result = encodeURIComponent(input);
          break;
        case 'url-decode':
          result = decodeURIComponent(input);
          break;
        case 'base64-encode':
          result = btoa(input);
          break;
        case 'base64-decode':
          result = atob(input);
          break;
        case 'rot13':
          result = input.replace(/[a-zA-Z]/g, (c) => {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
          });
          break;
        case 'unicode-encode':
          result = input.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
          break;
        case 'unicode-decode':
          result = JSON.parse('"' + input.replace(/"/g, '\\"') + '"');
          break;
        case 'ascii-encode':
          result = input.split('').map(c => c.charCodeAt(0)).join(' ');
          break;
        case 'ascii-decode':
          result = input.split(/\s+/).map(c => String.fromCharCode(parseInt(c))).join('');
          break;
        case 'morse-code':
          const morseMap: Record<string, string> = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
            '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
          };
          result = input.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
          break;
      }
      setOutput(result);
    } catch (err) {
      setOutput('Error during conversion. Please check your input.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Fast and reliable text conversion tool.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input</Label>
          <div className="relative">
            <Textarea
              className="h-[400px] p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all resize-none font-mono text-sm shadow-sm"
              placeholder="Paste your input here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => setInput('')} className="rounded-xl">
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
              <Button size="sm" onClick={convert} className="rounded-xl">
                <RefreshCw className="w-4 h-4 mr-2" /> Convert
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Output</Label>
          <div className="relative">
            <div className="h-[400px] p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 overflow-auto font-mono text-sm whitespace-pre-wrap">
              {output || <span className="text-zinc-400 italic">Output will appear here...</span>}
            </div>
            {output && (
              <div className="absolute bottom-4 right-4">
                <Button variant="secondary" size="sm" onClick={copyToClipboard} className="rounded-xl">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
