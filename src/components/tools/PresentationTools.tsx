import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Presentation, Download, Upload, FileImage, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PresentationToolsProps {
  mode: 'img-to-ppt' | 'pdf-to-ppt' | 'ppt-to-img' | 'ppt-compress' | 'ppt-to-pdf';
}

export default function PresentationTools({ mode }: PresentationToolsProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      setError(null);
    }
  };

  const process = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate presentation processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      setResult('mock-result-url');
    } catch (err) {
      setError('Processing failed. Please try again with a different file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'img-to-ppt': return 'Images to PPT';
      case 'pdf-to-ppt': return 'PDF to PPT';
      case 'ppt-to-img': return 'PPT to Images';
      case 'ppt-compress': return 'PPT Compressor';
      case 'ppt-to-pdf': return 'PPT to PDF';
      default: return 'Presentation Tool';
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Convert and optimize your presentations with ease.</p>
      </div>

      <div className="space-y-6">
        <div 
          className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-12 text-center space-y-6 cursor-pointer hover:border-zinc-400 transition-colors"
          onClick={() => document.getElementById('ppt-upload')?.click()}
        >
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
            <Presentation className="w-10 h-10 text-zinc-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Select Files</h3>
            <p className="text-zinc-500 mt-2">Upload files to start {mode.replace('-', ' ')}</p>
          </div>
          <input 
            type="file" 
            id="ppt-upload" 
            className="hidden" 
            multiple={mode === 'img-to-ppt'} 
            onChange={handleFileChange} 
          />
        </div>

        {files.length > 0 && (
          <div className="space-y-4">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Selected Files</Label>
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[400px]">{f.name}</span>
                    <span className="text-zinc-400">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            {!result ? (
              <Button 
                className="w-full h-14 rounded-2xl text-lg font-bold" 
                onClick={process}
                disabled={isProcessing}
              >
                {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Presentation className="w-5 h-5 mr-2" />}
                Start Processing
              </Button>
            ) : (
              <div className="space-y-4">
                <Button className="w-full h-14 rounded-2xl text-lg font-bold bg-green-600 hover:bg-green-700 text-white">
                  <Download className="w-5 h-5 mr-2" />
                  Download Result
                </Button>
                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => { setFiles([]); setResult(null); }}>
                  Process Another
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
        <h4 className="font-bold mb-4">How it works</h4>
        <ul className="space-y-3 text-sm text-zinc-500 list-disc pl-5">
          <li>Upload your images, PDFs, or PPT files.</li>
          <li>Our engine will process the conversion or compression locally or via secure cloud processing.</li>
          <li>Download your high-quality result instantly.</li>
          <li>All files are processed securely and deleted after conversion.</li>
        </ul>
      </div>
    </div>
  );
}
