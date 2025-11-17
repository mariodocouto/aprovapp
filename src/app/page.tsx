'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  Calendar,
  AlertCircle,
  Play,
  BarChart3,
  CheckCircle2,
  Timer,
  Brain,
  Users,
  FileText,
  Scale,
  Zap
} from 'lucide-react';
import { MOCK_DASHBOARD_STATS, MOCK_DISCIPLINES, MOCK_REVISIONS } from '@/lib/mock-data';
import { Contest, ItemStatus, StudyType } from '@/lib/types';
import ContestSelector from '@/components/onboarding/contest-selector';
import StudyTimer from '@/components/study/study-timer';
import EditalView from '@/components/edital/edital-view';
import QuestionsManager from '@/components/questions/questions-manager';
import ArenaView from '@/components/arena/arena-view';

export default function AprovAppPage() {
  const [hasSelectedContest, setHasSelectedContest] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [selectedView, setSelectedView] = useState<'dashboard' | 'study' | 'edital' | 'questions' | 'laws' | 'revisions' | 'arena'>('dashboard');
  const [disciplines, setDisciplines] = useState(MOCK_DISCIPLINES);
  
  const stats = MOCK_DASHBOARD_STATS;
  const pendingRevisions = MOCK_REVISIONS.filter(r => !r.completed);

  const handleSelectContest = (contest: Contest) => {
    setSelectedContest(contest);
    setHasSelectedContest(true);
  };

  const handleCompleteStudy = (data: {
    disciplineId: string;
    topicId: string;
    type: StudyType;
    duration: number;
  }) => {
    console.log('Estudo concluído:', data);
    // Aqui você atualizaria o estado global/banco de dados
    setSelectedView('dashboard');
  };

  const handleUpdateTopicStatus = (topicId: string, status: ItemStatus) => {
    setDisciplines(disciplines.map(discipline => ({
      ...discipline,
      topics: discipline.topics.map(topic =>
        topic.id === topicId ? { ...topic, status } : topic
      )
    })));
  };

  const handleEditTopic = (topicId: string, newName: string) => {
    setDisciplines(disciplines.map(discipline => ({
      ...discipline,
      topics: discipline.topics.map(topic =>
        topic.id === topicId ? { ...topic, name: newName } : topic
      )
    })));
  };

  const handleAddTopic = (disciplineId: string, topicName: string) => {
    setDisciplines(disciplines.map(discipline => {
      if (discipline.id === disciplineId) {
        const newTopic = {
          id: `${disciplineId}-${Date.now()}`,
          name: topicName,
          disciplineId,
          status: 'pendente' as ItemStatus,
          progress: 0,
        };
        return {
          ...discipline,
          topics: [...discipline.topics, newTopic]
        };
      }
      return discipline;
    }));
  };

  const handleRemoveTopic = (topicId: string) => {
    if (confirm('Tem certeza que deseja remover este tópico?')) {
      setDisciplines(disciplines.map(discipline => ({
        ...discipline,
        topics: discipline.topics.filter(topic => topic.id !== topicId)
      })));
    }
  };

  const handleAddQuestion = (data: {
    disciplineId: string;
    topicId: string;
    isCorrect: boolean;
    difficulty?: 'facil' | 'medio' | 'dificil';
  }) => {
    console.log('Questão adicionada:', data);
    // Aqui você atualizaria o estado global/banco de dados
  };

  // Show contest selector if no contest selected
  if (!hasSelectedContest) {
    return <ContestSelector onSelectContest={handleSelectContest} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AprovApp
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {selectedContest?.name || 'TJ-SP - Escrevente'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedView('study')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar Estudo</span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'study', label: 'Estudar', icon: BookOpen },
              { id: 'edital', label: 'Edital', icon: FileText },
              { id: 'questions', label: 'Questões', icon: Brain },
              { id: 'laws', label: 'Lei Seca', icon: Scale },
              { id: 'revisions', label: 'Revisões', icon: Calendar },
              { id: 'arena', label: 'Arena', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedView(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    selectedView === item.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'study' && (
          <StudyTimer 
            disciplines={disciplines}
            onComplete={handleCompleteStudy}
          />
        )}

        {selectedView === 'edital' && (
          <EditalView
            disciplines={disciplines}
            onUpdateStatus={handleUpdateTopicStatus}
            onEditTopic={handleEditTopic}
            onAddTopic={handleAddTopic}
            onRemoveTopic={handleRemoveTopic}
          />
        )}

        {selectedView === 'questions' && (
          <QuestionsManager
            disciplines={disciplines}
            onAddQuestion={handleAddQuestion}
          />
        )}

        {selectedView === 'arena' && (
          <ArenaView />
        )}

        {selectedView === 'laws' && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Lei Seca
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Estude leis artigo por artigo com controle de progresso e revisões automáticas
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              <Calendar className="w-4 h-4" />
              Em desenvolvimento
            </div>
          </div>
        )}

        {selectedView === 'revisions' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Revisões Inteligentes</h2>
                  <p className="text-orange-100">Sistema de Repetição Espaçada (SRS)</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{stats.pendingRevisions}</div>
                  <div className="text-sm text-orange-100">Pendentes</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['24h', '7d', '30d'].map((interval) => {
                const count = pendingRevisions.filter(r => r.interval === interval).length;
                return (
                  <div key={interval} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Revisão {interval === '24h' ? '24 horas' : interval === '7d' ? '7 dias' : '30 dias'}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        interval === '24h'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : interval === '7d'
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {count}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {count === 0 ? 'Nenhuma revisão pendente' : `${count} tópico${count > 1 ? 's' : ''} para revisar`}
                    </p>
                    <button 
                      disabled={count === 0}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Revisar Agora
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Próximas Revisões
              </h3>
              <div className="space-y-3">
                {pendingRevisions.slice(0, 8).map((revision) => {
                  const topic = disciplines
                    .flatMap(d => d.topics)
                    .find(t => t.id === revision.topicId);
                  const discipline = disciplines.find(d => d.id === topic?.disciplineId);
                  
                  return (
                    <div key={revision.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {topic?.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {discipline?.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          revision.interval === '24h'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : revision.interval === '7d'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {revision.interval === '24h' ? '24h' : revision.interval === '7d' ? '7d' : '30d'}
                        </div>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-gray-400 hover:text-green-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudyHours}h</span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Horas Estudadas</h3>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(stats.dailyProgress / stats.dailyGoal) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{stats.dailyProgress}/{stats.dailyGoal}h hoje</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Questões Resolvidas</h3>
                <div className="mt-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">{stats.correctAnswersPercentage}% de acertos</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.editalProgress}%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Progresso do Edital</h3>
                <div className="mt-2">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${stats.editalProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingRevisions}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Revisões Pendentes</h3>
                {stats.overdueTopics > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">{stats.overdueTopics} atrasadas</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Disciplines Progress */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Progresso por Disciplina</h2>
                  <button 
                    onClick={() => setSelectedView('edital')}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Ver todas
                  </button>
                </div>
                
                <div className="space-y-4">
                  {disciplines.map((discipline) => (
                    <div key={discipline.id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{discipline.name}</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{discipline.progress}%</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500 group-hover:shadow-lg"
                          style={{ width: `${discipline.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{discipline.topics.filter(t => t.status !== 'pendente').length}/{discipline.topics.length} tópicos</span>
                        <span>•</span>
                        <span>Peso: {discipline.weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Revisions */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revisões Hoje</h2>
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  {pendingRevisions.slice(0, 5).map((revision) => {
                    const topic = disciplines
                      .flatMap(d => d.topics)
                      .find(t => t.id === revision.topicId);
                    const discipline = disciplines.find(d => d.id === topic?.disciplineId);
                    
                    return (
                      <div key={revision.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                              {topic?.name}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{discipline?.name}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                revision.interval === '24h' 
                                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                  : revision.interval === '7d'
                                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}>
                                {revision.interval === '24h' ? '24 horas' : revision.interval === '7d' ? '7 dias' : '30 dias'}
                              </div>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button 
                  onClick={() => setSelectedView('revisions')}
                  className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105"
                >
                  Ver Todas as Revisões
                </button>
              </div>
            </div>

            {/* Weekly Performance Chart */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Desempenho Semanal</h2>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">+12% vs semana anterior</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                  const hours = [1.5, 3.2, 4.5, 2.8, 5.1, 3.7, 2.5][index];
                  const maxHours = 6;
                  const percentage = (hours / maxHours) * 100;
                  
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-end p-2 mb-2 relative overflow-hidden group">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded transition-all duration-500 group-hover:shadow-lg"
                          style={{ height: `${percentage}%` }}
                        />
                        <span className="absolute top-2 left-0 right-0 text-center text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {hours}h
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Meta Semanal</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stats.weeklyProgress}h de {stats.weeklyGoal}h</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Timer, label: 'Cronômetro', color: 'from-blue-500 to-blue-600', action: 'Iniciar estudo', view: 'study' },
                { icon: Brain, label: 'Resolver Questões', color: 'from-purple-500 to-purple-600', action: 'Praticar agora', view: 'questions' },
                { icon: Scale, label: 'Lei Seca', color: 'from-green-500 to-green-600', action: 'Continuar leitura', view: 'laws' },
                { icon: Users, label: 'Arena', color: 'from-orange-500 to-orange-600', action: 'Ver ranking', view: 'arena' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => setSelectedView(item.view as any)}
                    className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all hover:scale-105 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.label}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.action}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
