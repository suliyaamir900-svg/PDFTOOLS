import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Layers, ImageIcon, Download, Plus, Trash2, RefreshCw, LayoutGrid, Scissors, Activity, ArrowLeftRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdvancedImageToolsProps {
  mode: 'collage' | 'gif-maker' | 'gif-to-img' | 'sprite' | 'compare' | 'histogram';
}

export default function AdvancedImageTools({ mode }: AdvancedImageToolsProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      const newPreviews = selectedFiles.map(f => URL.createObjectURL(f));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const processTools = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    
    try {
      if (mode === 'collage') {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Simple 2x2 or 1xN collage logic
        const count = files.length;
        const cols = Math.ceil(Math.sqrt(count));
        const rows = Math.ceil(count / cols);
        const size = 800;
        canvas.width = size * cols;
        canvas.height = size * rows;

        for (let i = 0; i < count; i++) {
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = resolve;
            img.src = previews[i];
          });
          const x = (i % cols) * size;
          const y = Math.floor(i / cols) * size;
          ctx.drawImage(img, x, y, size, size);
        }
        setResult(canvas.toDataURL());
      } else {
        // Simulate other tools for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResult(previews[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'collage': return 'Image Collage Maker';
      case 'gif-maker': return 'GIF Maker';
      case 'gif-to-img': return 'GIF to Images';
      case 'sprite': return 'Sprite Sheet Generator';
      case 'compare': return 'Image Comparison Tool';
      case 'histogram': return 'Histogram Viewer';
      default: return 'Advanced Image Tool';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Professional tools for complex image processing and analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
            <div className="space-y-4">
              <Label>Upload Images</Label>
              <div 
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center cursor-pointer hover:border-zinc-400 transition-colors"
                onClick={() => document.getElementById('files-upload')?.click()}
              >
                <input 
                  type="file" 
                  id="files-upload" 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFilesChange} 
                />
                <Plus className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 font-medium">Add images to process</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Selected Files ({files.length})</Label>
              <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {previews.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              className="w-full h-12 rounded-xl font-bold" 
              disabled={files.length === 0 || isProcessing}
              onClick={processTools}
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Layers className="w-4 h-4 mr-2" />}
              Process Images
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            <canvas ref={canvasRef} className="hidden" />
            {result ? (
              <div className="space-y-6 w-full text-center">
                <img src={result} alt="Result" className="max-w-full max-h-[600px] rounded-xl shadow-2xl mx-auto" />
                <Button className="rounded-xl" onClick={() => {
                  const link = document.createElement('a');
                  link.href = result;
                  link.download = `${mode}-result.png`;
                  link.click();
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-300">
                  <LayoutGrid className="w-8 h-8" />
                </div>
                <p className="text-zinc-400 font-medium">Upload images to generate {mode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
