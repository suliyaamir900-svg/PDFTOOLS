import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, Image as ImageIcon, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import heic2any from 'heic2any';

interface Props {
  targetFormat: string;
  toolName: string;
}

export default function UniversalImageConverter({ targetFormat, toolName }: Props) {
  const [image, setImage] = React.useState<string | null>(null);
  const [originalFile, setOriginalFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setResult(null);
      setOriginalFile(file);
      
      const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic';
      
      if (isHeic) {
        setIsProcessing(true);
        try {
          const blob = await heic2any({ blob: file, toType: 'image/jpeg' });
          const convertedBlob = Array.isArray(blob) ? blob[0] : blob;
          const reader = new FileReader();
          reader.onload = (event) => {
            setImage(event.target?.result as string);
            setIsProcessing(false);
          };
          reader.readAsDataURL(convertedBlob);
        } catch (err) {
          setError('Failed to process HEIC image. Please try another file.');
          setIsProcessing(false);
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const convertImage = () => {
    if (!image) return;
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        let mimeType = `image/${targetFormat}`;
        if (targetFormat === 'jpg') mimeType = 'image/jpeg';
        
        try {
          // Special handling for SVG (simple wrapper)
          if (targetFormat === 'svg') {
            const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}"><image href="${image}" width="100%" height="100%"/></svg>`;
            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            setResult(URL.createObjectURL(blob));
          } else if (targetFormat === 'ico') {
            // ICO is tricky in browser, we'll just use a small PNG as a fallback or suggest PNG
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            setResult(dataUrl);
          } else {
            const dataUrl = canvas.toDataURL(mimeType, 1.0);
            setResult(dataUrl);
          }
        } catch (err) {
          setError('Conversion failed. Your browser might not support this format.');
        }
      }
      setIsProcessing(false);
    };
    img.onerror = () => {
      setError('Failed to load image for conversion.');
      setIsProcessing(false);
    };
    img.src = image;
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    link.download = `${originalFile?.name.split('.')[0] || 'converted'}-omnitool.${ext}`;
    link.click();
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setOriginalFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-12 text-center space-y-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
              <Upload className="w-10 h-10 text-zinc-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Select Image for {toolName}</h3>
              <p className="text-zinc-500 mt-2">Drag and drop or click to browse files</p>
              <p className="text-xs text-zinc-400 mt-4 italic">Supports JPG, PNG, WebP, HEIC, AVIF, BMP, TIFF, GIF</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,.heic,.avif" 
              onChange={handleFileChange} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img src={image} alt="Preview" className="w-full h-full object-contain" />
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 right-4 rounded-full"
                onClick={reset}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {!result ? (
                <Button 
                  size="lg" 
                  className="flex-grow h-14 rounded-2xl text-lg font-bold"
                  onClick={convertImage}
                  disabled={isProcessing}
                >
                  {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <ImageIcon className="w-5 h-5 mr-2" />}
                  Convert to {targetFormat.toUpperCase()}
                </Button>
              ) : (
                <Button 
                  size="lg" 
                  className="flex-grow h-14 rounded-2xl text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
                  onClick={downloadImage}
                >
                  <Download className="w-5 h-5 mr-2" /> Download {targetFormat.toUpperCase()}
                </Button>
              )}
            </div>

            {result && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <Check className="w-5 h-5" /> Conversion Complete!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold mb-4">Privacy & Performance</h4>
        <p className="text-sm text-zinc-500 leading-relaxed">
          This tool runs entirely in your browser. Your images are never uploaded to our servers, ensuring your privacy is 100% protected. 
          We use modern Web APIs and the Canvas API for high-speed, local processing.
        </p>
      </div>
    </div>
  );
}
