
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
    { id: 'law', name: 'Lei Seca', icon: FileText },
    { id: 'questions', name: 'Questões', icon: Target },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'video', name: 'Video-aula', icon: Monitor },
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

    // Inicialização segura
    useEffect(() => {
        if (edital && edital.disciplines.length > 0) {
            // Só define se ainda não tiver selecionado (ou se o edital mudou drasticamente)
            if (!disciplineId || !edital.disciplines.find(d => d.id === disciplineId)) {
                const firstDisc = edital.disciplines[0];
                setDisciplineId(firstDisc.id);
                if (firstDisc.topics.length > 0) {
                    setTopicId(firstDisc.topics[0].id);
                }
            }
        }
    }, [edital, disciplineId]);

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
        const firstTopicId = edital.disciplines.find(d => d.id === newDisciplineId)?.topics[0]?.id || '';
        setTopicId(firstTopicId);
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
    
    const currentTopics = edital.disciplines.find(d => d.id === disciplineId)?.topics || [];
    const isRunning = isActive || time > 0;

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
                <button onClick={backToDashboard} className="mr-4 p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white">Sessão de Estudo</h2>
            </div>

            <div className="bg-neutral-800/50 rounded-xl p-6 shadow-lg border border-neutral-700/50 flex-1 flex flex-col">
                
                {/* Área de Seleção - Sempre visível, apenas desabilitada se estiver rodando */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${isRunning ? 'opacity-50 pointer-events-none' : ''}`}>
                    <div>
                        <label htmlFor="discipline" className="block text-sm font-bold text-primary mb-2 uppercase tracking-wider">1. Disciplina</label>
                        <select 
                            id="discipline" 
                            value={disciplineId} 
                            onChange={handleDisciplineChange} 
                            className="w-full bg-neutral-900 border-neutral-600 rounded-lg p-4 text-white text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            disabled={isRunning}
                        >
                            {edital.disciplines.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="topic" className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">2. Assunto</label>
                        <select 
                            id="topic" 
                            value={topicId} 
                            onChange={(e) => setTopicId(e.target.value)} 
                            className="w-full bg-neutral-900 border-neutral-600 rounded-lg p-4 text-white text-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all"
                            disabled={isRunning}
                        >
                           {currentTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Tipo de Estudo */}
                <div className={`mb-8 ${isRunning ? 'opacity-50 pointer-events-none' : ''}`}>
                    <label className="block text-sm font-medium text-neutral-400 mb-3 text-center">3. Como você vai estudar?</label>
                    <div className="flex flex-wrap justify-center gap-3">
                        {studyTypes.map(st => (
                            <button 
                                key={st.id} 
                                onClick={() => setStudyType(st.id)} 
                                disabled={isRunning}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                                    studyType === st.id 
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                                    : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:bg-neutral-700'
                                }`}
                            >
                                <st.icon className="h-5 w-5"/>
                                <span className="font-medium">{st.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Cronômetro e Controles */}
                <div className="mt-auto flex flex-col items-center justify-center bg-neutral-900/50 rounded-2xl p-8 border border-neutral-800">
                    <div className="text-7xl md:text-9xl font-mono font-bold text-white mb-8 tabular-nums tracking-tight drop-shadow-2xl">
                        {formatTime(time)}
                    </div>

                    <div className="flex gap-6">
                        <button 
                            onClick={() => setIsActive(!isActive)} 
                            className={`h-20 w-20 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-110 ${isActive ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-green-500 hover:bg-green-400'}`}
                        >
                            {isActive ? <Pause size={32} className="text-black fill-current" /> : <Play size={32} className="text-black fill-current ml-1" />}
                        </button>
                        
                        <button 
                            onClick={handleStop} 
                            disabled={time === 0}
                            className="h-20 w-20 bg-red-500 hover:bg-red-400 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-black transition-all shadow-xl hover:scale-110"
                        >
                            <Square size={32} className="fill-current" />
                        </button>
                    </div>
                    <p className="text-neutral-500 text-sm mt-6">
                        {isActive ? 'Cronômetro rodando...' : time > 0 ? 'Pausado' : 'Pronto para começar'}
                    </p>
                </div>
            </div>
        </div>
    );
};
