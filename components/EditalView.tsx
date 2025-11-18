
import React, { useState } from 'react';
import type { Edital, TopicStatus } from '../types.ts';
import { ChevronDown, ChevronRight, Book, Monitor, FileText, CheckSquare, Repeat, PenSquare } from 'lucide-react';

interface EditalViewProps {
    edital: Edital;
    topicStatus: { [topicId: string]: TopicStatus };
    updateTopicStatus: (topicId: string, status: Partial<TopicStatus>) => void;
}

const statusOptions = [
    { key: 'read', label: 'Lido', icon: Book },
    { key: 'class_watched', label: 'Aula Assistida', icon: Monitor },
    { key: 'summary', label: 'Resumo Feito', icon: PenSquare },
    { key: 'law_read', label: 'Lei Seca', icon: FileText },
    { key: 'questions_done', label: 'Questões', icon: CheckSquare },
    { key: 'revised', label: 'Revisado', icon: Repeat },
] as const;


const TopicItem: React.FC<{ topic: Edital['disciplines'][0]['topics'][0], status: TopicStatus, updateTopicStatus: (topicId: string, status: Partial<TopicStatus>) => void }> = ({ topic, status, updateTopicStatus }) => {
    return (
        <div className="pl-4 py-2 border-l-2 border-neutral-700 ml-4 space-y-2">
            <p className="text-neutral-200">{topic.name}</p>
            <div className="flex flex-wrap gap-2 md:gap-4">
                {statusOptions.map(option => (
                    <label key={option.key} className="flex items-center gap-1.5 cursor-pointer text-sm text-neutral-400 hover:text-white">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-primary focus:ring-primary"
                            checked={status[option.key]}
                            onChange={(e) => updateTopicStatus(topic.id, { [option.key]: e.target.checked })}
                        />
                         <option.icon className="h-4 w-4" />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};


export const EditalView: React.FC<EditalViewProps> = ({ edital, topicStatus, updateTopicStatus }) => {
    const [openDisciplines, setOpenDisciplines] = useState<Set<string>>(new Set([edital.disciplines[0]?.id]));

    const toggleDiscipline = (id: string) => {
        setOpenDisciplines(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    return (
        <div className="bg-neutral-800/50 rounded-xl p-4 md:p-6 shadow-lg border border-neutral-700/50">
            <h2 className="text-2xl font-bold mb-4 text-white">{edital.name}</h2>
            <div className="space-y-2">
                {edital.disciplines.map(discipline => {
                    const isOpen = openDisciplines.has(discipline.id);
                    const totalTopics = discipline.topics.length;
                    const completedTopics = discipline.topics.filter(t => topicStatus[t.id] && !topicStatus[t.id].pending).length;
                    const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
                    
                    return (
                        <div key={discipline.id} className="bg-neutral-800 rounded-lg">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer"
                                onClick={() => toggleDiscipline(discipline.id)}
                            >
                                <div className="flex items-center gap-3">
                                    {isOpen ? <ChevronDown className="h-5 w-5"/> : <ChevronRight className="h-5 w-5"/>}
                                    <h3 className="font-semibold text-lg">{discipline.name}</h3>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-neutral-400">{completedTopics}/{totalTopics}</span>
                                    <div className="w-32 h-2.5 bg-neutral-700 rounded-full">
                                        <div className="h-2.5 bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            {isOpen && (
                                <div className="px-4 pb-4">
                                    {discipline.topics.map(topic => (
                                        <TopicItem key={topic.id} topic={topic} status={topicStatus[topic.id]} updateTopicStatus={updateTopicStatus} />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};