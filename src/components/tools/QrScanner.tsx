import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RefreshCw, Copy, Check, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QrScanner() {
  const [scanResult, setScanResult] = React.useState<string | null>(null);
  const [isCopied, setIsCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
      },
      (err) => {
        // Silently handle scan errors (common during scanning)
      }
    );

    return () => {
      scanner.clear().catch(e => console.error("Failed to clear scanner", e));
    };
  }, []);

  const copyToClipboard = () => {
    if (scanResult) {
      navigator.clipboard.writeText(scanResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div id="reader" className="w-full rounded-2xl overflow-hidden"></div>
      </div>

      {scanResult && (
        <div className="space-y-4">
          <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" /> Scan Result
            </h4>
            <p className="font-mono text-sm break-all">{scanResult}</p>
          </div>
          <div className="flex gap-4">
            <Button className="flex-1 h-12 rounded-xl" onClick={copyToClipboard}>
              {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {isCopied ? 'Copied!' : 'Copy Result'}
            </Button>
            <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => window.location.reload()}>
              Scan Again
            </Button>
          </div>
        </div>
      )}

      {!scanResult && (
        <div className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-sm text-zinc-500">
          <AlertCircle className="w-5 h-5" />
          <p>Please allow camera access to scan QR codes.</p>
        </div>
      )}
    </div>
  );
}
