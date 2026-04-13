import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Text as TextIcon, Image as ImageIcon, Download, Upload, Copy, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Base64ImageConverterProps {
  mode: 'img-to-base64' | 'base64-to-img';
}

export default function Base64ImageConverter({ mode }: Base64ImageConverterProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [base64, setBase64] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
        setBase64(result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleBase64Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setBase64(val);
    if (val.startsWith('data:image')) {
      setPreview(val);
    } else if (val.length > 100) {
      // Try to guess if it's a raw base64 string
      setPreview(`data:image/png;base64,${val}`);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    if (!preview) return;
    const link = document.createElement('a');
    link.href = preview;
    link.download = 'base64-image.png';
    link.click();
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          {mode === 'img-to-base64' ? 'Image to Base64' : 'Base64 to Image'}
        </h2>
        <p className="text-zinc-500">Convert images to Base64 strings or decode Base64 back to images.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
            {mode === 'img-to-base64' ? (
              <div className="space-y-4">
                <Label>Upload Image</Label>
                <div 
                  className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 text-center cursor-pointer hover:border-zinc-400 transition-colors"
                  onClick={() => document.getElementById('base64-upload')?.click()}
                >
                  <input type="file" id="base64-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                  <Upload className="w-10 h-10 text-zinc-300 mx-auto mb-4" />
                  <p className="text-sm text-zinc-500 font-medium">Click to upload image</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Label>Paste Base64 String</Label>
                <textarea 
                  className="w-full h-64 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-mono custom-scrollbar resize-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 outline-none"
                  placeholder="data:image/png;base64,..."
                  value={base64}
                  onChange={handleBase64Change}
                />
              </div>
            )}

            {base64 && (
              <div className="flex gap-3">
                {mode === 'img-to-base64' ? (
                  <Button className="flex-grow h-12 rounded-xl font-bold" onClick={copyToClipboard}>
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? 'Copied!' : 'Copy Base64'}
                  </Button>
                ) : (
                  <Button className="flex-grow h-12 rounded-xl font-bold" onClick={downloadImage} disabled={!preview}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Image
                  </Button>
                )}
                <Button variant="outline" className="h-12 w-12 rounded-xl p-0" onClick={() => { setBase64(''); setPreview(null); setFile(null); }}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 min-h-[400px] flex items-center justify-center relative overflow-hidden">
            {preview ? (
              <div className="space-y-4 w-full text-center">
                <img src={preview} alt="Preview" className="max-w-full max-h-[400px] rounded-xl shadow-2xl mx-auto" />
                <p className="text-xs text-zinc-400 font-mono truncate px-4">{base64.substring(0, 50)}...</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-300">
                  {mode === 'img-to-base64' ? <TextIcon className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                </div>
                <p className="text-zinc-400 font-medium">
                  {mode === 'img-to-base64' ? 'Upload image to see Base64' : 'Paste Base64 to see preview'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
