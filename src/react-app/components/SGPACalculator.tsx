import { useState } from 'react';
import { Calculator, Plus, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';
import { Card } from '@/react-app/components/ui/card';

export default function SGPACalculator() {
  const [sgpaValues, setSgpaValues] = useState<string[]>(['', '', '', '']);
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const addSemester = () => {
    setSgpaValues([...sgpaValues, '']);
  };

  const removeSemester = (index: number) => {
    if (sgpaValues.length > 1) {
      const newValues = sgpaValues.filter((_, i) => i !== index);
      setSgpaValues(newValues);
    }
  };

  const updateSGPA = (index: number, value: string) => {
    const newValues = [...sgpaValues];
    newValues[index] = value;
    setSgpaValues(newValues);
  };

  const calculateCGPA = () => {
    setError('');
    let sum = 0;
    let count = 0;

    for (const sgpa of sgpaValues) {
      if (sgpa.trim() === '') continue;
      
      const value = parseFloat(sgpa);
      
      if (isNaN(value) || value < 0 || value > 10) {
        setError('SGPA values must be between 0 and 10');
        setCalculatedCGPA(null);
        return;
      }
      
      sum += value;
      count++;
    }

    if (count === 0) {
      setError('Please enter at least one SGPA value');
      setCalculatedCGPA(null);
      return;
    }

    const cgpa = sum / count;
    setCalculatedCGPA(cgpa);
  };

  const reset = () => {
    setSgpaValues(['', '', '', '']);
    setCalculatedCGPA(null);
    setError('');
  };

  const getPerformanceLabel = (cgpa: number) => {
    if (cgpa >= 9.0) return { label: 'Outstanding', color: 'text-green-500' };
    if (cgpa >= 8.0) return { label: 'Excellent', color: 'text-blue-500' };
    if (cgpa >= 7.0) return { label: 'Very Good', color: 'text-indigo-500' };
    if (cgpa >= 6.0) return { label: 'Good', color: 'text-purple-500' };
    if (cgpa >= 5.0) return { label: 'Average', color: 'text-yellow-500' };
    return { label: 'Below Average', color: 'text-orange-500' };
  };

  return (
    <Card className="relative p-8 bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border-4 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] overflow-hidden hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] transition-all duration-300">
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-cyan-400 rounded-bl-2xl"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-green-400 rounded-br-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-green-500 to-cyan-600 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.8)] animate-pulse-glow">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
            SGPA to CGPA Converter
          </h3>
        </div>
        
        <p className="text-center text-green-200 mb-8 text-lg font-semibold">
          🎓 Enter semester SGPAs for instant CGPA calculation 🎓
        </p>

        {error && (
          <div className="mb-6 p-5 bg-gradient-to-r from-red-900/40 to-orange-900/40 border-4 border-red-500/60 rounded-xl text-red-300 text-lg font-bold animate-shake backdrop-blur-sm shadow-[0_0_30px_rgba(239,68,68,0.5)]">
            <span className="text-2xl mr-2">⚠️</span> {error}
          </div>
        )}

        <div className="space-y-4 mb-8">
          {sgpaValues.map((sgpa, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-2 border-green-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-cyan-600 text-white text-lg font-black shadow-[0_0_20px_rgba(34,197,94,0.6)] flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold text-green-300 mb-1 block uppercase tracking-wider">
                  Semester {index + 1} SGPA
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 8.5"
                  value={sgpa}
                  onChange={(e) => updateSGPA(index, e.target.value)}
                  className="bg-purple-950/50 border-2 border-green-500/30 focus:border-cyan-400/60 text-green-100 placeholder:text-green-400/50 focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all font-bold text-lg"
                  min="0"
                  max="10"
                  step="0.01"
                />
              </div>
              {sgpaValues.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSemester(index)}
                  className="hover:bg-red-500/20 hover:text-red-400 border-2 border-red-500/30 hover:border-red-500/60 flex-shrink-0 rounded-lg transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={addSemester}
          className="w-full mb-8 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-dashed border-green-400/50 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-green-300 hover:text-cyan-300 font-black uppercase tracking-wider transition-all duration-300 relative group overflow-hidden py-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-cyan-500/30 to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Plus className="w-5 h-5 mr-2 relative z-10" />
          <span className="relative z-10">+ Add Semester</span>
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={calculateCGPA}
            className="relative flex-1 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-400 hover:to-cyan-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_50px_rgba(34,197,94,0.8)] transition-all duration-300 hover:scale-105 border-2 border-green-400/50 py-6 text-lg group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Calculator className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Calculate</span>
          </Button>
          <Button
            onClick={reset}
            className="relative bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] transition-all duration-300 hover:scale-105 border-2 border-red-400/50 py-6 px-8 text-lg group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <RotateCcw className="w-5 h-5 mr-2 relative z-10" />
            <span className="relative z-10">Reset</span>
          </Button>
        </div>

        {calculatedCGPA !== null && (
          <div className="mt-8 p-8 bg-gradient-to-br from-green-900/50 via-emerald-900/50 to-cyan-900/50 backdrop-blur-xl border-4 border-green-500/60 rounded-2xl shadow-[0_0_60px_rgba(34,197,94,0.6)] animate-scale-in overflow-hidden relative">
            {/* Animated corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-green-400 rounded-tr-2xl animate-pulse animation-delay-200"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-green-400 rounded-bl-2xl animate-pulse animation-delay-400"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-cyan-400 rounded-br-2xl animate-pulse animation-delay-600"></div>
            
            <div className="text-center relative z-10">
              <h4 className="text-2xl font-black text-green-300 mb-4 uppercase tracking-widest">💚 Overall CGPA 💚</h4>
              <div className="relative inline-block mb-6">
                <div className="text-8xl font-black bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent mb-3 animate-number-count drop-shadow-[0_0_40px_rgba(34,197,94,1)]">
                  {calculatedCGPA.toFixed(2)}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              </div>
              <div className={`text-3xl font-black uppercase tracking-wider mb-6 ${getPerformanceLabel(calculatedCGPA).color} drop-shadow-[0_0_20px_currentColor]`}>
                ⭐ {getPerformanceLabel(calculatedCGPA).label} ⭐
              </div>
              <div className="bg-green-950/60 border-2 border-green-500/40 backdrop-blur-sm rounded-xl p-5 text-green-200">
                <p className="font-bold mb-2 text-lg uppercase tracking-wide text-cyan-300">Formula Used:</p>
                <p className="font-mono text-base font-semibold text-green-200">CGPA = (Σ SGPA) / Number of Semesters</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.3s ease-out;
        }

        @keyframes number-count {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-number-count {
          animation: number-count 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.8); }
        }
        
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
    </Card>
  );
}
