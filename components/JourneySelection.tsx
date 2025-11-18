
import React, { useState, useEffect, useMemo } from 'react';
import type { Journey, Edital, StudyData, TopicStatus, StudySessionData, QuestionLog, Law, Article } from '../types.ts';
import { Card } from './common/Card.tsx';
import { BookCopy, PlusCircle, LayoutDashboard, BookOpen, Gavel, Target, Bell, Users, ChevronDown, LogOut } from 'lucide-react';
import { supabase } from '../services/supabase.ts';
import { User } from '@supabase/supabase-js';
import { Setup } from './Setup.tsx';
import { Dashboard } from './Dashboard.tsx';
import { EditalView } from './EditalView.tsx';
import { QuestionsTracker } from './QuestionsTracker.tsx';
import { Revisions } from './Revisions.tsx';
import { Arena } from './Arena.tsx';
import { StudySession } from './StudySession.tsx';
import { LeiSeca } from './LeiSeca.tsx';
// FIX: Corrected module path to use a relative reference for the Logo component.
import { Logo } from './common/Logo.tsx';

type View = 'dashboard' | 'edital' | 'questions' | 'revisions' | 'arena' | 'study' | 'lei-seca';

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
        const newSessions = [...studyData.sessions, session];
        const newRevisions = [...studyData.revisions];
        
        const now = new Date();
        newRevisions.push({ id: `rev1-${session.id}`, topicId: session.topicId, dueDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), completed: false });
        newRevisions.push({ id: `rev7-${session.id}`, topicId: session.topicId, dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), completed: false });
        newRevisions.push({ id: `rev30-${session.id}`, topicId: session.topicId, dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), completed: false });

        updateJourneyData({ sessions: newSessions, revisions: newRevisions });
    };

    const addQuestionLog = (log: QuestionLog) => {
        const { studyData } = activeJourney;
        const newLogs = [...studyData.questions, log];
        updateJourneyData({ questions: newLogs });
    };

    const updateTopicStatus = (topicId: string, status: Partial<TopicStatus>) => {
        const { studyData } = activeJourney;
        const newTopicStatus = {
            ...studyData.topicStatus,
            [topicId]: { ...studyData.topicStatus[topicId], ...status, pending: false }
        };
        updateJourneyData({ topicStatus: newTopicStatus });
    };

    const addLaw = (law: Law) => {
        const { studyData } = activeJourney;
        const newLaws = [...studyData.laws, law];
        updateJourneyData({ laws: newLaws });
    };

    const updateArticleStatus = (lawId: string, articleId: string, read: boolean) => {
        const { studyData } = activeJourney;
        const newLaws = studyData.laws.map(law => {
            if (law.id === lawId) {
                return {
                    ...law,
                    articles: law.articles.map(article => 
                        article.id === articleId ? { ...article, read } : article
                    ),
                };
            }
            return law;
        });
        updateJourneyData({ laws: newLaws });
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'edital', label: 'Edital', icon: BookOpen },
        { id: 'lei-seca', label: 'Lei Seca', icon: Gavel },
        { id: 'questions', label: 'Questões', icon: Target },
        { id: 'revisions', label: 'Revisões', icon: Bell },
        { id: 'arena', label: 'Arena', icon: Users },
    ];

    const renderView = () => {
        const { edital, studyData } = activeJourney;
        switch (view) {
            case 'dashboard': return <Dashboard edital={edital} studyData={studyData} />;
            case 'edital': return <EditalView edital={edital} topicStatus={studyData.topicStatus} updateTopicStatus={updateTopicStatus} />;
            case 'lei-seca': return <LeiSeca laws={studyData.laws} onAddLaw={addLaw} onUpdateArticle={updateArticleStatus} />;
            case 'questions': return <QuestionsTracker studyData={studyData} addQuestionLog={addQuestionLog} edital={edital} />;
            case 'revisions': return <Revisions studyData={studyData} setStudyData={(updater) => {
                const newStudyData = typeof updater === 'function' ? updater(studyData) : updater;
                updateJourneyData(newStudyData);
            }} edital={edital} />;
            case 'arena': return <Arena />;
            case 'study': return <StudySession edital={edital} onSessionEnd={addStudySession} backToDashboard={() => setView('dashboard')} />;
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
                                <p className="text-xs text-neutral-400 text-left">Policial Rodoviário</p>
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

const JourneyCard: React.FC<{ journey: Journey; onSelect: () => void; }> = ({ journey, onSelect }) => {
    const totalTopics = journey.edital.disciplines.reduce((acc, d) => acc + d.topics.length, 0);
    const completedTopics = Object.keys(journey.studyData.topicStatus).filter(topicId => !journey.studyData.topicStatus[topicId].pending).length;
    const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

    return (
        <Card className="hover:border-primary transition-all cursor-pointer" onClick={onSelect}>
            <h3 className="text-xl font-bold text-white mb-2">{journey.edital.name}</h3>
            <p className="text-neutral-400 text-sm mb-4">Progresso: {completedTopics} de {totalTopics} tópicos</p>
            <div className="w-full h-2.5 bg-neutral-700 rounded-full">
                <div className="h-2.5 bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
             <p className="text-right text-sm font-semibold mt-1">{progress.toFixed(1)}%</p>
        </Card>
    );
};

interface JourneySelectionProps {
    user: User;
}

export const JourneySelection: React.FC<JourneySelectionProps> = ({ user }) => {
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [activeJourneyId, setActiveJourneyId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSetupMode, setIsSetupMode] = useState(false);

    useEffect(() => {
        const fetchJourneys = async () => {
            const { data, error } = await supabase.from('journeys').select('*');
            if (error) {
                console.error("Error fetching journeys:", error);
            } else {
                const fetchedJourneys = data.map(item => ({
                    id: item.id,
                    edital: item.edital as Edital,
                    studyData: item.study_data as StudyData,
                }));
                setJourneys(fetchedJourneys);
                if (fetchedJourneys.length === 0) {
                    setIsSetupMode(true);
                }
            }
            setIsLoading(false);
        };
        fetchJourneys();
    }, []);

    const handleJourneyCreated = (journey: Journey) => {
        setJourneys(prev => [...prev, journey]);
        setActiveJourneyId(journey.id);
        setIsSetupMode(false);
    };

    const updateActiveJourney = (updatedJourney: Journey) => {
        setJourneys(prev => prev.map(j => j.id === updatedJourney.id ? updatedJourney : j));
    };

    const activeJourney = useMemo(() => {
        return journeys.find(j => j.id === activeJourneyId) || null;
    }, [journeys, activeJourneyId]);

    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center bg-neutral-900"><p>Carregando jornadas...</p></div>
    }

    if (isSetupMode) {
        return <Setup onJourneyCreated={handleJourneyCreated} userId={user.id} />;
    }

    if (activeJourney) {
        return <MainAppLayout
            journeys={journeys}
            activeJourney={activeJourney}
            setActiveJourneyId={setActiveJourneyId}
            onStartNewJourney={() => { setActiveJourneyId(null); setIsSetupMode(true); }}
            updateActiveJourney={updateActiveJourney}
            user={user}
        />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
            <div className="w-full max-w-4xl text-center">
                <BookCopy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Minhas Jornadas</h1>
                <p className="text-neutral-400 mb-8">Selecione um plano de estudos para continuar ou crie um novo.</p>
                
                <div className="space-y-6">
                    {journeys.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {journeys.map(journey => (
                                <JourneyCard key={journey.id} journey={journey} onSelect={() => setActiveJourneyId(journey.id)} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-neutral-500 py-8">Você ainda não tem nenhuma jornada. Que tal começar uma agora?</p>
                    )}

                    <button 
                        onClick={() => setIsSetupMode(true)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-transform"
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span>Iniciar Nova Jornada</span>
                    </button>
                </div>
            </div>
        </div>
    );
};