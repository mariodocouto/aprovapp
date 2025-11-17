'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { Discipline, Topic, StudyType } from '@/lib/types';

interface StudyTimerProps {
  disciplines: Discipline[];
  onComplete: (data: {
    disciplineId: string;
    topicId: string;
    type: StudyType;
    duration: number;
  }) => void;
}

const STUDY_TYPES: { value: StudyType; label: string }[] = [
  { value: 'teoria', label: 'Teoria' },
  { value: 'lei-seca', label: 'Lei Seca' },
  { value: 'questoes', label: 'Questões' },
  { value: 'pdf', label: 'PDF/Apostila' },
  { value: 'video-aula', label: 'Vídeo-aula' },
  { value: 'revisao', label: 'Revisão' },
  { value: 'resumo', label: 'Resumo' },
  { value: 'flashcards', label: 'Flashcards' },
];

export default function StudyTimer({ disciplines, onComplete }: StudyTimerProps) {
  const [step, setStep] = useState<'select' | 'timer' | 'complete'>('select');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedType, setSelectedType] = useState<StudyType>('teoria');
  
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const selectedDisciplineData = disciplines.find(d => d.id === selectedDiscipline);
  const availableTopics = selectedDisciplineData?.topics || [];

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!selectedDiscipline || !selectedTopic || !selectedType) {
      alert('Por favor, selecione disciplina, assunto e tipo de estudo');
      return;
    }
    setStep('timer');
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    if (seconds < 60) {
      alert('Estudo muito curto! Continue por pelo menos 1 minuto.');
      return;
    }

    setIsRunning(false);
    setStep('complete');
    
    onComplete({
      disciplineId: selectedDiscipline,
      topicId: selectedTopic,
      type: selectedType,
      duration: Math.floor(seconds / 60),
    });
  };

  const handleReset = () => {
    setStep('select');
    setSelectedDiscipline('');
    setSelectedTopic('');
    setSelectedType('teoria');
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
  };

  if (step === 'complete') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Estudo Concluído!
          </h2>
          
          <div className="mb-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {formatTime(seconds)}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {Math.floor(seconds / 60)} minutos de estudo registrados
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6 text-left">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Disciplina:</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedDisciplineData?.name}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Assunto:</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {availableTopics.find(t => t.id === selectedTopic)?.name}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tipo:</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {STUDY_TYPES.find(t => t.value === selectedType)?.label}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Novo Estudo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'timer') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
          {/* Info Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Disciplina</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedDisciplineData?.name}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Assunto</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {availableTopics.find(t => t.id === selectedTopic)?.name}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Tipo</span>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {STUDY_TYPES.find(t => t.value === selectedType)?.label}
                </p>
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 relative">
              <div className="absolute inset-4 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <div>
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatTime(seconds)}
                  </div>
                </div>
              </div>
            </div>

            {isPaused && (
              <div className="mb-4">
                <span className="px-4 py-2 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-full text-sm font-medium">
                  Pausado
                </span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={handlePause}
              className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              {isPaused ? (
                <>
                  <Play className="w-5 h-5" />
                  Retomar
                </>
              ) : (
                <>
                  <Pause className="w-5 h-5" />
                  Pausar
                </>
              )}
            </button>
            <button
              onClick={handleStop}
              className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Square className="w-5 h-5" />
              Finalizar
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {Math.floor(seconds / 60)} minutos estudados
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Iniciar Estudo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure seu estudo antes de começar
          </p>
        </div>

        <div className="space-y-6">
          {/* Discipline Selection */}
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

          {/* Topic Selection */}
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

          {/* Study Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tipo de Estudo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STUDY_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    selectedType === type.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!selectedDiscipline || !selectedTopic}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Iniciar Cronômetro
          </button>
        </div>
      </div>
    </div>
  );
}
