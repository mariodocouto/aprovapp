
import React, { useState } from 'react';
import type { Edital, StudyData, QuestionLog } from '../types.ts';
import { Card } from './common/Card.tsx';
import { PlusCircle, Target } from 'lucide-react';

interface QuestionsTrackerProps {
    studyData: StudyData;
    addQuestionLog: (log: QuestionLog) => void;
    edital: Edital;
}

export const QuestionsTracker: React.FC<QuestionsTrackerProps> = ({ studyData, addQuestionLog, edital }) => {
    const [disciplineId, setDisciplineId] = useState<string>(edital.disciplines[0]?.id || '');
    const [topicId, setTopicId] = useState<string>(edital.disciplines[0]?.topics[0]?.id || '');
    const [total, setTotal] = useState<number | ''>('');
    const [correct, setCorrect] = useState<number | ''>('');

    const handleDisciplineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDisciplineId = e.target.value;
        setDisciplineId(newDisciplineId);
        const firstTopicId = edital.disciplines.find(d => d.id === newDisciplineId)?.topics[0]?.id || '';
        setTopicId(firstTopicId);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (total === '' || correct === '' || total <= 0 || correct > total) {
            alert('Por favor, insira valores válidos.');
            return;
        }

        const newLog: QuestionLog = {
            id: `q-${Date.now()}`,
            disciplineId,
            topicId,
            total,
            correct,
            date: new Date()
        };

        addQuestionLog(newLog);
        
        // Reset form
        setTotal('');
        setCorrect('');
    };

    const currentTopics = edital.disciplines.find(d => d.id === disciplineId)?.topics || [];

    const history = studyData.questions.sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><PlusCircle className="text-primary"/> Registrar Questões</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="discipline" className="block text-sm font-medium text-neutral-300 mb-1">Disciplina</label>
                        <select id="discipline" value={disciplineId} onChange={handleDisciplineChange} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white">
                            {edital.disciplines.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-neutral-300 mb-1">Assunto</label>
                        <select id="topic" value={topicId} onChange={(e) => setTopicId(e.target.value)} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white">
                           {currentTopics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="total" className="block text-sm font-medium text-neutral-300 mb-1">Questões Totais</label>
                        <input type="number" id="total" value={total} onChange={e => setTotal(Number(e.target.value))} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white"/>
                    </div>
                     <div>
                        <label htmlFor="correct" className="block text-sm font-medium text-neutral-300 mb-1">Acertos</label>
                        <input type="number" id="correct" value={correct} onChange={e => setCorrect(Number(e.target.value))} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white"/>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">Adicionar Registro</button>
                </form>
            </Card>

            <Card className="lg:col-span-2">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Target className="text-primary"/> Histórico de Desempenho</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-neutral-600">
                            <tr>
                                <th className="p-2">Data</th>
                                <th className="p-2">Assunto</th>
                                <th className="p-2">Desempenho</th>
                                <th className="p-2">%</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(log => {
                                const discipline = edital.disciplines.find(d => d.id === log.disciplineId);
                                const topic = discipline?.topics.find(t => t.id === log.topicId);
                                const accuracy = (log.correct / log.total) * 100;
                                return (
                                <tr key={log.id} className="border-b border-neutral-700/50 hover:bg-neutral-800">
                                    <td className="p-2 text-sm text-neutral-400">{log.date.toLocaleDateString()}</td>
                                    <td className="p-2">{topic?.name || 'N/A'} <br/> <span className="text-xs text-neutral-500">{discipline?.name}</span></td>
                                    <td className="p-2">{log.correct} / {log.total}</td>
                                    <td className={`p-2 font-semibold ${accuracy >= 80 ? 'text-green-400' : accuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{accuracy.toFixed(1)}%</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                 </div>
            </Card>
        </div>
    );
};