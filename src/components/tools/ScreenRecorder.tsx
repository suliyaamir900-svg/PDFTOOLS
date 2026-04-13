import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, StopCircle, Play, Download, RefreshCw, AlertCircle, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScreenRecorder() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [recordedBlob, setRecordedBlob] = React.useState<Blob | null>(null);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      setStream(displayStream);
      const mediaRecorder = new MediaRecorder(displayStream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordedBlob(blob);
        setIsRecording(false);
        displayStream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordedBlob(null);
    } catch (err) {
      console.error(err);
      alert('Failed to start screen recording. Please ensure you have given necessary permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const downloadRecording = () => {
    if (recordedBlob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(recordedBlob);
      link.download = `omnitool-recording-${Date.now()}.webm`;
      link.click();
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="bg-zinc-900 rounded-[2rem] p-12 text-center space-y-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-zinc-800 to-red-500 opacity-50"></div>
        
        <div className="w-24 h-24 bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto relative">
          <Monitor className="w-12 h-12 text-zinc-400" />
          {isRecording && (
            <motion.div 
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-zinc-900"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white">Screen Recorder</h3>
          <p className="text-zinc-500 mt-2">Record your screen and audio directly from your browser</p>
        </div>

        <div className="flex justify-center gap-4">
          {!isRecording ? (
            <Button 
              size="lg" 
              className="h-16 px-8 rounded-2xl bg-white text-black hover:bg-zinc-200 font-bold text-lg"
              onClick={startRecording}
            >
              <Play className="w-5 h-5 mr-2 fill-current" /> Start Recording
            </Button>
          ) : (
            <Button 
              size="lg" 
              variant="destructive"
              className="h-16 px-8 rounded-2xl font-bold text-lg"
              onClick={stopRecording}
            >
              <StopCircle className="w-5 h-5 mr-2" /> Stop Recording
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {recordedBlob && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                <Video className="w-6 h-6 text-zinc-500" />
              </div>
              <div>
                <h4 className="font-bold">Recording Ready</h4>
                <p className="text-sm text-zinc-500">{(recordedBlob.size / 1024 / 1024).toFixed(2)} MB • WebM Format</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none rounded-xl" onClick={() => setRecordedBlob(null)}>Discard</Button>
              <Button className="flex-1 sm:flex-none rounded-xl" onClick={downloadRecording}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-sm text-zinc-500">
        <AlertCircle className="w-5 h-5" />
        <p>Screen recording works best on desktop browsers. Audio recording includes system audio and microphone if selected.</p>
      </div>
    </div>
  );
}
