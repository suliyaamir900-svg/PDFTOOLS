import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Download, RefreshCw, Maximize, RotateCw, Stamp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  initialMode: 'resize' | 'rotate' | 'watermark';
}

export default function ImageEditor({ initialMode }: Props) {
  const [image, setImage] = React.useState<string | null>(null);
  const [originalFile, setOriginalFile] = React.useState<File | null>(null);
  const [mode, setMode] = React.useState(initialMode);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Resize state
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = React.useState(true);
  const [aspectRatio, setAspectRatio] = React.useState(1);

  // Rotate state
  const [rotation, setRotation] = React.useState(0);

  // Watermark state
  const [watermarkText, setWatermarkText] = React.useState('OMNITOOL');
  const [watermarkOpacity, setWatermarkOpacity] = React.useState(0.5);
  const [watermarkSize, setWatermarkSize] = React.useState(40);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImage(dataUrl);
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
          setAspectRatio(img.width / img.height);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const applyChanges = () => {
    if (!image) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (mode === 'resize') {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
      } else if (mode === 'rotate') {
        if (rotation % 180 === 0) {
          canvas.width = img.width;
          canvas.height = img.height;
        } else {
          canvas.width = img.height;
          canvas.height = img.width;
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
      } else if (mode === 'watermark') {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        ctx.font = `bold ${watermarkSize}px Inter, sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${watermarkOpacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Draw watermark in a grid pattern
        const stepX = watermarkSize * 5;
        const stepY = watermarkSize * 3;
        for (let x = 0; x < canvas.width + stepX; x += stepX) {
          for (let y = 0; y < canvas.height + stepY; y += stepY) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(watermarkText, 0, 0);
            ctx.restore();
          }
        }
      }

      setResult(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };
    img.src = image;
  };

  const download = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `edited-${originalFile?.name || 'image.png'}`;
    link.click();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-20 text-center space-y-6 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
              <Upload className="w-10 h-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold">Upload Image to Edit</h3>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img src={result || image} alt="Preview" className="w-full h-full object-contain" />
              </div>
              <div className="flex justify-center gap-4">
                <Button variant={mode === 'resize' ? 'default' : 'outline'} onClick={() => setMode('resize')} className="rounded-xl">
                  <Maximize className="w-4 h-4 mr-2" /> Resize
                </Button>
                <Button variant={mode === 'rotate' ? 'default' : 'outline'} onClick={() => setMode('rotate')} className="rounded-xl">
                  <RotateCw className="w-4 h-4 mr-2" /> Rotate
                </Button>
                <Button variant={mode === 'watermark' ? 'default' : 'outline'} onClick={() => setMode('watermark')} className="rounded-xl">
                  <Stamp className="w-4 h-4 mr-2" /> Watermark
                </Button>
              </div>
            </div>

            <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 space-y-8">
              {mode === 'resize' && (
                <div className="space-y-6">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Resize Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Width (px)</label>
                      <Input 
                        type="number" 
                        value={width} 
                        onChange={e => {
                          const w = parseInt(e.target.value);
                          setWidth(w);
                          if (maintainAspectRatio) setHeight(Math.round(w / aspectRatio));
                        }} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Height (px)</label>
                      <Input 
                        type="number" 
                        value={height} 
                        onChange={e => {
                          const h = parseInt(e.target.value);
                          setHeight(h);
                          if (maintainAspectRatio) setWidth(Math.round(h * aspectRatio));
                        }} 
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={maintainAspectRatio} onChange={e => setMaintainAspectRatio(e.target.checked)} />
                    Maintain Aspect Ratio
                  </label>
                </div>
              )}

              {mode === 'rotate' && (
                <div className="space-y-6">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Rotation</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 90, 180, 270].map(deg => (
                      <Button 
                        key={deg} 
                        variant={rotation === deg ? 'default' : 'outline'} 
                        onClick={() => setRotation(deg)}
                        className="rounded-xl"
                      >
                        {deg}°
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {mode === 'watermark' && (
                <div className="space-y-6">
                  <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Watermark Text</h4>
                  <Input value={watermarkText} onChange={e => setWatermarkText(e.target.value)} placeholder="Enter text..." />
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Opacity</span>
                      <span>{Math.round(watermarkOpacity * 100)}%</span>
                    </div>
                    <input type="range" min="0.1" max="1" step="0.1" value={watermarkOpacity} onChange={e => setWatermarkOpacity(parseFloat(e.target.value))} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Size</span>
                      <span>{watermarkSize}px</span>
                    </div>
                    <input type="range" min="10" max="200" step="5" value={watermarkSize} onChange={e => setWatermarkSize(parseInt(e.target.value))} className="w-full" />
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-4">
                <Button className="w-full h-14 rounded-2xl font-bold" onClick={applyChanges} disabled={isProcessing}>
                  {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                  Apply Changes
                </Button>
                {result && (
                  <Button variant="secondary" className="w-full h-14 rounded-2xl font-bold" onClick={download}>
                    <Download className="w-4 h-4 mr-2" /> Download Image
                  </Button>
                )}
                <Button variant="ghost" className="w-full" onClick={() => { setImage(null); setResult(null); }}>
                  Start Over
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
