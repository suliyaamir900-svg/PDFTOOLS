import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Square, Settings2 } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = React.useState('');
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [rate, setRate] = React.useState(1);
  const [pitch, setPitch] = React.useState(1);

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <textarea
        className="w-full h-64 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none transition-all resize-none text-lg leading-relaxed"
        placeholder="Type something to hear it..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800">
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
            <span>Speed</span>
            <span>{rate}x</span>
          </div>
          <input 
            type="range" min="0.5" max="2" step="0.1" 
            value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
            <span>Pitch</span>
            <span>{pitch}</span>
          </div>
          <input 
            type="range" min="0" max="2" step="0.1" 
            value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button size="lg" className="flex-grow h-14 rounded-2xl text-lg font-bold" onClick={speak} disabled={isSpeaking}>
          <Play className="mr-2 w-5 h-5" /> Listen Now
        </Button>
        <Button size="lg" variant="destructive" className="h-14 w-14 rounded-2xl p-0" onClick={stop} disabled={!isSpeaking}>
          <Square className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
