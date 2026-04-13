import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Share2, QrCode } from 'lucide-react';

export default function QrGenerator() {
  const [value, setValue] = React.useState('https://lumina.tools');
  const [size, setSize] = React.useState(256);
  const qrRef = React.useRef<HTMLDivElement>(null);

  const downloadQr = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode-lumina.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">URL or Text</label>
          <Input 
            placeholder="Enter text or URL..." 
            className="h-14 rounded-xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-base"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Size: {size}px</label>
          <input 
            type="range" 
            min="128" 
            max="512" 
            step="64"
            value={size} 
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div ref={qrRef} className="p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
          <QRCodeSVG value={value} size={size} level="H" includeMargin />
        </div>
        <div className="flex gap-4 w-full">
          <Button className="flex-grow h-14 rounded-xl text-lg font-bold" onClick={downloadQr}>
            <Download className="w-5 h-5 mr-2" /> Download PNG
          </Button>
          <Button variant="outline" className="h-14 w-14 rounded-xl p-0">
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
