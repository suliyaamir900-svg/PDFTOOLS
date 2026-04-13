import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, RefreshCw, Archive, File, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';

export default function ZipTools() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const createZip = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      const zip = new JSZip();
      files.forEach(file => {
        zip.file(file.name, file);
      });
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'omnitool-archive.zip';
      link.click();
    } catch (err) {
      console.error(err);
      alert('Failed to create zip archive.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div 
        className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-12 text-center space-y-6 cursor-pointer hover:border-zinc-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
          <Archive className="w-10 h-10 text-zinc-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Add Files to Zip</h3>
          <p className="text-zinc-500 mt-2">Select files to compress into a single archive</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          onChange={handleFileChange} 
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold">Files ({files.length})</h4>
              <Button variant="ghost" size="sm" onClick={() => setFiles([])}>Clear All</Button>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto pr-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 group">
                  <div className="flex items-center gap-3">
                    <File className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm truncate max-w-[200px]">{f.name}</span>
                  </div>
                  <button onClick={() => removeFile(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full h-14 rounded-2xl text-lg font-bold"
            onClick={createZip}
            disabled={isProcessing}
          >
            {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : <Archive className="w-5 h-5 mr-2" />}
            Create Zip Archive
          </Button>
        </div>
      )}
    </div>
  );
}
