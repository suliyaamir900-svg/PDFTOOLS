import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Upload, File, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FileFormatDetector() {
  const [file, setFile] = React.useState<File | null>(null);
  const [info, setInfo] = React.useState<{
    mime: string;
    extension: string;
    description: string;
    magicNumbers: string;
  } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const detectFormat = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const uint = new Uint8Array(buffer);
    let bytes: string[] = [];
    uint.slice(0, 4).forEach((byte) => {
      bytes.push(byte.toString(16).padStart(2, '0').toUpperCase());
    });
    const hex = bytes.join(' ');

    let detected = {
      mime: file.type || 'unknown',
      extension: file.name.split('.').pop() || 'unknown',
      description: 'Generic File',
      magicNumbers: hex
    };

    // Basic Magic Number Detection
    if (hex.startsWith('89 50 4E 47')) {
      detected.mime = 'image/png';
      detected.description = 'Portable Network Graphics (PNG)';
    } else if (hex.startsWith('FF D8 FF')) {
      detected.mime = 'image/jpeg';
      detected.description = 'JPEG Image';
    } else if (hex.startsWith('47 49 46 38')) {
      detected.mime = 'image/gif';
      detected.description = 'Graphics Interchange Format (GIF)';
    } else if (hex.startsWith('25 50 44 46')) {
      detected.mime = 'application/pdf';
      detected.description = 'Portable Document Format (PDF)';
    } else if (hex.startsWith('50 4B 03 04')) {
      detected.mime = 'application/zip';
      detected.description = 'ZIP Archive / Office Open XML (DOCX, XLSX, PPTX)';
    } else if (hex.startsWith('7B')) {
      detected.mime = 'application/json';
      detected.description = 'JSON Data';
    }

    setInfo(detected);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      detectFormat(selectedFile);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div 
        className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-12 text-center space-y-6 cursor-pointer hover:border-zinc-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
          <Search className="w-10 h-10 text-zinc-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Identify Any File</h3>
          <p className="text-zinc-500 mt-2">Upload a file to detect its true format and MIME type</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      <AnimatePresence>
        {file && info && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl flex items-center justify-center">
                  <File className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold truncate max-w-[300px]">{file.name}</h4>
                  <p className="text-zinc-500">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">MIME Type</p>
                  <p className="font-mono text-sm">{info.mime}</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Extension</p>
                  <p className="font-mono text-sm">.{info.extension}</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 sm:col-span-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Description</p>
                  <p className="font-medium">{info.description}</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 sm:col-span-2">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Magic Numbers (Hex)</p>
                  <p className="font-mono text-sm">{info.magicNumbers}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-sm text-zinc-500">
              <Info className="w-5 h-5" />
              <p>Magic numbers are the first few bytes of a file used to identify its format regardless of the extension.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
