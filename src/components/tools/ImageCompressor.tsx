import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Upload, Download, RefreshCw, Sliders, Check, Trash2, Plus, FileImage, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CompressedFile {
  id: string;
  file: File;
  preview: string;
  originalSize: number;
  compressedSize?: number;
  compressedUrl?: string;
  status: 'idle' | 'processing' | 'done' | 'error';
}

export default function ImageCompressor() {
  const [files, setFiles] = React.useState<CompressedFile[]>([]);
  const [quality, setQuality] = React.useState([80]);
  const [isProcessingAll, setIsProcessingAll] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const newFiles: CompressedFile[] = selectedFiles.map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
      status: 'idle'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const compressFile = async (cf: CompressedFile): Promise<CompressedFile> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', quality[0] / 100);
          const head = 'data:image/jpeg;base64,';
          const size = Math.round((dataUrl.length - head.length) * 3 / 4);
          resolve({ ...cf, compressedSize: size, compressedUrl: dataUrl, status: 'done' });
        } else {
          resolve({ ...cf, status: 'error' });
        }
      };
      img.onerror = () => resolve({ ...cf, status: 'error' });
      img.src = cf.preview;
    });
  };

  const compressAll = async () => {
    setIsProcessingAll(true);
    const updatedFiles = [...files];
    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status !== 'done') {
        updatedFiles[i].status = 'processing';
        setFiles([...updatedFiles]);
        updatedFiles[i] = await compressFile(updatedFiles[i]);
        setFiles([...updatedFiles]);
      }
    }
    setIsProcessingAll(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadAll = () => {
    files.forEach(f => {
      if (f.compressedUrl) {
        const link = document.createElement('a');
        link.href = f.compressedUrl;
        link.download = `compressed-${f.file.name.split('.')[0]}.jpg`;
        link.click();
      }
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Image Compressor</h2>
        <p className="text-zinc-500">Reduce image file size while maintaining quality. Supports bulk compression.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
            <div className="space-y-4">
              <Label>Upload Images</Label>
              <div 
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center cursor-pointer hover:border-zinc-400 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  multiple 
                  onChange={handleFileChange} 
                />
                <Plus className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 font-medium">Add images to compress</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Quality</Label>
                <span className="text-xs font-mono text-zinc-400">{quality[0]}%</span>
              </div>
              <Slider value={quality} onValueChange={setQuality} min={10} max={100} step={1} />
              <p className="text-[10px] text-zinc-400 italic">Lower quality results in smaller file size.</p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full h-12 rounded-xl font-bold" 
                disabled={files.length === 0 || isProcessingAll}
                onClick={compressAll}
              >
                {isProcessingAll ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Sliders className="w-4 h-4 mr-2" />}
                Compress All
              </Button>
              {files.some(f => f.status === 'done') && (
                <Button variant="outline" className="w-full h-12 rounded-xl font-bold" onClick={downloadAll}>
                  <Download className="w-4 h-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-6 border border-zinc-200 dark:border-zinc-800 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {files.length > 0 ? (
                <div className="space-y-3">
                  {files.map((f) => (
                    <motion.div 
                      key={f.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                        <img src={f.preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-bold truncate">{f.file.name}</p>
                        <p className="text-xs text-zinc-400">
                          {formatSize(f.originalSize)}
                          {f.compressedSize && (
                            <>
                              <span className="mx-2">→</span>
                              <span className="text-green-600 font-bold">{formatSize(f.compressedSize)}</span>
                              <span className="ml-2 text-[10px] bg-green-50 dark:bg-green-900/20 text-green-600 px-1.5 py-0.5 rounded">
                                -{Math.round((1 - f.compressedSize / f.originalSize) * 100)}%
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {f.status === 'processing' && <RefreshCw className="w-4 h-4 animate-spin text-zinc-400" />}
                        {f.status === 'done' && <Check className="w-5 h-5 text-green-600" />}
                        {f.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                        <button 
                          onClick={() => removeFile(f.id)}
                          className="p-2 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-16 h-16 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-300">
                    <FileImage className="w-8 h-8" />
                  </div>
                  <p className="text-zinc-400 font-medium">No images selected</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

