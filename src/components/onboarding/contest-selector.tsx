'use client';

import { useState } from 'react';
import { Search, Upload, BookOpen, Shield, Briefcase, Calculator, Scale, Heart, Users, ChevronRight } from 'lucide-react';
import { MOCK_CONTESTS, CONTEST_CATEGORIES } from '@/lib/mock-data';
import { Contest } from '@/lib/types';

interface ContestSelectorProps {
  onSelectContest: (contest: Contest) => void;
}

export default function ContestSelector({ onSelectContest }: ContestSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'categories' | 'contests' | 'upload'>('categories');

  const iconMap: { [key: string]: any } = {
    Shield,
    Briefcase,
    Calculator,
    Scale,
    Heart,
    Users,
  };

  const filteredContests = MOCK_CONTESTS.filter(contest => {
    const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || contest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openContests = filteredContests.filter(c => c.status === 'aberto');
  const upcomingContests = filteredContests.filter(c => c.status === 'previsto');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AprovApp
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Escolha seu concurso e comece sua jornada de aprovação
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setView('categories')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                view === 'categories'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Por Área
            </button>
            <button
              onClick={() => setView('contests')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                view === 'contests'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Todos os Concursos
            </button>
            <button
              onClick={() => setView('upload')}
              className={`flex-1 py-4 px-6 font-medium transition-all ${
                view === 'upload'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              Enviar Edital
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {view === 'categories' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Escolha sua área de interesse
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONTEST_CATEGORIES.map((category) => {
                    const Icon = iconMap[category.icon];
                    const categoryContests = MOCK_CONTESTS.filter(c => c.category === category.name);
                    const openCount = categoryContests.filter(c => c.status === 'aberto').length;

                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setView('contests');
                        }}
                        className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl hover:shadow-xl transition-all hover:scale-105 border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {categoryContests.length} concursos disponíveis
                          {openCount > 0 && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {openCount} aberto{openCount > 1 ? 's' : ''}
                            </span>
                          )}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {view === 'contests' && (
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar concurso..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                  />
                </div>

                {selectedCategory && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Filtrando por:</span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                      {selectedCategory}
                    </span>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Limpar
                    </button>
                  </div>
                )}

                {/* Open Contests */}
                {openContests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Editais Abertos
                    </h3>
                    <div className="space-y-3">
                      {openContests.map((contest) => (
                        <button
                          key={contest.id}
                          onClick={() => onSelectContest(contest)}
                          className="w-full p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] border border-green-200 dark:border-green-800 text-left group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {contest.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {contest.organization}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                                  Edital Aberto
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {contest.category}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Contests */}
                {upcomingContests.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                      Concursos Previstos
                    </h3>
                    <div className="space-y-3">
                      {upcomingContests.map((contest) => (
                        <button
                          key={contest.id}
                          onClick={() => onSelectContest(contest)}
                          className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-all hover:scale-[1.02] border border-gray-200 dark:border-gray-700 text-left group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {contest.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {contest.organization}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-medium">
                                  Previsto
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {contest.category}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredContests.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      Nenhum concurso encontrado
                    </p>
                  </div>
                )}
              </div>
            )}

            {view === 'upload' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mb-4">
                    <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Envie seu Edital
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Faça upload do PDF do edital e deixe a IA criar seu plano de estudos personalizado
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Arraste o arquivo PDF aqui ou clique para selecionar
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Formatos aceitos: PDF (máx. 10MB)
                  </p>
                  <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105">
                    Selecionar Arquivo
                  </button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    O que acontece depois?
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                      <span>A IA identifica automaticamente o conteúdo programático</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                      <span>Separa por disciplinas e cria subtópicos organizados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
                      <span>Monta seu dashboard personalizado pronto para usar</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
