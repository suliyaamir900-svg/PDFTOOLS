import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TOOLS } from '@/src/data/tools';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Info, HelpCircle, Star, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'motion/react';

// Import tool components
import RandomGenerator from '@/src/components/tools/RandomGenerator';
import TextEditorTools from '@/src/components/tools/TextEditorTools';
import TextConverter from '@/src/components/tools/TextConverter';
import WordCounter from '@/src/components/tools/WordCounter';
import PasswordGenerator from '@/src/components/tools/PasswordGenerator';
import DataFormatter from '@/src/components/tools/DataFormatter';
import AgeCalculator from '@/src/components/tools/AgeCalculator';
import CaseConverter from '@/src/components/tools/CaseConverter';
import BmiCalculator from '@/src/components/tools/BmiCalculator';
import QrGenerator from '@/src/components/tools/QrGenerator';
// import Base64Codec from '@/src/components/tools/Base64Codec';
import ImageCompressor from '@/src/components/tools/ImageCompressor';
import LoremIpsum from '@/src/components/tools/LoremIpsum';
import EmiCalculator from '@/src/components/tools/EmiCalculator';
import UuidGenerator from '@/src/components/tools/UuidGenerator';
import TextToSpeech from '@/src/components/tools/TextToSpeech';
import UnitConverter from '@/src/components/tools/UnitConverter';
import BinaryConverter from '@/src/components/tools/BinaryConverter';
import PercentageCalculator from '@/src/components/tools/PercentageCalculator';
import DiscountCalculator from '@/src/components/tools/DiscountCalculator';
import ColorPicker from '@/src/components/tools/ColorPicker';
import Stopwatch from '@/src/components/tools/Stopwatch';
import RandomNumber from '@/src/components/tools/RandomNumber';
import UniversalImageConverter from '@/src/components/tools/UniversalImageConverter';
import ImageToPdf from '@/src/components/tools/ImageToPdf';
import PdfToImage from '@/src/components/tools/PdfToImage';
import ImageToText from '@/src/components/tools/ImageToText';
import ImageEditor from '@/src/components/tools/ImageEditor';
import PdfTools from '@/src/components/tools/PdfTools';
import DocumentConverter from '@/src/components/tools/DocumentConverter';
import ZipTools from '@/src/components/tools/ZipTools';
import QrScanner from '@/src/components/tools/QrScanner';
import ScreenRecorder from '@/src/components/tools/ScreenRecorder';
import FileFormatDetector from '@/src/components/tools/FileFormatDetector';
import MathCalculators from '@/src/components/tools/MathCalculators';
import FinanceCalculators from '@/src/components/tools/FinanceCalculators';
import HealthCalculators from '@/src/components/tools/HealthCalculators';
import DateTimeCalculators from '@/src/components/tools/DateTimeCalculators';
import AdvancedCalculators from '@/src/components/tools/AdvancedCalculators';
import ImageUtilityTools from '@/src/components/tools/ImageUtilityTools';
import AdvancedImageTools from '@/src/components/tools/AdvancedImageTools';
import PresentationTools from '@/src/components/tools/PresentationTools';
import Base64ImageConverter from '@/src/components/tools/Base64ImageConverter';

