'use client';

import { useState } from 'react';
import { Brain, Plus, CheckCircle2, XCircle, TrendingUp, Calendar, Target, BarChart3 } from 'lucide-react';
import { Discipline } from '@/lib/types';

interface QuestionsManagerProps {
  disciplines: Discipline[];
  onAddQuestion: (data: {
    disciplineId: string;
    topicId: string;
    isCorrect: boolean;
    difficulty?: 'facil' | 'medio' | 'dificil';
  }) => void;
}

export default function QuestionsManager({ disciplines, onAddQuestion }: QuestionsManagerProps) {
  const [mode, setMode] = useState<'manual' | 'assisted'>('manual');
  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);

  // Mock statistics
  const stats = {
    total: 1847,
    correct: 1352,
    percentage: 73.2,
    weeklyImprovement: 5.3,
    byDiscipline: disciplines.map(d => ({
      name: d.name,
      total: Math.floor(Math.random() * 500) + 100,
      correct: Math.floor(Math.random() * 400) + 50,
    })),
  };

  const selectedDisciplineData = disciplines.find(d => d.id === selectedDiscipline);
  const availableTopics = selectedDisciplineData?.topics || [];

  const handleSubmitManual = () => {
    if (!selectedDiscipline || !selectedTopic || questionCount < 1) {
      alert('Preencha todos os campos');
      return;
    }

    for (let i = 0; i < questionCount; i++) {
      onAddQuestion({
        disciplineId: selectedDiscipline,
        topicId: selectedTopic,
        isCorrect: i < correctCount,
      });
    }

    // Reset form
    setQuestionCount(1);
    setCorrectCount(0);
    alert(`${questionCount} questões registradas com sucesso!`);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Modo de Registro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setMode('manual')}
            className={`p-6 rounded-xl border-2 transition-all ${
              mode === 'manual'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                mode === 'manual'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                <Plus className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Modo A - Registro Manual
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Registre questões que você resolveu em outros sites ou materiais
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode('assisted')}
            className={`p-6 rounded-xl border-2 transition-all ${
              mode === 'assisted'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${
                mode === 'assisted'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                <Brain className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  Modo B - Questões Propostas
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  O app busca e propõe questões automaticamente para você resolver
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total de Questões</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.correct}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Acertos</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.percentage}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Taxa de Acerto</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">
              +{stats.weeklyImprovement}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Melhora Semanal</p>
        </div>
      </div>

      {/* Manual Mode Form */}
      {mode === 'manual' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
            Registrar Questões
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Disciplina
              </label>
              <select
                value={selectedDiscipline}
                onChange={(e) => {
                  setSelectedDiscipline(e.target.value);
                  setSelectedTopic('');
                }}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              >
                <option value="">Selecione uma disciplina</option>
                {disciplines.map((discipline) => (
                  <option key={discipline.id} value={discipline.id}>
                    {discipline.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Assunto
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                disabled={!selectedDiscipline}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Selecione um assunto</option>
                {availableTopics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Quantidade de Questões
                </label>
                <input
                  type="number"
                  min="1"
                  value={questionCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setQuestionCount(val);
                    if (correctCount > val) setCorrectCount(val);
                  }}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Questões Corretas
                </label>
                <input
                  type="number"
                  min="0"
                  max={questionCount}
                  value={correctCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setCorrectCount(Math.min(val, questionCount));
                  }}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {questionCount > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Taxa de Acerto
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {Math.round((correctCount / questionCount) * 100)}%
                  </span>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(correctCount / questionCount) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleSubmitManual}
              disabled={!selectedDiscipline || !selectedTopic || questionCount < 1}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Registrar Questões
            </button>
          </div>
        </div>
      )}

      {/* Assisted Mode (Coming Soon) */}
      {mode === 'assisted' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questões Propostas por IA
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Em breve você poderá resolver questões diretamente no app, com busca automática nos principais sites de questões
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Em desenvolvimento
          </div>
        </div>
      )}

      {/* Performance by Discipline */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          Desempenho por Disciplina
        </h3>
        <div className="space-y-4">
          {stats.byDiscipline.map((disc, index) => {
            const percentage = Math.round((disc.correct / disc.total) * 100);
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {disc.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {disc.correct}/{disc.total}
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      percentage >= 70 
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : percentage >= 50
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
