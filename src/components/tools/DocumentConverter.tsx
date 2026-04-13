import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Download, RefreshCw, FileText, FileCode, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';

interface Props {
  mode: 'docx-to-txt' | 'docx-to-html' | 'txt-to-pdf' | 'csv-to-excel' | 'excel-to-csv' | 'ebook-converter';
}

export default function DocumentConverter({ mode }: Props) {
  const [file, setFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      if (mode === 'docx-to-txt') {
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        setResult(value);
      } else if (mode === 'docx-to-html') {
        const { value } = await mammoth.convertToHtml({ arrayBuffer });
        setResult(value);
      } else if (mode === 'txt-to-pdf' || mode === 'ebook-converter') {
        const text = await file.text();
        const pdf = new jsPDF();
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 10, 10);
        const blob = pdf.output('blob');
        downloadBlob(blob, 'converted.pdf');
      } else if (mode === 'csv-to-excel') {
        const text = await file.text();
        const workbook = XLSX.read(text, { type: 'string' });
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        downloadBlob(blob, 'converted.xlsx');
      } else if (mode === 'excel-to-csv') {
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        setResult(csv);
      }
    } catch (err) {
      console.error(err);
      alert('Conversion failed. Please check the file format.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const downloadResult = () => {
    if (!result) return;
    const ext = mode === 'docx-to-html' ? 'html' : 'txt';
    const blob = new Blob([result], { type: 'text/plain' });
    downloadBlob(blob, `converted.${ext}`);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div 
        className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-12 text-center space-y-6 cursor-pointer hover:border-zinc-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto">
          <Upload className="w-10 h-10 text-zinc-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Upload Document</h3>
          <p className="text-zinc-500 mt-2">Select a file to convert</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      {file && (
        <div className="space-y-6">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="font-medium truncate max-w-[300px]">{file.name}</span>
            <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
          </div>

          <Button 
            size="lg" 
            className="w-full h-14 rounded-2xl text-lg font-bold"
            onClick={convert}
            disabled={isProcessing}
          >
            {isProcessing ? <RefreshCw className="w-5 h-5 animate-spin mr-2" /> : null}
            Convert Now
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-6 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 max-h-64 overflow-auto font-mono text-sm whitespace-pre-wrap">
                {result}
              </div>
              <Button variant="secondary" className="w-full h-12 rounded-xl" onClick={downloadResult}>
                <Download className="w-4 h-4 mr-2" /> Download Result
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
