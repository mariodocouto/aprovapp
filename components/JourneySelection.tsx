
import React, { useState, useEffect, useMemo } from 'react';
import type { Journey, Edital, StudyData, TopicStatus, StudySessionData, QuestionLog } from '../types.ts';
import { Card } from './common/Card.tsx';
import { BookCopy, PlusCircle, LayoutDashboard, BookOpen, Target, Bell, Users, ChevronDown, LogOut } from 'lucide-react';
import { supabase } from '../services/supabase.ts';
import { User } from '@supabase/supabase-js';
import { Setup } from './Setup.tsx';
import { Dashboard } from './Dashboard.tsx';
import { EditalView } from './EditalView.tsx';
import { QuestionsTracker } from './QuestionsTracker.tsx';
import { Revisions } from './Revisions.tsx';
import { Arena } from './Arena.tsx';
import { StudySession } from './StudySession.tsx';
import { Logo } from './common/Logo.tsx';

type View = 'dashboard' | 'edital' | 'questions' | 'revisions' | 'arena' | 'study';

const MainAppLayout: React.FC<{
    journeys: Journey[];
    activeJourney: Journey;
    setActiveJourneyId: (id: string | null) => void;
    onStartNewJourney: () => void;
    updateActiveJourney: (updatedJourney: Journey) => void;
    user: User;
}> = ({ journeys, activeJourney, setActiveJourneyId, onStartNewJourney, updateActiveJourney, user }) => {
    const [view, setView] = useState<View>('dashboard');

    const updateJourneyData = async (updatedData: Partial<StudyData>) => {
        const newStudyData = { ...activeJourney.studyData, ...updatedData };
        const { data, error } = await supabase
            .from('journeys')
            .update({ study_data: newStudyData })
            .eq('id', activeJourney.id)
            .select()
            .single();

        if (error) {
            console.error("Error updating journey:", error);
            return;
        }
        if (data) {
            const updatedJourney: Journey = { ...activeJourney, studyData: data.study_data as StudyData };
            updateActiveJourney(updatedJourney);
        }
    };

    const addStudySession = (session: StudySessionData) => {
        const { studyData } = activeJourney;
        
        // 1. Salva o registro de tempo (Histórico)
        const newSessions = [...studyData.sessions, session];

        // 2. Atualiza o status do tópico no Edital (Marca o Checkbox correspondente)
        let statusKey: keyof TopicStatus | null = null;
        // Mapeia o tipo de estudo do cronômetro para o status do edital
        if (session.type === 'pdf' || session.type === 'theory') statusKey = 'pdf';
        else if (session.type === 'video') statusKey = 'video';
        else if (session.type === 'law') statusKey = 'law';
        else if (session.type === 'questions') statusKey = 'questions';
        else if (session.type === 'summary') statusKey = 'summary';

        let newTopicStatus = { ...studyData.topicStatus };

        if (statusKey) {
             newTopicStatus = {
                ...newTopicStatus,
                [session.topicId]: { 
                    ...newTopicStatus[session.topicId], 
                    [statusKey]: true, 
                    pending: false 
                }
            };
        } else {
            // Se for um tipo genérico (ex: Revisão), apenas marca como não pendente
             newTopicStatus = {
                ...newTopicStatus,
                [session.topicId]: { 
                    ...newTopicStatus[session.topicId], 
                    pending: false 
                }
            };
        }

        // 3. Gera as Revisões Futuras (Automação Inteligente)
        const now = new Date();
        const cycles = [
            { days: 1, label: '24h' },
            { days: 7, label: '7 dias' },
            { days: 14, label: '14 dias' },
            { days: 30, label: '30 dias' },
            { days: 60, label: '60 dias' },
            { days: 90, label: '90 dias' },
        ];

        const newRevisions = [...studyData.revisions];
        
        cycles.forEach(cycle => {
            const dueDate = new Date(now);
            dueDate.setDate(dueDate.getDate() + cycle.days);
            
            newRevisions.push({
                id: `rev-${session.topicId}-${cycle.days}d-${Date.now()}`,
                topicId: session.topicId,
                dueDate: dueDate,
                completed: false,
                label: cycle.label
            });
        });

        // Salva tudo no banco de dados de uma vez
        updateJourneyData({ 
            sessions: newSessions,
            topicStatus: newTopicStatus,
            revisions: newRevisions
        });
    };

    const addQuestionLog = (log: QuestionLog) => {
        const { studyData } = activeJourney;
        const newLogs = [...studyData.questions, log];
        updateJourneyData({ questions: newLogs });
    };

    // Nova lógica inteligente de registro manual
    const handleRegisterStudy = (topicId: string, methods: Partial<TopicStatus>) => {
        const { studyData } = activeJourney;
        
        // 1. Atualiza o status do tópico
        const newTopicStatus = {
            ...studyData.topicStatus,
            [topicId]: { 
                ...studyData.topicStatus[topicId], 
                ...methods, 
                pending: false 
            }
        };

        // 2. Gera as datas de revisão
        const now = new Date();
        const cycles = [
            { days: 1, label: '24h' },
            { days: 7, label: '7 dias' },
            { days: 14, label: '14 dias' },
            { days: 30, label: '30 dias' },
            { days: 60, label: '60 dias' },
            { days: 90, label: '90 dias' },
        ];

        const newRevisions = [...studyData.revisions];
        
        cycles.forEach(cycle => {
            const dueDate = new Date(now);
            dueDate.setDate(dueDate.getDate() + cycle.days);
            
            newRevisions.push({
                id: `rev-${topicId}-${cycle.days}d-${Date.now()}`,
                topicId: topicId,
                dueDate: dueDate,
                completed: false,
                label: cycle.label
            });
        });

        updateJourneyData({ 
            topicStatus: newTopicStatus,
            revisions: newRevisions
        });
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'edital', label: 'Edital', icon: BookOpen },
        { id: 'questions', label: 'Questões', icon: Target },
        { id: 'revisions', label: 'Revisões', icon: Bell },
        { id: 'arena', label: 'Arena', icon: Users },
    ];

    const renderView = () => {
        const { edital, studyData } = activeJourney;
        switch (view) {
            case 'dashboard': return <Dashboard edital={edital} studyData={studyData} />;
            case 'edital': return <EditalView edital={edital} topicStatus={studyData.topicStatus} onRegisterStudy={handleRegisterStudy} />;
            case 'questions': return <QuestionsTracker studyData={studyData} addQuestionLog={addQuestionLog} edital={edital} />;
            case 'revisions': return <Revisions studyData={studyData} setStudyData={(updater) => {
                const newStudyData = typeof updater === 'function' ? updater(studyData) : updater;
                updateJourneyData(newStudyData);
            }} edital={edital} />;
            case 'arena': return <Arena />;
            case 'study': return <StudySession edital={edital} onSessionEnd={addStudySession} backToDashboard={() => setView('dashboard')} />;
            default: return <Dashboard edital={edital} studyData={studyData} />;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-neutral-900 text-neutral-100 font-sans">
            <header className="bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 p-3 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <Logo className="h-8 w-8" />
                    <div className="group relative">
                        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-neutral-800">
                            <div>
                                <h2 className="text-md font-bold text-left">{activeJourney.edital.name}</h2>
                                <p className="text-xs text-neutral-400 text-left">Jornada de Aprovação</p>
                            </div>
                            <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        </button>
                        <div className="absolute left-0 mt-2 w-72 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                            {journeys.map(j => (
                                <a href="#" key={j.id} onClick={(e) => { e.preventDefault(); setActiveJourneyId(j.id); }} className={`block px-4 py-2 text-sm rounded-md ${j.id === activeJourney.id ? 'bg-primary text-white' : 'hover:bg-neutral-700'}`}>{j.edital.name}</a>
                            ))}
                            <div className="border-t border-neutral-700 my-1"></div>
                            <a href="#" onClick={(e) => { e.preventDefault(); setActiveJourneyId(null); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 rounded-md flex items-center gap-2"><BookCopy className="h-4 w-4" /> Gerenciar Jornadas</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onStartNewJourney(); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 rounded-md flex items-center gap-2"><PlusCircle className="h-4 w-4" /> Nova Jornada</a>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setView('study')} className="bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2 text-sm">
                        <PlusCircle size={16} /> Iniciar Estudo
                    </button>
                    <div className="group relative">
                        <button className="h-9 w-9 bg-secondary rounded-full flex items-center justify-center font-bold text-sm">
                           {user.email?.charAt(0).toUpperCase()}
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                             <a href="#" onClick={() => supabase.auth.signOut()} className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700 rounded-md flex items-center gap-2"><LogOut className="h-4 w-4"/> Sair</a>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-neutral-950/80 backdrop-blur-sm border-b border-neutral-800 px-4 flex items-center gap-2 overflow-x-auto">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id as View)}
                        className={`flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                            view === item.id
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-neutral-400 hover:text-white border-b-2 border-transparent'
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {renderView()}
            </main>
        </div>
    );
};

export const JourneySelection: React.FC<{ user: User }> = ({ user }) => {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const fetchJourneys = async () => {
            const { data, error } = await supabase
                .from('journeys')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error("Error fetching journeys:", error);
            } else if (data) {
                const parsedJourneys = data.map((j: any) => ({
                    id: j.id,
                    edital: j.edital,
                    studyData: j.study_data
                })) as Journey[];
                
                setJourneys(parsedJourneys);
                if (parsedJourneys.length > 0) {
                    setActiveJourneyId(parsedJourneys[0].id);
                } else {
                    setIsCreating(true);
                }
            }
            setLoading(false);
        };

        fetchJourneys();
    }, [user.id]);

    const handleJourneyCreated = (newJourney: Journey) => {
        setJourneys(prev => [...prev, newJourney]);
        setActiveJourneyId(newJourney.id);
        setIsCreating(false);
    };

    const activeJourney = useMemo(() => 
        journeys.find(j => j.id === activeJourneyId), 
        [journeys, activeJourneyId]
    );

    const updateActiveJourney = (updatedJourney: Journey) => {
        setJourneys(prev => prev.map(j => j.id === updatedJourney.id ? updatedJourney : j));
    };

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-neutral-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-white text-lg">Carregando seus estudos...</p>
                </div>
            </div>
        );
    }

    if (isCreating || (!activeJourney && journeys.length === 0)) {
        return (
            <Setup 
                userId={user.id} 
                onJourneyCreated={handleJourneyCreated} 
                onCancel={() => {
                     if (journeys.length > 0) {
                        setIsCreating(false);
                        setActiveJourneyId(journeys[0].id);
                    } else {
                        // Se não tem jornadas, não pode cancelar. O botão deve apenas avisar ou fazer nada.
                        // Idealmente o usuário pode fazer logout no Setup se estiver preso.
                    }
                }}
            />
        );
    }

    if (!activeJourney) {
        // Caso onde existem jornadas, mas nenhuma selecionada (ex: usuario clicou em "Gerenciar Jornadas")
        return (
            <div className="flex h-screen w-full items-center justify-center bg-neutral-900 text-white flex-col gap-6">
                <Logo className="h-16 w-16 text-primary" />
                <h1 className="text-2xl font-bold">Selecione sua Jornada</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg px-4">
                    {journeys.map(j => (
                        <button 
                            key={j.id} 
                            onClick={() => setActiveJourneyId(j.id)} 
                            className="p-6 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl transition-all text-left group"
                        >
                            <h3 className="font-bold text-lg text-neutral-200 group-hover:text-primary transition-colors">{j.edital.name}</h3>
                            <p className="text-sm text-neutral-500 mt-2">Continuar estudos</p>
                        </button>
                    ))}
                     <button 
                        onClick={() => setIsCreating(true)} 
                        className="p-6 bg-neutral-800 hover:bg-neutral-700 border border-dashed border-neutral-600 hover:border-primary rounded-xl transition-all flex flex-col items-center justify-center text-neutral-400 hover:text-primary"
                    >
                        <PlusCircle className="h-8 w-8 mb-2" />
                        <span className="font-semibold">Nova Jornada</span>
                    </button>
                </div>
                
                <button onClick={() => supabase.auth.signOut()} className="mt-8 text-neutral-500 hover:text-white flex items-center gap-2 text-sm">
                    <LogOut className="h-4 w-4" /> Sair da conta
                </button>
            </div>
        );
    }

    return (
        <MainAppLayout 
            journeys={journeys}
            activeJourney={activeJourney}
            setActiveJourneyId={setActiveJourneyId}
            onStartNewJourney={() => setIsCreating(true)}
            updateActiveJourney={updateActiveJourney}
            user={user}
        />
    );
};
