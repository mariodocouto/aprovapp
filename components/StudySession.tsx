
import React, { useState, useEffect, useRef } from 'react';
import type { Edital, StudySessionData } from '../types.ts';
import { Play, Pause, Square, Book, FileText, Target, Monitor, PenSquare, Repeat } from 'lucide-react';

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
    const [disciplineId, setDisciplineId] = useState<string>(edital.disciplines[0]?.id || '');
    const [topicId, setTopicId] = useState<string>(edital.disciplines[0]?.topics[0]?.id || '');
    const [studyType, setStudyType] = useState<StudySessionData['type']>('theory');
    
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

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

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center">
            <div className="w-full bg-neutral-800/50 rounded-xl p-8 shadow-lg border border-neutral-700/50">
                {!isActive && time === 0 && (
                    <div className="space-y-6 mb-8">
                         <div>
                            <label htmlFor="discipline" className="block text-sm font-medium text-neutral-300 mb-1">Disciplina</label>
                            <select id="discipline" value={disciplineId} onChange={handleDisciplineChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 text-white text-lg">
                                {edital.disciplines.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="topic" className="block text-sm font-medium text-neutral-300 mb-1">Assunto</label>
                            <select id="topic" value={topicId} onChange={(e) => setTopicId(e.target.value)} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 text-white text-lg">
                               {currentTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Tipo de Estudo</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                               {studyTypes.map(st => (
                                    <button key={st.id} onClick={() => setStudyType(st.id)} className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-colors ${studyType === st.id ? 'bg-primary border-primary' : 'bg-neutral-700 border-transparent hover:border-neutral-500'}`}>
                                        <st.icon className="h-5 w-5"/>
                                        <span>{st.name}</span>
                                    </button>
                               ))}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="text-8xl font-mono font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text mb-8">
                    {formatTime(time)}
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={() => setIsActive(!isActive)} className="p-4 bg-primary rounded-full text-white hover:scale-110 transition-transform">
                        {isActive ? <Pause size={32} /> : <Play size={32} />}
                    </button>
                    <button onClick={handleStop} className="p-4 bg-red-600 rounded-full text-white hover:scale-110 transition-transform">
                        <Square size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};