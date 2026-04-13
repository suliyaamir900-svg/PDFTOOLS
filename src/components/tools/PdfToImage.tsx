import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = React.useState<File | null>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError(null);
      setImages([]);
      setIsProcessing(true);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;
        const pageImages: string[] = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 }); // High quality
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // @ts-ignore
            await page.render({
              canvasContext: context,
              viewport: viewport
            }).promise;
            
            pageImages.push(canvas.toDataURL('image/jpeg', 1.0));
          }
        }
        
        setImages(pageImages);
      } catch (err) {
        setError('Failed to process PDF. Please make sure it is a valid PDF file.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const downloadAll = () => {
    images.forEach((img, i) => {
      const link = document.createElement('a');
      link.href = img;
      link.download = `${pdfFile?.name.split('.')[0] || 'pdf'}-page-${i + 1}.jpg`;
      link.click();
    });
  };

  const reset = () => {
    setPdfFile(null);
    setImages([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!pdfFile ? (
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
              <h3 className="text-xl font-bold">Select PDF to Convert</h3>
              <p className="text-zinc-500 mt-2">Each page will be converted to a high-quality JPG image</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="application/pdf" 
              onChange={handleFileChange} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                  <ImageIcon className="w-6 h-6 text-zinc-500" />
                </div>
                <div>
                  <h4 className="font-bold">{pdfFile.name}</h4>
                  <p className="text-sm text-zinc-500">{images.length} Pages Found</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={reset} className="rounded-xl">Reset</Button>
                {images.length > 0 && (
                  <Button onClick={downloadAll} className="rounded-xl">Download All</Button>
                )}
              </div>
            </div>

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <RefreshCw className="w-10 h-10 animate-spin text-zinc-400" />
                <p className="text-zinc-500 font-medium">Converting PDF pages to images...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <div key={i} className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <img src={img} alt={`Page ${i + 1}`} className="w-full aspect-[3/4] object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="rounded-xl"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = img;
                        link.download = `page-${i + 1}.jpg`;
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" /> Download Page {i + 1}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
