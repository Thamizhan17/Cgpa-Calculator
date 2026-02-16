import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calculator, Plus, Trash2, RotateCcw, Moon, Sun } from 'lucide-react';
import { Button } from '@/react-app/components/ui/button';
import { Input } from '@/react-app/components/ui/input';
import { Card } from '@/react-app/components/ui/card';
import ImageUploadZone from '@/react-app/components/ImageUploadZone';
import SGPACalculator from '@/react-app/components/SGPACalculator';
export default function Home() {
    const [semesters, setSemesters] = useState([
        { id: '1', subjects: [{ id: '1-1', name: '', credits: '', gradePoint: '' }] }
    ]);
    const [calculatedCGPA, setCalculatedCGPA] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [errors, setErrors] = useState([]);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };
    const addSemester = () => {
        const newId = (semesters.length + 1).toString();
        setSemesters([
            ...semesters,
            { id: newId, subjects: [{ id: `${newId}-1`, name: '', credits: '', gradePoint: '' }] }
        ]);
    };
    const removeSemester = (semesterId) => {
        if (semesters.length > 1) {
            setSemesters(semesters.filter(sem => sem.id !== semesterId));
        }
    };
    const addSubject = (semesterId) => {
        setSemesters(semesters.map(sem => {
            if (sem.id === semesterId) {
                const newSubjectId = `${semesterId}-${sem.subjects.length + 1}`;
                return {
                    ...sem,
                    subjects: [...sem.subjects, { id: newSubjectId, name: '', credits: '', gradePoint: '' }]
                };
            }
            return sem;
        }));
    };
    const removeSubject = (semesterId, subjectId) => {
        setSemesters(semesters.map(sem => {
            if (sem.id === semesterId && sem.subjects.length > 1) {
                return {
                    ...sem,
                    subjects: sem.subjects.filter(sub => sub.id !== subjectId)
                };
            }
            return sem;
        }));
    };
    const updateSubject = (semesterId, subjectId, field, value) => {
        setSemesters(semesters.map(sem => {
            if (sem.id === semesterId) {
                return {
                    ...sem,
                    subjects: sem.subjects.map(sub => sub.id === subjectId ? { ...sub, [field]: value } : sub)
                };
            }
            return sem;
        }));
    };
    const calculateCGPA = () => {
        const newErrors = [];
        let totalCredits = 0;
        let totalWeightedGradePoints = 0;
        for (const semester of semesters) {
            for (const subject of semester.subjects) {
                const credits = parseFloat(subject.credits);
                const gradePoint = parseFloat(subject.gradePoint);
                if (!subject.credits || !subject.gradePoint) {
                    newErrors.push('Please fill in all credits and grade points');
                    break;
                }
                if (isNaN(credits) || credits <= 0 || credits > 10 || !Number.isInteger(credits)) {
                    newErrors.push('Credits must be whole numbers between 1 and 10');
                    break;
                }
                if (isNaN(gradePoint) || gradePoint < 0 || gradePoint > 10 || !Number.isInteger(gradePoint)) {
                    newErrors.push('Grade points must be whole numbers between 0 and 10');
                    break;
                }
                totalCredits += credits;
                totalWeightedGradePoints += credits * gradePoint;
            }
            if (newErrors.length > 0)
                break;
        }
        setErrors(newErrors);
        if (newErrors.length === 0 && totalCredits > 0) {
            const cgpa = totalWeightedGradePoints / totalCredits;
            setCalculatedCGPA(cgpa);
        }
        else if (totalCredits === 0) {
            setErrors(['No valid data to calculate CGPA']);
        }
    };
    const resetCalculator = () => {
        setSemesters([
            { id: '1', subjects: [{ id: '1-1', name: '', credits: '', gradePoint: '' }] }
        ]);
        setCalculatedCGPA(null);
        setErrors([]);
    };
    const getPerformanceLabel = (cgpa) => {
        if (cgpa >= 9.0)
            return { label: 'Outstanding', color: 'text-green-500' };
        if (cgpa >= 8.0)
            return { label: 'Excellent', color: 'text-blue-500' };
        if (cgpa >= 7.0)
            return { label: 'Very Good', color: 'text-indigo-500' };
        if (cgpa >= 6.0)
            return { label: 'Good', color: 'text-purple-500' };
        if (cgpa >= 5.0)
            return { label: 'Average', color: 'text-yellow-500' };
        return { label: 'Below Average', color: 'text-orange-500' };
    };
    const calculateSGPA = (semester) => {
        let totalCredits = 0;
        let totalWeightedGradePoints = 0;
        for (const subject of semester.subjects) {
            const credits = parseFloat(subject.credits);
            const gradePoint = parseFloat(subject.gradePoint);
            if (!isNaN(credits) && !isNaN(gradePoint) && credits > 0) {
                totalCredits += credits;
                totalWeightedGradePoints += credits * gradePoint;
            }
        }
        return totalCredits > 0 ? (totalWeightedGradePoints / totalCredits).toFixed(2) : '0.00';
    };
    const handleImageDataExtracted = (data) => {
        // Convert extracted data to our semester format with proper IDs
        // Credits are left empty for user to enter manually
        const newSemesters = data.semesters.map((sem, semIdx) => ({
            id: String(semIdx + 1),
            subjects: sem.subjects.map((sub, subIdx) => ({
                id: `${semIdx + 1}-${subIdx + 1}`,
                name: sub.name,
                credits: '', // User will enter credits manually
                gradePoint: sub.gradePoint
            }))
        }));
        setSemesters(newSemesters);
        setCalculatedCGPA(null);
        setErrors([]);
    };
    return (_jsxs("div", { className: "min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-950 to-fuchsia-950 dark:from-purple-950 dark:via-violet-950 dark:to-fuchsia-950 py-12 px-4", children: [_jsx("div", { className: "fixed inset-0 pointer-events-none opacity-10", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
          `,
                        backgroundSize: '50px 50px'
                    } }) }), _jsxs("div", { className: "fixed inset-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "absolute top-1/4 -left-12 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob neon-glow" }), _jsx("div", { className: "absolute top-1/3 -right-12 w-96 h-96 bg-pink-500/30 dark:bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 neon-glow" }), _jsx("div", { className: "absolute -bottom-12 left-1/2 w-96 h-96 bg-cyan-500/30 dark:bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-4000 neon-glow" })] }), _jsx("div", { className: "fixed inset-0 pointer-events-none opacity-5", children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-scan" }) }), _jsxs("div", { className: "max-w-6xl mx-auto relative z-10", children: [_jsxs("div", { className: "text-center mb-12 space-y-4", children: [_jsxs("div", { className: "relative inline-block", children: [_jsx("h1", { className: "text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fadeIn drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]", children: "CGPA CALCULATOR" }), _jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-lg blur opacity-30 animate-pulse" })] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: toggleDarkMode, className: "absolute top-4 right-4 hover:bg-purple-500/20 border-2 border-purple-400/50 rounded-xl", children: darkMode ? _jsx(Sun, { className: "w-5 h-5 text-purple-300" }) : _jsx(Moon, { className: "w-5 h-5 text-purple-300" }) })] }), _jsx("div", { className: "mb-8", children: _jsx(ImageUploadZone, { onDataExtracted: handleImageDataExtracted }) }), errors.length > 0 && (_jsx(Card, { className: "mb-6 p-6 bg-gradient-to-r from-red-900/40 to-orange-900/40 border-4 border-red-500/60 shadow-[0_0_40px_rgba(239,68,68,0.5)] animate-shake backdrop-blur-xl", children: _jsx("div", { className: "text-red-300 space-y-2", children: errors.map((error, idx) => (_jsxs("p", { className: "font-bold text-lg flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\u26A0\uFE0F" }), _jsx("span", { className: "uppercase tracking-wide", children: error })] }, idx))) }) })), _jsx("div", { className: "space-y-6 mb-8", children: semesters.map((semester, semIndex) => (_jsxs(Card, { className: "relative p-6 bg-gradient-to-br from-purple-900/30 via-violet-900/30 to-fuchsia-900/30 backdrop-blur-xl border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-300 animate-slide-up overflow-hidden group", style: { animationDelay: `${semIndex * 100}ms` }, children: [_jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full" }), _jsx("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-tr-full" }), _jsxs("div", { className: "flex items-center justify-between mb-4 relative z-10", children: [_jsxs("h2", { className: "text-2xl font-bold flex items-center gap-3", children: [_jsx("span", { className: "flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 text-white text-lg font-black shadow-[0_0_20px_rgba(168,85,247,0.6)]", children: semIndex + 1 }), _jsxs("span", { className: "bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent", children: ["SEMESTER ", semIndex + 1] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 backdrop-blur-sm", children: [_jsx("span", { className: "text-xs font-bold text-cyan-300 uppercase tracking-wider", children: "SGPA" }), _jsx("span", { className: "ml-2 text-lg font-black bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent", children: calculateSGPA(semester) })] }), semesters.length > 1 && (_jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeSemester(semester.id), className: "hover:bg-red-500/20 hover:text-red-400 border-2 border-red-500/40 hover:border-red-500/80 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all duration-300 rounded-xl", children: _jsx(Trash2, { className: "w-5 h-5" }) }))] })] }), _jsx("div", { className: "space-y-3", children: semester.subjects.map((subject) => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-3 items-start p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300 group relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsxs("div", { className: "md:col-span-6 relative z-10", children: [_jsx("label", { className: "text-xs font-bold text-purple-300 mb-1 block uppercase tracking-wider", children: "Subject Name (Optional)" }), _jsx(Input, { value: subject.name, onChange: (e) => updateSubject(semester.id, subject.id, 'name', e.target.value), className: "bg-purple-950/50 border-2 border-purple-500/30 focus:border-cyan-400/60 text-purple-100 placeholder:text-purple-400/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all" })] }), _jsxs("div", { className: "md:col-span-2 relative z-10", children: [_jsx("label", { className: "text-xs font-bold text-cyan-300 mb-1 block uppercase tracking-wider", children: "Credits *" }), _jsx(Input, { type: "number", placeholder: "e.g. 3", value: subject.credits, onChange: (e) => updateSubject(semester.id, subject.id, 'credits', e.target.value), className: "bg-purple-950/50 border-2 border-cyan-500/30 focus:border-cyan-400/60 text-cyan-100 placeholder:text-cyan-400/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all font-bold", min: "0", max: "10", step: "1" })] }), _jsxs("div", { className: "md:col-span-3 relative z-10", children: [_jsx("label", { className: "text-xs font-bold text-pink-300 mb-1 block uppercase tracking-wider", children: "Grade Point *" }), _jsx(Input, { type: "number", placeholder: "e.g. 8", value: subject.gradePoint, onChange: (e) => updateSubject(semester.id, subject.id, 'gradePoint', e.target.value), className: "bg-purple-950/50 border-2 border-pink-500/30 focus:border-pink-400/60 text-pink-100 placeholder:text-pink-400/50 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all font-bold", min: "0", max: "10", step: "1" })] }), _jsx("div", { className: "md:col-span-1 flex items-end", children: semester.subjects.length > 1 && (_jsxs(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeSubject(semester.id, subject.id), className: "relative bg-gradient-to-br from-red-500/10 to-orange-500/10 hover:from-red-500/30 hover:to-orange-500/30 border-2 border-red-400/40 hover:border-orange-400/80 hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300 rounded-xl group overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-500/0 via-orange-500/20 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(Trash2, { className: "w-5 h-5 text-red-400 group-hover:text-orange-300 relative z-10 transition-colors" })] })) })] }, subject.id))) }), _jsxs(Button, { onClick: () => addSubject(semester.id), className: "mt-4 w-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-dashed border-cyan-400/50 hover:border-pink-400/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] text-cyan-300 hover:text-pink-300 font-bold uppercase tracking-wider transition-all duration-300 relative z-10 group overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/30 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(Plus, { className: "w-5 h-5 mr-2 relative z-10" }), _jsx("span", { className: "relative z-10", children: "+ Add Subject" })] })] }, semester.id))) }), _jsxs("div", { className: "flex flex-wrap gap-6 justify-center mb-8", children: [_jsxs(Button, { onClick: addSemester, className: "relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_50px_rgba(34,211,238,0.8)] transition-all duration-300 hover:scale-110 border-2 border-cyan-400/50 px-8 py-6 text-lg group overflow-hidden", size: "lg", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(Plus, { className: "w-6 h-6 mr-2 relative z-10" }), _jsx("span", { className: "relative z-10", children: "Add Semester" })] }), _jsxs(Button, { onClick: calculateCGPA, className: "relative bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] transition-all duration-300 hover:scale-110 border-2 border-pink-400/50 px-8 py-6 text-lg group overflow-hidden", size: "lg", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(Calculator, { className: "w-6 h-6 mr-2 relative z-10" }), _jsx("span", { className: "relative z-10", children: "Calculate SGPA" })] }), _jsxs(Button, { onClick: resetCalculator, className: "relative bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-black uppercase tracking-wider shadow-[0_0_30px_rgba(239,68,68,0.5)] hover:shadow-[0_0_50px_rgba(239,68,68,0.8)] transition-all duration-300 hover:scale-110 border-2 border-red-400/50 px-8 py-6 text-lg group overflow-hidden", size: "lg", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" }), _jsx(RotateCcw, { className: "w-6 h-6 mr-2 relative z-10" }), _jsx("span", { className: "relative z-10", children: "Reset" })] })] }), calculatedCGPA !== null && (_jsxs(Card, { className: "relative p-10 bg-gradient-to-br from-purple-900/50 via-violet-900/50 to-fuchsia-900/50 backdrop-blur-xl border-4 border-purple-500/60 shadow-[0_0_80px_rgba(168,85,247,0.6)] animate-scale-in overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-cyan-400 rounded-tl-3xl animate-pulse" }), _jsx("div", { className: "absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-pink-400 rounded-tr-3xl animate-pulse animation-delay-200" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-pink-400 rounded-bl-3xl animate-pulse animation-delay-400" }), _jsx("div", { className: "absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-cyan-400 rounded-br-3xl animate-pulse animation-delay-600" }), _jsxs("div", { className: "text-center relative z-10", children: [_jsx("h3", { className: "text-2xl font-black text-purple-300 mb-4 uppercase tracking-widest", children: "\uD83C\uDFC6 Final Score \uD83C\uDFC6" }), _jsxs("div", { className: "relative inline-block mb-6", children: [_jsx("div", { className: "text-8xl md:text-9xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-number-count drop-shadow-[0_0_40px_rgba(168,85,247,1)]", children: calculatedCGPA.toFixed(2) }), _jsx("div", { className: "absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 animate-pulse" })] }), _jsxs("div", { className: `text-3xl md:text-4xl font-black uppercase tracking-wider mb-6 ${getPerformanceLabel(calculatedCGPA).color} drop-shadow-[0_0_20px_currentColor]`, children: ["\u2B50 ", getPerformanceLabel(calculatedCGPA).label, " \u2B50"] }), _jsxs("div", { className: "bg-purple-950/60 border-2 border-purple-500/40 backdrop-blur-sm rounded-xl p-6 text-purple-200", children: [_jsx("p", { className: "font-bold mb-3 text-lg uppercase tracking-wide text-cyan-300", children: "Formula Used:" }), _jsx("p", { className: "font-mono text-lg font-semibold text-pink-200", children: "CGPA = (\u03A3 Credit \u00D7 Grade Point) / \u03A3 Credits" })] })] })] })), _jsx("div", { className: "mt-8", children: _jsx(SGPACalculator, {}) }), _jsxs(Card, { className: "mt-8 p-8 bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border-2 border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.3)] relative overflow-hidden", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" }), _jsx("h3", { className: "text-3xl font-black text-center mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent uppercase tracking-wider", children: "Grade Conversion Matrix" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-7 gap-4", children: [
                                    { grade: 'O', point: '10', color: 'from-green-500 to-emerald-600' },
                                    { grade: 'A+', point: '9', color: 'from-blue-500 to-cyan-600' },
                                    { grade: 'A', point: '8', color: 'from-indigo-500 to-blue-600' },
                                    { grade: 'B+', point: '7', color: 'from-purple-500 to-indigo-600' },
                                    { grade: 'B', point: '6', color: 'from-pink-500 to-purple-600' },
                                    { grade: 'C', point: '5', color: 'from-orange-500 to-pink-600' },
                                    { grade: 'U', point: 'Fail', color: 'from-red-500 to-orange-600' },
                                ].map((item) => (_jsxs("div", { className: `relative bg-gradient-to-br ${item.color} p-4 rounded-xl text-center border-2 border-white/30 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] transition-all duration-300 group overflow-hidden`, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }), _jsxs("div", { className: "relative z-10", children: [_jsx("div", { className: "font-black text-3xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]", children: item.grade }), _jsx("div", { className: "text-sm font-bold text-white/90 mt-1 uppercase tracking-wide", children: item.point })] }), _jsx("div", { className: "absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" })] }, item.grade))) })] }), _jsx("div", { className: "text-center mt-12 relative", children: _jsxs("div", { className: "inline-block px-8 py-4 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border-2 border-purple-500/40 rounded-xl backdrop-blur-sm shadow-[0_0_20px_rgba(168,85,247,0.3)]", children: [_jsxs("p", { className: "text-lg font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent", children: ["\u00A9 ", new Date().getFullYear(), " CGPA Calculator"] }), _jsx("p", { className: "text-sm text-purple-400 mt-1 font-semibold", children: "Built with \uD83D\uDC9C for students" })] }) })] }), _jsx("style", { children: `
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
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

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

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
      ` })] }));
}
