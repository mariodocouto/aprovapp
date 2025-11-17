'use client';

import { useState } from 'react';
import { Users, Plus, Trophy, TrendingUp, Crown, Medal, Target, Clock, Brain, Award } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: number;
  myRank: number;
  category: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  trend: 'up' | 'down' | 'same';
}

const COMPETITION_MODES = [
  { id: 'horas-totais', label: 'Horas Totais', icon: Clock },
  { id: 'horas-semanais', label: 'Horas Semanais', icon: Target },
  { id: 'questoes', label: 'Questões Resolvidas', icon: Brain },
  { id: 'percentual-edital', label: '% do Edital', icon: Trophy },
  { id: 'acertos', label: '% de Acertos', icon: Award },
];

export default function ArenaView() {
  const [view, setView] = useState<'overview' | 'create' | 'group'>('overview');
  const [selectedModes, setSelectedModes] = useState<string[]>(['horas-totais']);
  const [isPublic, setIsPublic] = useState(false);

  // Mock data
  const myGroups: Group[] = [
    { id: '1', name: 'Rumo ao TJ-SP 2024', members: 47, myRank: 12, category: 'TJ-SP' },
    { id: '2', name: 'Guerreiros do Direito', members: 23, myRank: 5, category: 'Geral' },
    { id: '3', name: 'Madrugada de Estudos', members: 15, myRank: 3, category: 'Geral' },
  ];

  const globalLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Ana Silva', avatar: 'AS', score: 287.5, trend: 'up' },
    { rank: 2, name: 'Carlos Mendes', avatar: 'CM', score: 265.3, trend: 'same' },
    { rank: 3, name: 'Beatriz Costa', avatar: 'BC', score: 251.8, trend: 'up' },
    { rank: 4, name: 'Diego Santos', avatar: 'DS', score: 248.2, trend: 'down' },
    { rank: 5, name: 'Elena Rodrigues', avatar: 'ER', score: 242.7, trend: 'up' },
  ];

  const toggleMode = (modeId: string) => {
    if (selectedModes.includes(modeId)) {
      setSelectedModes(selectedModes.filter(m => m !== modeId));
    } else {
      setSelectedModes([...selectedModes, modeId]);
    }
  };

  if (view === 'create') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Criar Comunidade
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Monte seu grupo e convide amigos para competir
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Nome da Comunidade
              </label>
              <input
                type="text"
                placeholder="Ex: Rumo ao TJ-SP 2024"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Descrição (opcional)
              </label>
              <textarea
                placeholder="Descreva o objetivo do grupo..."
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Modalidades de Competição
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPETITION_MODES.map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = selectedModes.includes(mode.id);
                  return (
                    <button
                      key={mode.id}
                      onClick={() => toggleMode(mode.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`font-medium ${
                          isSelected
                            ? 'text-purple-700 dark:text-purple-400'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {mode.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Membros poderão escolher em quais modalidades querem competir
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setView('overview')}
                className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                disabled={selectedModes.length === 0}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Criar Comunidade
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Privacy Toggle */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Arena</h2>
            <p className="text-purple-100">Compete com amigos e a comunidade</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPublic(!isPublic)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                isPublic
                  ? 'bg-white text-purple-600'
                  : 'bg-purple-500/50 text-white hover:bg-purple-500'
              }`}
            >
              {isPublic ? 'Público' : 'Privado'}
            </button>
            <button
              onClick={() => setView('create')}
              className="px-4 py-2 bg-white text-purple-600 rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Comunidade
            </button>
          </div>
        </div>
        {isPublic && (
          <div className="bg-white/20 rounded-xl p-3 text-sm">
            ✨ Seus resultados estão visíveis para toda a comunidade
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Groups */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Minhas Comunidades
          </h3>
          {myGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {group.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {group.members} membros • {group.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    #{group.myRank}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Sua posição</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {group.myRank <= 3 && (
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    group.myRank === 1
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : group.myRank === 2
                      ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                  }`}>
                    {group.myRank === 1 ? '🥇' : group.myRank === 2 ? '🥈' : '🥉'} Top {group.myRank}
                  </div>
                )}
                <button className="ml-auto px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  Ver Ranking
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Leaderboard */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Ranking Global
            </h3>
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>

          <div className="space-y-3">
            {globalLeaderboard.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                  entry.rank === 1
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : entry.rank === 2
                    ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    : entry.rank === 3
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {entry.rank}
                </div>

                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {entry.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                    {entry.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.score}h estudadas
                  </p>
                </div>

                {entry.trend === 'up' && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all hover:scale-105">
            Ver Ranking Completo
          </button>
        </div>
      </div>

      {/* Competition Modes Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Suas Estatísticas Competitivas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {COMPETITION_MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <div key={mode.id} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {mode.id === 'horas-totais' ? '127.5' : mode.id === 'questoes' ? '1847' : '73%'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {mode.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
