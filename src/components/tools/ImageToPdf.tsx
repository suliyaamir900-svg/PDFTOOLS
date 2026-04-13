import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, FileText, RefreshCw, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';

export default function ImageToPdf() {
  const [images, setImages] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file as Blob);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    
    const pdf = new jsPDF();
    
    for (let i = 0; i < images.length; i++) {
      const imgData = images[i];
      const img = new Image();
      
      await new Promise((resolve) => {
        img.onload = () => {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          
          const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;
          const x = (pageWidth - width) / 2;
          const y = (pageHeight - height) / 2;
          
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', x, y, width, height);
          resolve(null);
        };
        img.src = imgData;
      });
    }
    
    pdf.save('omnitool-images.pdf');
    setIsProcessing(false);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Images to PDF</h3>
        <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="rounded-xl">
          <Plus className="w-4 h-4 mr-2" /> Add Images
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange} 
        />
      </div>

      {images.length === 0 ? (
        <div 
          className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-20 text-center space-y-6 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
            <Upload className="w-10 h-10 text-zinc-400" />
          </div>
          <p className="text-zinc-500">Upload one or more images to combine into a PDF</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <AnimatePresence>
            {images.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group"
              >
                <img src={img} alt={`Page ${i + 1}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-md font-bold">
                  PAGE {i + 1}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length > 0 && (
        <Button 
          size="lg" 
          className="w-full h-16 rounded-2xl text-xl font-bold shadow-xl"
          onClick={generatePdf}
          disabled={isProcessing}
        >
          {isProcessing ? <RefreshCw className="w-6 h-6 animate-spin mr-3" /> : <FileText className="w-6 h-6 mr-3" />}
          Generate PDF ({images.length} Pages)
        </Button>
      )}
    </div>
  );
}