const TOOL_COMPONENTS: Record<string, React.ReactNode> = {
  'word-counter': <WordCounter />,
  'password-gen': <PasswordGenerator />,
  'json-formatter': <DataFormatter mode="json" />,
  'xml-formatter': <DataFormatter mode="xml" />,
  'csv-formatter': <DataFormatter mode="csv" />,
  'age-calc': <AgeCalculator />,
  'case-converter': <CaseConverter />,
  'bmi-calc': <BmiCalculator />,
  'qr-gen': <QrGenerator />,
  'base64-codec': <TextConverter mode="base64-decode" />,
  'lorem-ipsum': <LoremIpsum />,
  'emi-calc': <EmiCalculator />,
  'uuid-gen': <UuidGenerator />,
  'text-to-speech': <TextToSpeech />,
  'unit-converter': <UnitConverter />,
  'binary-converter': <BinaryConverter />,
  'color-picker': <ColorPicker />,
  'stopwatch': <Stopwatch />,
  'random-number': <RandomNumber />,
  
  // New Calculator Tools
  'simple-calc': <MathCalculators mode="simple" />,
  'scientific-calc': <MathCalculators mode="scientific" />,
  'percent-calc': <PercentageCalculator />,
  'discount-calc': <DiscountCalculator />,
  'profit-loss-calc': <MathCalculators mode="profit-loss" />,
  'average-calc': <MathCalculators mode="average" />,
  'ratio-calc': <MathCalculators mode="ratio" />,
  'fraction-calc': <MathCalculators mode="fraction" />,
  'root-calc': <MathCalculators mode="root-cube" />,

  'algebra-solver': <MathCalculators mode="algebra" />,
  'equation-solver': <MathCalculators mode="equation" />,
  'lcm-calc': <MathCalculators mode="lcm-hcf" />,
  'hcf-calc': <MathCalculators mode="lcm-hcf" />,
  'prime-checker': <MathCalculators mode="prime" />,
  'factorial-calc': <MathCalculators mode="factorial" />,
  'log-calc': <MathCalculators mode="log" />,
  'trig-calc': <MathCalculators mode="trig" />,
  'matrix-calc': <MathCalculators mode="matrix" />,
  'stats-calc': <MathCalculators mode="statistics" />,

  'loan-calc': <FinanceCalculators mode="loan" />,
  'interest-calc': <FinanceCalculators mode="interest" />,
  'investment-calc': <FinanceCalculators mode="investment" />,
  'sip-calc': <FinanceCalculators mode="sip" />,
  'tax-calc': <FinanceCalculators mode="tax" />,
  'salary-calc': <FinanceCalculators mode="salary" />,
  'currency-conv': <FinanceCalculators mode="currency" />,

  'bmr-calc': <HealthCalculators mode="bmr" />,
  'calorie-calc': <HealthCalculators mode="calorie" />,
  'body-fat-calc': <HealthCalculators mode="body-fat" />,
  'ideal-weight-calc': <HealthCalculators mode="ideal-weight" />,

  'date-diff-calc': <DateTimeCalculators mode="date-diff" />,
  'time-calc': <DateTimeCalculators mode="time" />,
  'work-hours-calc': <DateTimeCalculators mode="work-hours" />,
  'countdown-timer': <DateTimeCalculators mode="countdown" />,

  'length-conv': <UnitConverter mode="length" />,
  'weight-conv': <UnitConverter mode="weight" />,
  'temp-conv': <UnitConverter mode="temperature" />,
  'speed-conv': <UnitConverter mode="speed" />,
  'area-conv': <UnitConverter mode="area" />,
  'volume-conv': <UnitConverter mode="volume" />,
  'data-conv': <UnitConverter mode="data" />,

  'binary-calc': <AdvancedCalculators mode="binary" />,
  'hex-calc': <AdvancedCalculators mode="hex" />,
  'gpa-calc': <AdvancedCalculators mode="gpa" />,
  'tip-calc': <FinanceCalculators mode="tip" />,
  'fuel-calc': <FinanceCalculators mode="fuel" />,
  'electricity-calc': <FinanceCalculators mode="electricity" />,
  'pwd-strength-calc': <AdvancedCalculators mode="password-strength" />,
  
  // New Text Tools
  'text-upper': <CaseConverter initialMode="upper" />,
  'text-lower': <CaseConverter initialMode="lower" />,
  'text-capitalize': <CaseConverter initialMode="capitalized" />,
  'sentence-case': <CaseConverter initialMode="sentence" />,
  'title-case': <CaseConverter initialMode="title" />,
  'text-reverse': <TextEditorTools mode="formatter" />,
  'text-sort': <TextEditorTools mode="formatter" />,
  'remove-spaces': <TextEditorTools mode="cleaner" />,
  'trim-text': <TextEditorTools mode="cleaner" />,
  'line-break-remover': <TextEditorTools mode="cleaner" />,
  
  'word-counter-tool': <WordCounter />,
  'char-counter': <WordCounter />,
  'para-counter': <WordCounter />,
  'reading-time': <WordCounter />,
  'text-formatter': <TextEditorTools mode="formatter" />,
  'bullet-gen': <TextEditorTools mode="list-gen" />,
  'numbered-list': <TextEditorTools mode="list-gen" />,
  'text-cleaner': <TextEditorTools mode="cleaner" />,
  'remove-duplicates': <TextEditorTools mode="cleaner" />,
  'find-replace': <TextEditorTools mode="find-replace" />,

  'text-to-html': <TextConverter mode="text-to-html" />,
  'html-to-text': <TextConverter mode="html-to-text" />,
  'md-to-html': <TextConverter mode="markdown-to-html" />,
  'html-to-md': <TextConverter mode="html-to-markdown" />,
  'json-formatter-tool': <DataFormatter mode="json" />,
  'text-to-binary-tool': <TextConverter mode="text-to-binary" />,
  'binary-to-text-tool': <TextConverter mode="binary-to-text" />,
  'morse-code-tool': <TextConverter mode="morse-code" />,

  'base64-encode': <TextConverter mode="base64-encode" />,
  'base64-decode': <TextConverter mode="base64-decode" />,
  'url-encode': <TextConverter mode="url-encode" />,
  'url-decode': <TextConverter mode="url-decode" />,
  'unicode-converter': <TextConverter mode="unicode-decode" />,
  'ascii-converter': <TextConverter mode="ascii-decode" />,
  'rot13-encoder': <TextConverter mode="rot13" />,
  'hash-gen': <TextConverter mode="base64-encode" />,
  'hash-decoder': <TextConverter mode="base64-decode" />,

  'random-text-gen': <RandomGenerator mode="text" />,
  'lorem-ipsum-tool': <LoremIpsum />,
  'random-name-gen': <RandomGenerator mode="name" />,
  'random-number-tool': <RandomNumber />,
  'password-gen-tool': <PasswordGenerator />,
  'username-gen': <RandomGenerator mode="username" />,
  'fake-address-gen': <RandomGenerator mode="address" />,
  'quote-gen': <RandomGenerator mode="quote" />,

  'text-to-speech-tool': <TextToSpeech />,
  
  // PDF Tools
  'pdf-merge': <PdfTools mode="merge" />,
  'pdf-split': <PdfTools mode="split" />,
  'pdf-rotate': <PdfTools mode="rotate" />,
  'pdf-protect': <PdfTools mode="protect" />,
  'pdf-unlock': <PdfTools mode="unlock" />,
  'pdf-to-jpg': <PdfToImage />,
  'jpg-to-pdf': <ImageToPdf />,
  'pdf-to-word': <DocumentConverter mode="docx-to-txt" />,
  'word-to-pdf': <DocumentConverter mode="txt-to-pdf" />,
  'pdf-to-excel': <DocumentConverter mode="csv-to-excel" />,
  'excel-to-pdf': <DocumentConverter mode="csv-to-excel" />,
  'pdf-to-ppt': <PresentationTools mode="pdf-to-ppt" />,
  'ppt-to-pdf': <PresentationTools mode="ppt-to-pdf" />,
  
  // Document Tools
  'docx-to-txt': <DocumentConverter mode="docx-to-txt" />,
  'docx-to-html': <DocumentConverter mode="docx-to-html" />,
  'txt-to-pdf': <DocumentConverter mode="txt-to-pdf" />,
  'rtf-to-pdf': <DocumentConverter mode="txt-to-pdf" />,
  'odt-to-docx': <DocumentConverter mode="docx-to-txt" />,
  'csv-to-excel': <DocumentConverter mode="csv-to-excel" />,
  'excel-to-csv': <DocumentConverter mode="excel-to-csv" />,
  
  // Utility Tools
  'zip-to-unzip': <ZipTools />,
  'qr-scanner': <QrScanner />,
  'screen-recorder': <ScreenRecorder />,
  'format-detector': <FileFormatDetector />,
  'ebook-converter': <DocumentConverter mode="ebook-converter" />,

  // Image Editing & Utility Tools
  'img-crop': <ImageEditor initialMode="resize" />,
  'img-rotate': <ImageEditor initialMode="rotate" />,
  'img-flip': <ImageEditor initialMode="rotate" />, 
  'img-brightness': <ImageUtilityTools mode="adjust" />,
  'img-contrast': <ImageUtilityTools mode="adjust" />, 
  'img-saturation': <ImageUtilityTools mode="adjust" />,
  'img-blur': <ImageUtilityTools mode="adjust" />,
  'img-sharpen': <ImageUtilityTools mode="adjust" />,
  'img-bw': <ImageUtilityTools mode="adjust" />,
  'img-metadata': <ImageUtilityTools mode="metadata" />,
  'img-watermark-util': <ImageUtilityTools mode="watermark" />,
  'img-add-text': <ImageUtilityTools mode="add-text" />,
  'meme-gen': <ImageUtilityTools mode="meme" />,
  'img-to-pdf': <ImageToPdf />,
  'pdf-to-img': <PdfToImage />,
  'screenshot-to-text': <ImageToText />,
  'img-to-text': <ImageToText />,
  'bulk-img-compress': <ImageCompressor />,
  'lossless-compress': <ImageCompressor />,
  'lossy-compress': <ImageCompressor />,
  'img-quality': <ImageCompressor />,
  'resize-for-web': <ImageEditor initialMode="resize" />,
  'thumb-gen': <ImageEditor initialMode="resize" />,
  'color-picker-img': <ColorPicker />,
  'palette-gen': <ColorPicker />,

  // Advanced Image Tools
  'img-collage': <AdvancedImageTools mode="collage" />,
  'gif-maker': <AdvancedImageTools mode="gif-maker" />,
  'gif-to-img': <AdvancedImageTools mode="gif-to-img" />,
  'sprite-gen': <AdvancedImageTools mode="sprite" />,
  'img-compare': <AdvancedImageTools mode="compare" />,
  'histogram': <AdvancedImageTools mode="histogram" />,

  // Presentation Tools
  'png-to-ppt': <PresentationTools mode="img-to-ppt" />,
  'jpg-to-ppt': <PresentationTools mode="img-to-ppt" />,
  'pdf-to-ppt-tool': <PresentationTools mode="pdf-to-ppt" />,
  'ppt-to-images': <PresentationTools mode="ppt-to-img" />,
  'ppt-compressor': <PresentationTools mode="ppt-compress" />,

  // Image Conversion Tools
  'jpg-to-png': <UniversalImageConverter targetFormat="png" toolName="JPG to PNG" />,
  'png-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="PNG to JPG" />,
  'jpeg-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="JPEG to JPG" />,
  'jpg-to-jpeg': <UniversalImageConverter targetFormat="jpeg" toolName="JPG to JPEG" />,
  'png-to-jpeg': <UniversalImageConverter targetFormat="jpeg" toolName="PNG to JPEG" />,
  'jpeg-to-png': <UniversalImageConverter targetFormat="png" toolName="JPEG to PNG" />,
  'jpg-to-webp': <UniversalImageConverter targetFormat="webp" toolName="JPG to WebP" />,
  'webp-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="WebP to JPG" />,
  'png-to-webp': <UniversalImageConverter targetFormat="webp" toolName="PNG to WebP" />,
  'webp-to-png': <UniversalImageConverter targetFormat="png" toolName="WebP to PNG" />,
  'jpeg-to-webp': <UniversalImageConverter targetFormat="webp" toolName="JPEG to WebP" />,
  'webp-to-jpeg': <UniversalImageConverter targetFormat="jpeg" toolName="WebP to JPEG" />,
  'jpg-to-svg': <UniversalImageConverter targetFormat="svg" toolName="JPG to SVG" />,
  'png-to-svg': <UniversalImageConverter targetFormat="svg" toolName="PNG to SVG" />,
  'svg-to-png': <UniversalImageConverter targetFormat="png" toolName="SVG to PNG" />,
  'svg-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="SVG to JPG" />,
  'heic-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="HEIC to JPG" />,
  'jpg-to-heic': <UniversalImageConverter targetFormat="heic" toolName="JPG to HEIC" />,
  'avif-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="AVIF to JPG" />,
  'jpg-to-avif': <UniversalImageConverter targetFormat="avif" toolName="JPG to AVIF" />,
  'png-to-avif': <UniversalImageConverter targetFormat="avif" toolName="PNG to AVIF" />,
  'avif-to-png': <UniversalImageConverter targetFormat="png" toolName="AVIF to PNG" />,
  'heic-to-png': <UniversalImageConverter targetFormat="png" toolName="HEIC to PNG" />,
  'png-to-heic': <UniversalImageConverter targetFormat="heic" toolName="PNG to HEIC" />,
  'bmp-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="BMP to JPG" />,
  'jpg-to-bmp': <UniversalImageConverter targetFormat="bmp" toolName="JPG to BMP" />,
  'tiff-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="TIFF to JPG" />,
  'jpg-to-tiff': <UniversalImageConverter targetFormat="tiff" toolName="JPG to TIFF" />,
  'gif-to-jpg': <UniversalImageConverter targetFormat="jpg" toolName="GIF to JPG" />,
  'jpg-to-gif': <UniversalImageConverter targetFormat="gif" toolName="JPG to GIF" />,
  'img-to-base64': <Base64ImageConverter mode="img-to-base64" />,
  'base64-to-img': <Base64ImageConverter mode="base64-to-img" />,
  'img-to-ico': <UniversalImageConverter targetFormat="ico" toolName="Image to ICO" />,
  'ico-to-png': <UniversalImageConverter targetFormat="png" toolName="ICO to PNG" />,
};

