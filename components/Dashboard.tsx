
import React, { useMemo } from 'react';
import type { Edital, StudyData } from '../types.ts';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BookOpen, CheckCircle, Clock, Target, Bell } from 'lucide-react';
import { Card, CardHeader } from './common/Card.tsx';

interface DashboardProps {
    edital: Edital;
    studyData: StudyData;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export const Dashboard: React.FC<DashboardProps> = ({ edital, studyData }) => {

    const totalTopics = useMemo(() => edital.disciplines.reduce((acc, d) => acc + d.topics.length, 0), [edital]);
    
    const completedTopics = useMemo(() => {
        // FIX: Changed from Object.values to Object.keys to fix a TypeScript error where the
        // status object was being inferred as `unknown`. This approach ensures correct typing.
        return Object.keys(studyData.topicStatus).filter(topicId => !studyData.topicStatus[topicId].pending).length;
    }, [studyData.topicStatus]);

    const overallProgress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    
    const progressByDiscipline = useMemo(() => {
        return edital.disciplines.map(discipline => {
            const total = discipline.topics.length;
            if (total === 0) return { name: discipline.name, value: 0 };
            const completed = discipline.topics.filter(t => studyData.topicStatus[t.id] && !studyData.topicStatus[t.id].pending).length;
            return { name: discipline.name, value: (completed / total) * 100 };
        });
    }, [edital, studyData.topicStatus]);
    
    const totalStudyTime = useMemo(() => {
        return studyData.sessions.reduce((acc, session) => acc + session.duration, 0) / 3600; // in hours
    }, [studyData.sessions]);

    const totalQuestions = useMemo(() => {
        return studyData.questions.reduce((acc, q) => acc + q.total, 0);
    }, [studyData.questions]);

    const overallAccuracy = useMemo(() => {
        const total = studyData.questions.reduce((acc, q) => acc + q.total, 0);
        if (total === 0) return 0;
        const correct = studyData.questions.reduce((acc, q) => acc + q.correct, 0);
        return (correct / total) * 100;
    }, [studyData.questions]);

    const pendingRevisions = useMemo(() => {
        const now = new Date();
        return studyData.revisions.filter(r => !r.completed && new Date(r.dueDate) <= now);
    }, [studyData.revisions]);

    const stats = [
        { label: 'Progresso Geral', value: `${overallProgress.toFixed(1)}%`, icon: CheckCircle },
        { label: 'Horas Líquidas', value: `${totalStudyTime.toFixed(1)}h`, icon: Clock },
        { label: 'Questões Feitas', value: totalQuestions, icon: Target },
        { label: 'Revisões Pendentes', value: pendingRevisions.length, icon: Bell }
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <Card key={stat.label}>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <stat.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-neutral-400 text-sm">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader icon={BookOpen} title="Progresso por Disciplina" />
                    <div className="h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={progressByDiscipline} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
                                <Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#f8fafc' }}/>
                                <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <CardHeader icon={Target} title="Desempenho Geral" />
                     <div className="h-80 flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[{ name: 'Acertos', value: overallAccuracy }, { name: 'Erros', value: 100 - overallAccuracy }]}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    <Cell key="cell-0" fill="#10b981" />
                                    <Cell key="cell-1" fill="#ef4444" />
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}/>
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="mt-[-2rem] text-3xl font-bold">{overallAccuracy.toFixed(1)}%</p>
                        <p className="text-neutral-400">de acerto</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};