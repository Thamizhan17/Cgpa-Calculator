import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { Upload, FileImage, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { Card } from '@/react-app/components/ui/card';
import { Button } from '@/react-app/components/ui/button';
export default function ImageUploadZone({ onDataExtracted }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [processingStage, setProcessingStage] = useState('');
    const [success, setSuccess] = useState(false);
    const processImage = async (file) => {
        setIsProcessing(true);
        setProcessingStage('Uploading...');
        try {
            // Convert to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            await new Promise((resolve) => {
                reader.onload = resolve;
            });
            const base64Image = reader.result.split(',')[1];
            setUploadedImage(reader.result);
            setProcessingStage('Analyzing with AI...');
            // Call backend API
            const response = await fetch('/api/extract-cgpa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64Image })
            });
            const data = await response.json();
            if (!response.ok || data.error) {
                throw new Error(data.error || 'Failed to process image');
            }
            setProcessingStage('Data extracted!');
            setSuccess(true);
            setTimeout(() => {
                onDataExtracted(data);
                setIsProcessing(false);
                setSuccess(false);
                setUploadedImage(null);
            }, 1500);
        }
        catch (error) {
            console.error('Error processing image:', error);
            setIsProcessing(false);
            setUploadedImage(null);
            const errorMessage = error instanceof Error ? error.message : 'Failed to process image. Please try again.';
            alert(errorMessage);
        }
    };
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            processImage(file);
        }
    }, []);
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            processImage(file);
        }
    };
    return (_jsxs(Card, { className: "p-8 bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border-4 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] overflow-hidden relative group hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300", children: [_jsx("div", { className: "absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl" }), _jsx("div", { className: "absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-pink-400 rounded-tr-2xl" }), _jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "absolute top-0 left-1/4 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-float-1" }), _jsx("div", { className: "absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-float-2" }), _jsx("div", { className: "absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-float-3" })] }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center justify-center gap-4 mb-6", children: [_jsx("div", { className: "p-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-pulse-glow", children: _jsx(Sparkles, { className: "w-8 h-8 text-white" }) }), _jsx("h3", { className: "text-3xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]", children: "\uD83C\uDFAF Marksheet Scanner \uD83C\uDFAF" })] }), _jsx("p", { className: "text-center text-purple-200 mb-8 text-lg font-semibold", children: "\u26A1 Upload your marksheet for instant scanning! \u26A1" }), !isProcessing ? (_jsx("div", { onDragOver: (e) => { e.preventDefault(); setIsDragging(true); }, onDragLeave: () => setIsDragging(false), onDrop: handleDrop, className: `border-4 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${isDragging
                            ? 'border-cyan-400 bg-purple-500/20 scale-105 shadow-[0_0_40px_rgba(34,211,238,0.6)]'
                            : 'border-purple-400/50 hover:border-pink-400/70 hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]'}`, children: _jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsx("div", { className: `transition-transform duration-300 ${isDragging ? 'scale-125 rotate-12' : ''}`, children: _jsx(Upload, { className: "w-20 h-20 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-2xl font-black bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-3 uppercase tracking-wide", children: "Drop Zone Active" }), _jsx("p", { className: "text-lg text-pink-300 mb-4 font-bold", children: "or click the button below" })] }), _jsxs("label", { children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileSelect, className: "hidden" }), _jsxs(Button, { type: "button", onClick: () => document.querySelector('input[type="file"]')?.dispatchEvent(new MouseEvent('click')), className: "relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] transition-all duration-300 hover:scale-110 border-2 border-cyan-400/50 px-8 py-4 text-lg group overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(FileImage, { className: "w-5 h-5 mr-2 relative z-10" }), _jsx("span", { className: "relative z-10", children: "Select Image" })] })] }), _jsx("p", { className: "text-sm text-purple-300 mt-2 font-semibold", children: "\uD83D\uDCF7 Supports JPG, PNG, PDF (max 10MB)" })] }) })) : (_jsxs("div", { className: "flex flex-col items-center justify-center p-12 gap-8", children: [uploadedImage && (_jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.8)] border-4 border-purple-500 animate-scale-in", children: [_jsx("img", { src: uploadedImage, alt: "Uploaded", className: "max-w-xs max-h-48 object-contain" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" })] })), _jsxs("div", { className: "flex flex-col items-center gap-6", children: [success ? (_jsxs("div", { className: "animate-bounce-in relative", children: [_jsx(CheckCircle2, { className: "w-20 h-20 text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,1)] animate-checkmark" }), _jsx("div", { className: "absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse" })] })) : (_jsxs("div", { className: "relative", children: [_jsx(Loader2, { className: "w-16 h-16 text-cyan-400 animate-spin-slow drop-shadow-[0_0_20px_rgba(34,211,238,1)]" }), _jsx("div", { className: "absolute inset-0 bg-cyan-500/30 rounded-full blur-xl animate-pulse" })] })), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4 uppercase tracking-wider drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]", children: processingStage }), !success && (_jsx("div", { className: "w-80 h-3 bg-purple-950/60 rounded-full overflow-hidden border-2 border-purple-500/40 shadow-inner", children: _jsx("div", { className: "h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-progress-bar shadow-[0_0_20px_rgba(168,85,247,0.8)]" }) }))] })] })] }))] }), _jsx("style", { children: `
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -20px); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, -30px); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -15px); }
        }
        
        .animate-float-1 { animation: float-1 3s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 4s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 3.5s ease-in-out infinite; }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
        
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-progress-bar { animation: progress-bar 2s ease-in-out infinite; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow { animation: spin-slow 1.5s linear infinite; }
        
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        
        @keyframes checkmark {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        .animate-checkmark { animation: checkmark 0.5s ease-in-out; }
      ` })] }));
}
