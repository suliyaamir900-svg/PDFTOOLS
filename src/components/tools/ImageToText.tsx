import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Copy, RefreshCw, Type, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createWorker } from 'tesseract.js';

export default function ImageToText() {
  const [image, setImage] = React.useState<string | null>(null);
  const [text, setText] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setText('');
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractText = async () => {
    if (!image) return;
    setIsProcessing(true);
    setProgress(0);
    
    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      const { data: { text } } = await worker.recognize(image);
      setText(text);
      await worker.terminate();
    } catch (err) {
      setError('Failed to extract text. Please try an image with clearer text.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setImage(null);
    setText('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
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
            <div>
              <h3 className="text-xl font-bold">Upload Image for OCR</h3>
              <p className="text-zinc-500 mt-2">Extract text from screenshots, documents, or photos</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <div className="relative aspect-square bg-zinc-100 dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <img src={image} alt="Source" className="w-full h-full object-contain" />
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="absolute top-4 right-4 rounded-full"
                  onClick={reset}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              {!text && (
                <Button 
                  size="lg" 
                  className="w-full h-14 rounded-2xl text-lg font-bold"
                  onClick={extractText}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing {progress}%
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Extract Text
                    </div>
                  )}
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="relative h-full min-h-[300px] bg-zinc-50 dark:bg-zinc-950 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-6">
                {isProcessing ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 text-zinc-400">
                    <div className="w-full max-w-[200px] h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-zinc-900 dark:bg-zinc-100"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm font-medium">Analyzing image content...</p>
                  </div>
                ) : text ? (
                  <>
                    <textarea
                      readOnly
                      className="w-full h-full bg-transparent border-none outline-none resize-none text-sm leading-relaxed font-mono"
                      value={text}
                    />
                    <Button 
                      size="sm" 
                      className="absolute bottom-4 right-4 rounded-xl"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copied' : 'Copy Text'}
                    </Button>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-2">
                    <Type className="w-8 h-8 opacity-20" />
                    <p className="text-sm">Extracted text will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}
    </div>
  );
}
