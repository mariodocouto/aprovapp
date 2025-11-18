
import React, { useState } from 'react';
import type { Edital, TopicStatus } from '../types.ts';
import { ChevronDown, ChevronRight, BookOpen, Monitor, FileText, CheckSquare, PenTool, X, Check } from 'lucide-react';

interface EditalViewProps {
    edital: Edital;
    topicStatus: { [topicId: string]: TopicStatus };
    onRegisterStudy: (topicId: string, methods: Partial<TopicStatus>) => void;
}

const studyMethods = [
    { key: 'pdf', label: 'Leitura PDF', icon: BookOpen },
    { key: 'video', label: 'Videoaula', icon: Monitor },
    { key: 'law', label: 'Lei Seca', icon: FileText },
    { key: 'summary', label: 'Resumo', icon: PenTool },
    { key: 'questions', label: 'Questões', icon: CheckSquare },
] as const;

// Componente Modal Interno
const StudyModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    topicName: string;
    currentStatus: TopicStatus;
    onSave: (methods: Partial<TopicStatus>) => void;
}> = ({ isOpen, onClose, topicName, currentStatus, onSave }) => {
    const [methods, setMethods] = useState<Partial<TopicStatus>>({});

    if (!isOpen) return null;

    const toggleMethod = (key: keyof TopicStatus) => {
        setMethods(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(methods);
        setMethods({});
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-2xl w-full max-w-md p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">Registrar Estudo</h3>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white"><X size={24} /></button>
                </div>
                <p className="text-neutral-300 mb-6 text-sm">O que você estudou em: <br/><span className="text-primary font-semibold">{topicName}</span>?</p>
                
                <div className="grid grid-cols-1 gap-3 mb-6">
                    {studyMethods.map(method => {
                        const isSelected = methods[method.key as keyof TopicStatus] || currentStatus?.[method.key as keyof TopicStatus];
                        return (
                            <button
                                key={method.key}
                                onClick={() => toggleMethod(method.key as keyof TopicStatus)}
                                className={`flex items-center p-3 rounded-lg border transition-all ${
                                    isSelected 
                                    ? 'bg-primary/20 border-primary text-white' 
                                    : 'bg-neutral-700 border-transparent text-neutral-400 hover:bg-neutral-600'
                                }`}
                            >
                                <method.icon className={`mr-3 h-5 w-5 ${isSelected ? 'text-primary' : ''}`} />
                                <span>{method.label}</span>
                                {isSelected && <Check className="ml-auto h-4 w-4 text-primary" />}
                            </button>
                        );
                    })}
                </div>

                <button 
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                >
                    Confirmar e Agendar Revisões
                </button>
            </div>
        </div>
    );
};

const TopicItem: React.FC<{ 
    topic: Edital['disciplines'][0]['topics'][0]; 
    status: TopicStatus; 
    onOpenModal: (topicId: string, topicName: string) => void;
}> = ({ topic, status, onOpenModal }) => {
    const hasStudied = status && !status.pending;
    
    return (
        <div className="pl-4 py-3 border-l-2 border-neutral-700 ml-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-800/50 rounded-r-lg transition-colors">
            <div className="flex-1">
                <p className={`text-sm md:text-base ${hasStudied ? 'text-white' : 'text-neutral-400'}`}>{topic.name}</p>
                {hasStudied && (
                    <div className="flex gap-2 mt-2">
                        {status.pdf && <span className="bg-blue-500/20 text-blue-300 text-[10px] px-2 py-0.5 rounded border border-blue-500/30">PDF</span>}
                        {status.video && <span className="bg-red-500/20 text-red-300 text-[10px] px-2 py-0.5 rounded border border-red-500/30">Video</span>}
                        {status.law && <span className="bg-yellow-500/20 text-yellow-300 text-[10px] px-2 py-0.5 rounded border border-yellow-500/30">Lei</span>}
                        {status.questions && <span className="bg-green-500/20 text-green-300 text-[10px] px-2 py-0.5 rounded border border-green-500/30">Questões</span>}
                        {status.summary && <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded border border-purple-500/30">Resumo</span>}
                    </div>
                )}
            </div>
            <button 
                onClick={() => onOpenModal(topic.id, topic.name)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    hasStudied 
                    ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600' 
                    : 'bg-primary text-white hover:bg-primary-700'
                }`}
            >
                {hasStudied ? 'Complementar' : 'Registrar Estudo'}
            </button>
        </div>
    );
};

export const EditalView: React.FC<EditalViewProps> = ({ edital, topicStatus, onRegisterStudy }) => {
    const [openDisciplines, setOpenDisciplines] = useState<Set<string>>(new Set([edital.disciplines[0]?.id]));
    const [modalState, setModalState] = useState<{ isOpen: boolean; topicId: string; topicName: string } | null>(null);

    const toggleDiscipline = (id: string) => {
        setOpenDisciplines(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="bg-neutral-800/50 rounded-xl p-4 md:p-6 shadow-lg border border-neutral-700/50">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Conteúdo Programático</h2>
                <p className="text-neutral-400">Marque os tópicos conforme você avança. O sistema agendará suas revisões automaticamente.</p>
            </div>
            
            <div className="space-y-3">
                {edital.disciplines.map(discipline => {
                    const isOpen = openDisciplines.has(discipline.id);
                    const totalTopics = discipline.topics.length;
                    const completedTopics = discipline.topics.filter(t => topicStatus[t.id] && !topicStatus[t.id].pending).length;
                    const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
                    
                    return (
                        <div key={discipline.id} className="bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden">
                            <div
                                className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center cursor-pointer hover:bg-neutral-800 transition-colors"
                                onClick={() => toggleDiscipline(discipline.id)}
                            >
                                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                    {isOpen ? <ChevronDown className="h-5 w-5 text-primary"/> : <ChevronRight className="h-5 w-5 text-neutral-500"/>}
                                    <h3 className="font-semibold text-lg text-neutral-200">{discipline.name}</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-neutral-400">{completedTopics}/{totalTopics}</span>
                                        <div className="w-24 h-1.5 bg-neutral-700 rounded-full mt-1">
                                            <div className="h-1.5 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isOpen && (
                                <div className="px-4 pb-4 pt-2 bg-neutral-900/30">
                                    {discipline.topics.map(topic => (
                                        <TopicItem 
                                            key={topic.id} 
                                            topic={topic} 
                                            status={topicStatus[topic.id]} 
                                            onOpenModal={(id, name) => setModalState({ isOpen: true, topicId: id, topicName: name })} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {modalState && (
                <StudyModal 
                    isOpen={modalState.isOpen}
                    topicName={modalState.topicName}
                    currentStatus={topicStatus[modalState.topicId] || {}}
                    onClose={() => setModalState(null)}
                    onSave={(methods) => onRegisterStudy(modalState.topicId, methods)}
                />
            )}
        </div>
    );
};
