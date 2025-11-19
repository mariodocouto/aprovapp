
import React, { useState, useEffect, useRef } from 'react';
import type { Edital, StudySessionData } from '../types.ts';
import { Play, Pause, Square, Book, FileText, Target, Monitor, PenSquare, Repeat, ArrowLeft } from 'lucide-react';

interface StudySessionProps {
    edital: Edital;
    onSessionEnd: (session: StudySessionData) => void;
    backToDashboard: () => void;
}

const studyTypes = [
    { id: 'theory', name: 'Teoria', icon: Book },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'video', name: 'Videoaula', icon: Monitor },
    { id: 'questions', name: 'Questões', icon: Target },
    { id: 'law', name: 'Lei Seca', icon: FileText },
    { id: 'summary', name: 'Resumo', icon: PenSquare },
    { id: 'review', name: 'Revisão', icon: Repeat },
] as const;

export const StudySession: React.FC<StudySessionProps> = ({ edital, onSessionEnd, backToDashboard }) => {
    const [disciplineId, setDisciplineId] = useState<string>('');
    const [topicId, setTopicId] = useState<string>('');
    const [studyType, setStudyType] = useState<StudySessionData['type']>('theory');
    
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Inicialização: Seleciona o primeiro item se nada estiver selecionado
    useEffect(() => {
        if (edital && edital.disciplines.length > 0 && !disciplineId) {
            const firstDisc = edital.disciplines[0];
            setDisciplineId(firstDisc.id);
            if (firstDisc.topics.length > 0) {
                setTopicId(firstDisc.topics[0].id);
            }
        }
    }, [edital]);

    // Cronômetro
    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDisciplineId = e.target.value;
        setDisciplineId(newDisciplineId);
        // Ao mudar disciplina, seleciona automaticamente o primeiro tópico dela
        const newDisc = edital.disciplines.find(d => d.id === newDisciplineId);
        if (newDisc && newDisc.topics.length > 0) {
            setTopicId(newDisc.topics[0].id);
        } else {
            setTopicId('');
        }
    };

    const handleStop = () => {
        if (time > 0) {
            onSessionEnd({
                id: `s-${Date.now()}`,
                disciplineId,
                topicId,
                duration: time,
                date: new Date(),
                type: studyType,
            });
        }
        setIsActive(false);
        setTime(0);
        backToDashboard();
    };

    const isRunning = isActive || time > 0;
    const currentTopics = edital.disciplines.find(d => d.id === disciplineId)?.topics || [];

    return (
        <div className="flex flex-col h-full max-w-5xl mx-auto p-2 md:p-4">
            {/* Cabeçalho */}
            <div className="flex items-center mb-6">
                <button onClick={backToDashboard} className="mr-4 p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white">Cronômetro de Estudos</h2>
            </div>

            <div className="bg-neutral-800/50 rounded-xl shadow-lg border border-neutral-700/50 flex-1 flex flex-col overflow-hidden">
                
                {/* Área de Seleção - SEMPRE VISÍVEL */}
                <div className="bg-neutral-900/50 p-6 border-b border-neutral-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Coluna 1: Disciplina */}
                        <div>
                            <label className="block text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                                1. Selecione a Disciplina
                            </label>
                            <select 
                                value={disciplineId} 
                                onChange={handleDisciplineChange} 
                                disabled={isRunning}
                                className={`w-full bg-neutral-800 border-2 rounded-lg p-3 text-white text-lg transition-all ${isRunning ? 'border-neutral-700 opacity-50 cursor-not-allowed' : 'border-neutral-600 focus:border-primary cursor-pointer'}`}
                            >
                                {edital.disciplines.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>

                        {/* Coluna 2: Assunto */}
                        <div>
                            <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
                                2. Selecione o Assunto
                            </label>
                            <select 
                                value={topicId} 
                                onChange={(e) => setTopicId(e.target.value)} 
                                disabled={isRunning}
                                className={`w-full bg-neutral-800 border-2 rounded-lg p-3 text-white text-lg transition-all ${isRunning ? 'border-neutral-700 opacity-50 cursor-not-allowed' : 'border-neutral-600 focus:border-secondary cursor-pointer'}`}
                            >
                                {currentTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6 flex flex-col items-center">
                    {/* Tipo de Estudo */}
                    <div className="w-full mb-8">
                        <label className="block text-xs font-bold text-neutral-400 mb-3 text-center uppercase tracking-wider">
                            3. Método de Estudo
                        </label>
                        <div className="flex flex-wrap justify-center gap-3">
                            {studyTypes.map(st => (
                                <button 
                                    key={st.id} 
                                    onClick={() => setStudyType(st.id)} 
                                    disabled={isRunning}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm font-medium ${
                                        studyType === st.id 
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                                        : isRunning 
                                            ? 'bg-neutral-800 text-neutral-600 border-transparent cursor-not-allowed'
                                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:bg-neutral-700'
                                    }`}
                                >
                                    <st.icon className="h-4 w-4"/>
                                    <span>{st.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Display do Tempo */}
                    <div className="mt-auto mb-8 flex flex-col items-center">
                        <div className="relative">
                            <div className={`text-7xl md:text-9xl font-mono font-bold mb-4 tabular-nums tracking-tighter transition-colors ${isActive ? 'text-white drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'text-neutral-500'}`}>
                                {formatTime(time)}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setIsActive(!isActive)} 
                                className={`h-20 w-20 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 ${
                                    isActive 
                                    ? 'bg-yellow-500 text-neutral-900 hover:bg-yellow-400' 
                                    : 'bg-green-500 text-neutral-900 hover:bg-green-400'
                                }`}
                            >
                                {isActive ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                            </button>
                            
                            <button 
                                onClick={handleStop} 
                                disabled={time === 0}
                                className={`h-20 w-20 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 ${
                                    time === 0
                                    ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                                    : 'bg-red-500 text-white hover:bg-red-400'
                                }`}
                            >
                                <Square size={32} fill="currentColor" />
                            </button>
                        </div>
                        <p className="text-neutral-500 text-sm mt-6 font-medium">
                            {isActive ? 'Foco total! Cronômetro rodando...' : time > 0 ? 'Sessão pausada' : 'Pronto para começar'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
