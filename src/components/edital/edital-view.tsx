'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { Discipline, Topic, ItemStatus } from '@/lib/types';

interface EditalViewProps {
  disciplines: Discipline[];
  onUpdateStatus: (topicId: string, status: ItemStatus) => void;
  onEditTopic: (topicId: string, newName: string) => void;
  onAddTopic: (disciplineId: string, topicName: string) => void;
  onRemoveTopic: (topicId: string) => void;
}

const STATUS_OPTIONS: { value: ItemStatus; label: string; color: string }[] = [
  { value: 'pendente', label: 'Pendente', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' },
  { value: 'lido', label: 'Lido', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { value: 'aula-assistida', label: 'Aula Assistida', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  { value: 'resumo-feito', label: 'Resumo Feito', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { value: 'lei-seca-lida', label: 'Lei Seca Lida', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { value: 'revisado', label: 'Revisado', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  { value: 'questoes-feitas', label: 'Questões Feitas', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
];

export default function EditalView({ 
  disciplines, 
  onUpdateStatus, 
  onEditTopic, 
  onAddTopic, 
  onRemoveTopic 
}: EditalViewProps) {
  const [expandedDisciplines, setExpandedDisciplines] = useState<Set<string>>(new Set());
  const [editingTopic, setEditingTopic] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [addingToDiscipline, setAddingToDiscipline] = useState<string | null>(null);
  const [newTopicName, setNewTopicName] = useState('');

  const toggleDiscipline = (disciplineId: string) => {
    const newExpanded = new Set(expandedDisciplines);
    if (newExpanded.has(disciplineId)) {
      newExpanded.delete(disciplineId);
    } else {
      newExpanded.add(disciplineId);
    }
    setExpandedDisciplines(newExpanded);
  };

  const handleStartEdit = (topic: Topic) => {
    setEditingTopic(topic.id);
    setEditValue(topic.name);
  };

  const handleSaveEdit = (topicId: string) => {
    if (editValue.trim()) {
      onEditTopic(topicId, editValue.trim());
    }
    setEditingTopic(null);
    setEditValue('');
  };

  const handleAddTopic = (disciplineId: string) => {
    if (newTopicName.trim()) {
      onAddTopic(disciplineId, newTopicName.trim());
      setNewTopicName('');
      setAddingToDiscipline(null);
    }
  };

  const totalProgress = disciplines.reduce((sum, d) => sum + d.progress, 0) / disciplines.length;

  return (
    <div className="space-y-6">
      {/* Header with Overall Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Edital Verticalizado</h2>
            <p className="text-blue-100">Acompanhe seu progresso em cada disciplina</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{Math.round(totalProgress)}%</div>
            <div className="text-sm text-blue-100">Progresso Geral</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Disciplines List */}
      <div className="space-y-4">
        {disciplines.map((discipline) => {
          const isExpanded = expandedDisciplines.has(discipline.id);
          const completedTopics = discipline.topics.filter(t => t.status !== 'pendente').length;
          const isAdding = addingToDiscipline === discipline.id;

          return (
            <div 
              key={discipline.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              {/* Discipline Header */}
              <button
                onClick={() => toggleDiscipline(discipline.id)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {discipline.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {completedTopics}/{discipline.topics.length} tópicos • Peso: {discipline.weight}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {discipline.progress}%
                    </div>
                  </div>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${discipline.progress}%` }}
                  />
                </div>
              </button>

              {/* Topics List */}
              {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-800">
                  <div className="p-4 space-y-2">
                    {discipline.topics.map((topic) => {
                      const isEditing = editingTopic === topic.id;
                      const statusOption = STATUS_OPTIONS.find(s => s.value === topic.status);

                      return (
                        <div 
                          key={topic.id}
                          className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all"
                        >
                          <div className="flex items-start gap-3">
                            {/* Status Indicator */}
                            <div className="mt-1">
                              {topic.status === 'pendente' ? (
                                <Circle className="w-5 h-5 text-gray-400" />
                              ) : (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              )}
                            </div>

                            {/* Topic Content */}
                            <div className="flex-1 min-w-0">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onBlur={() => handleSaveEdit(topic.id)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit(topic.id);
                                    if (e.key === 'Escape') setEditingTopic(null);
                                  }}
                                  className="w-full px-3 py-1 bg-white dark:bg-gray-700 border border-purple-500 rounded-lg focus:outline-none text-gray-900 dark:text-white"
                                  autoFocus
                                />
                              ) : (
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                  {topic.name}
                                </h4>
                              )}

                              {/* Status Selector */}
                              <div className="flex flex-wrap gap-2">
                                {STATUS_OPTIONS.map((status) => (
                                  <button
                                    key={status.value}
                                    onClick={() => onUpdateStatus(topic.id, status.value)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                      topic.status === status.value
                                        ? status.color
                                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                    {status.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleStartEdit(topic)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              <button
                                onClick={() => onRemoveTopic(topic.id)}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Remover"
                              >
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Add New Topic */}
                    {isAdding ? (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700">
                        <input
                          type="text"
                          value={newTopicName}
                          onChange={(e) => setNewTopicName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddTopic(discipline.id);
                            if (e.key === 'Escape') setAddingToDiscipline(null);
                          }}
                          placeholder="Nome do novo tópico..."
                          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white mb-3"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddTopic(discipline.id)}
                            className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Adicionar
                          </button>
                          <button
                            onClick={() => {
                              setAddingToDiscipline(null);
                              setNewTopicName('');
                            }}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingToDiscipline(discipline.id)}
                        className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">Adicionar Tópico</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