export default function ToolDetail() {
  const { toolId } = useParams();
  const tool = TOOLS.find(t => t.path.split('/').pop() === toolId);
  const [isShared, setIsShared] = React.useState(false);

  const handleShare = async () => {
    if (!tool) return;
    const shareData = {
      title: `${tool.name} - Lumina`,
      text: tool.description,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (!tool) {
    return (
      <div className="text-center py-32 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Tool Not Found</h1>
        <p className="text-zinc-500">The tool you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const ToolComponent = TOOL_COMPONENTS[tool.id] || (
    <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-6">
      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto">
        <tool.icon className="w-8 h-8 text-zinc-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <p className="text-zinc-500 max-w-md mx-auto">
          We are working on bringing {tool.name} to you. 
          Check back later or explore our other tools!
        </p>
      </div>
      <Button asChild variant="outline">
        <Link to="/">Explore Other Tools</Link>
      </Button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <Helmet>
        <title>{tool.name} - Free Online Tool | Lumina</title>
        <meta name="description" content={`${tool.name}: ${tool.description} Fast, secure, and private online tool. No registration required.`} />
        <meta name="keywords" content={`${tool.name}, online ${tool.name}, free ${tool.name}, ${tool.category} tools, lumina`} />
        <link rel="canonical" href={`https://lumina.tools${tool.path}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": tool.name,
            "operatingSystem": "Any",
            "applicationCategory": "BrowserApplication",
            "description": tool.description,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Link to={`/category/${tool.category}`} className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to {tool.category}
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="rounded-lg" onClick={handleShare}>
            {isShared ? <Check className="w-4 h-4 mr-2 text-green-600" /> : <Share2 className="w-4 h-4 mr-2" />}
            {isShared ? <span className="text-green-600">Copied!</span> : 'Share'}
          </Button>
        </div>
      </div>

      {/* Tool Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"
          >
            <tool.icon className="w-8 h-8" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{tool.name}</h1>
            <p className="text-lg text-zinc-500">{tool.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">Privacy Protected</Badge>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">No Signup</Badge>
        </div>
      </div>

      {/* Tool Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-sm"
      >
        {ToolComponent}
      </motion.div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              About {tool.name}
            </h2>
            <div className="prose dark:prose-invert max-w-none text-zinc-500 leading-relaxed space-y-4">
              <p>
                {tool.name} is a free online tool provided by Lumina. It is designed to be fast, 
                secure, and easy to use. Like all our tools, it runs entirely in your web browser, 
                meaning your data is never uploaded to our servers.
              </p>
              <p>
                This local-first approach ensures maximum privacy and speed. Whether you are 
                working with sensitive documents or just need a quick utility, {tool.name} is 
                the perfect solution for your daily tasks.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {[
                { q: `Is ${tool.name} free?`, a: `Yes, ${tool.name} is completely free to use with no hidden costs or limits.` },
                { q: "Is my data secure?", a: "Yes. All processing happens locally in your browser. Your files are never sent to our servers." },
                { q: "Do I need to register?", a: "No, you can use all our tools without creating an account or providing any personal information." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200 dark:border-zinc-800 px-4 rounded-xl">
                  <AccordionTrigger className="text-left font-bold hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-zinc-500">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>

        <aside className="space-y-8">
          <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="font-bold text-zinc-900 dark:text-white">Related Tools</h3>
            <div className="space-y-2">
              {TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 5).map(related => (
                <Link key={related.id} to={related.path} className="flex items-center gap-3 p-3 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all group">
                  <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <related.icon className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors">{related.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
