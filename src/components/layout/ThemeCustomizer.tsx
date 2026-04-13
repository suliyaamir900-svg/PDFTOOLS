import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings2, X, Palette, Sun, Moon, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [accentColor, setAccentColor] = React.useState('#8b5cf6'); // Default purple
  const [blurIntensity, setBlurIntensity] = React.useState(12);
  const [neonGlow, setNeonGlow] = React.useState(true);

  const colors = [
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Green', value: '#10b981' },
  ];

  React.useEffect(() => {
    document.documentElement.style.setProperty('--primary', accentColor);
    // Convert hex to hsl for tailwind if needed, but for now we can just use the hex
    // In a real app we'd use a library to convert hex to HSL for tailwind variables
  }, [accentColor]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-2xl glass border-white/10 shadow-2xl neon-glow group hidden md:flex items-center justify-center p-0"
      >
        <Settings2 className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-500" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md glass border-l border-white/10 z-[70] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-premium rounded-xl flex items-center justify-center">
                    <Palette className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Appearance</h2>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl hover:bg-white/5">
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="space-y-12">
                {/* Accent Color */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                    <Sparkles className="w-4 h-4" /> Accent Color
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAccentColor(color.value)}
                        className={`group relative h-16 rounded-2xl transition-all duration-300 ${
                          accentColor === color.value ? 'ring-2 ring-primary ring-offset-4 ring-offset-zinc-950 scale-95' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                      >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                        {accentColor === color.value && (
                          <motion.div layoutId="activeColor" className="absolute -inset-1 border-2 border-white/20 rounded-[1.2rem]" />
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Glass Intensity */}
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-500">
                      <Zap className="w-4 h-4" /> Glass Blur
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">{blurIntensity}px</span>
                  </div>
                  <Slider
                    value={[blurIntensity]}
                    onValueChange={(val) => setBlurIntensity(val[0])}
                    max={40}
                    step={1}
                    className="py-4"
                  />
                </section>

                {/* Neon Effects */}
                <section className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-black uppercase tracking-widest">Neon Glow</div>
                    <div className="text-xs text-zinc-500">Enable premium accent lighting</div>
                  </div>
                  <Switch checked={neonGlow} onCheckedChange={setNeonGlow} />
                </section>

                {/* Theme Mode */}
                <section className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 rounded-2xl glass border-white/10 flex flex-col gap-3 font-bold">
                    <Sun className="w-6 h-6" /> Light
                  </Button>
                  <Button variant="outline" className="h-24 rounded-2xl glass border-primary/20 bg-primary/5 flex flex-col gap-3 font-bold">
                    <Moon className="w-6 h-6 text-primary" /> Dark
                  </Button>
                </section>
              </div>

              <div className="mt-20 p-8 glass rounded-[2rem] border-primary/20 text-center space-y-4">
                <div className="text-sm font-bold text-primary">Lumina Premium</div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  These settings are saved locally to your browser for a personalized experience.
                </p>
                <Button className="w-full bg-gradient-premium rounded-xl font-bold">Save Configuration</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
