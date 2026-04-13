import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { History, Stamp, Type, Smile, Download, Upload, Image as ImageIcon, Trash2, Plus, Move } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUtilityToolsProps {
  mode: 'metadata' | 'watermark' | 'add-text' | 'meme' | 'adjust';
}

export default function ImageUtilityTools({ mode }: ImageUtilityToolsProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [text, setText] = React.useState('');
  const [topText, setTopText] = React.useState('');
  const [bottomText, setBottomText] = React.useState('');
  const [fontSize, setFontSize] = React.useState([40]);
  const [opacity, setOpacity] = React.useState([50]);
  const [brightness, setBrightness] = React.useState([100]);
  const [contrast, setContrast] = React.useState([100]);
  const [saturation, setSaturation] = React.useState([100]);
  const [blur, setBlur] = React.useState([0]);
  const [grayscale, setGrayscale] = React.useState([0]);
  const [metadata, setMetadata] = React.useState<Record<string, any> | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      if (mode === 'metadata') {
        // Mock metadata extraction
        setMetadata({
          'Filename': selectedFile.name,
          'Size': `${(selectedFile.size / 1024).toFixed(2)} KB`,
          'Type': selectedFile.type,
          'Last Modified': new Date(selectedFile.lastModified).toLocaleString(),
          'Dimensions': '1920 x 1080 (Simulated)',
          'Camera': 'iPhone 13 Pro (Simulated)',
          'ISO': '100',
          'Aperture': 'f/1.8',
          'Exposure': '1/120s'
        });
      }
    }
  };

  const drawCanvas = React.useCallback(() => {
    if (!canvasRef.current || !preview) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply filters
      ctx.filter = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%) blur(${blur[0]}px) grayscale(${grayscale[0]}%)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = 'none'; // Reset for text

      if (mode === 'watermark' || mode === 'add-text') {
        ctx.font = `${(fontSize[0] / 100) * img.width}px Inter, sans-serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity[0] / 100})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text || 'WATERMARK', canvas.width / 2, canvas.height / 2);
      } else if (mode === 'meme') {
        const size = (fontSize[0] / 100) * img.width;
        ctx.font = `bold ${size}px Impact, sans-serif`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = size / 10;
        ctx.textAlign = 'center';

        // Top Text
        ctx.textBaseline = 'top';
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);

        // Bottom Text
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }
    };
    img.src = preview;
  }, [preview, mode, text, topText, bottomText, fontSize, opacity, brightness, contrast, saturation, blur, grayscale]);

  React.useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.href = canvasRef.current.toDataURL('image/png');
    link.download = `${mode}-${Date.now()}.png`;
    link.click();
  };

  const getTitle = () => {
    switch (mode) {
      case 'metadata': return 'Metadata Viewer';
      case 'watermark': return 'Watermark Tool';
      case 'add-text': return 'Add Text to Image';
      case 'meme': return 'Meme Generator';
      case 'adjust': return 'Image Adjuster';
      default: return 'Image Utility';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">{getTitle()}</h2>
        <p className="text-zinc-500">Professional tools for image management and creative editing.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-6 shadow-sm">
            <div className="space-y-4">
              <Label>Upload Image</Label>
              <div 
                className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center cursor-pointer hover:border-zinc-400 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                <Upload className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                <p className="text-xs text-zinc-500 font-medium">Click to upload</p>
              </div>
            </div>

            {mode === 'metadata' && metadata && (
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest text-zinc-400">EXIF Data</Label>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm py-2 border-b border-zinc-50 dark:border-zinc-900 last:border-0">
                      <span className="text-zinc-500">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mode === 'adjust' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Brightness</Label>
                    <span className="text-xs font-mono text-zinc-400">{brightness[0]}%</span>
                  </div>
                  <Slider value={brightness} onValueChange={setBrightness} min={0} max={200} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Contrast</Label>
                    <span className="text-xs font-mono text-zinc-400">{contrast[0]}%</span>
                  </div>
                  <Slider value={contrast} onValueChange={setContrast} min={0} max={200} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Saturation</Label>
                    <span className="text-xs font-mono text-zinc-400">{saturation[0]}%</span>
                  </div>
                  <Slider value={saturation} onValueChange={setSaturation} min={0} max={200} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Blur</Label>
                    <span className="text-xs font-mono text-zinc-400">{blur[0]}px</span>
                  </div>
                  <Slider value={blur} onValueChange={setBlur} min={0} max={20} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Grayscale</Label>
                    <span className="text-xs font-mono text-zinc-400">{grayscale[0]}%</span>
                  </div>
                  <Slider value={grayscale} onValueChange={setGrayscale} min={0} max={100} step={1} />
                </div>
              </div>
            )}

            {(mode === 'watermark' || mode === 'add-text') && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Text Content</Label>
                  <Input 
                    placeholder="Enter text..." 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Font Size</Label>
                    <span className="text-xs font-mono text-zinc-400">{fontSize[0]}%</span>
                  </div>
                  <Slider value={fontSize} onValueChange={setFontSize} min={5} max={100} step={1} />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Opacity</Label>
                    <span className="text-xs font-mono text-zinc-400">{opacity[0]}%</span>
                  </div>
                  <Slider value={opacity} onValueChange={setOpacity} min={0} max={100} step={1} />
                </div>
              </div>
            )}

            {mode === 'meme' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Top Text</Label>
                  <Input 
                    placeholder="TOP TEXT" 
                    value={topText} 
                    onChange={(e) => setTopText(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Bottom Text</Label>
                  <Input 
                    placeholder="BOTTOM TEXT" 
                    value={bottomText} 
                    onChange={(e) => setBottomText(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Text Size</Label>
                    <span className="text-xs font-mono text-zinc-400">{fontSize[0]}%</span>
                  </div>
                  <Slider value={fontSize} onValueChange={setFontSize} min={5} max={100} step={1} />
                </div>
              </div>
            )}

            {file && mode !== 'metadata' && (
              <Button className="w-full h-12 rounded-xl font-bold" onClick={downloadImage}>
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            )}
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-200 dark:border-zinc-800 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {preview ? (
              <div className="relative max-w-full max-h-full">
                <canvas ref={canvasRef} className="max-w-full max-h-[600px] rounded-xl shadow-2xl" />
                {mode === 'metadata' && (
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none">
                    <History className="w-32 h-32 text-white/20" />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white dark:bg-zinc-950 rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-300">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <p className="text-zinc-400 font-medium">Upload an image to start editing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
