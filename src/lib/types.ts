// Tipos principais do AprovApp

export type StudyType = 
  | 'teoria' 
  | 'lei-seca' 
  | 'questoes' 
  | 'pdf' 
  | 'video-aula' 
  | 'revisao' 
  | 'resumo' 
  | 'flashcards';

export type ItemStatus = 
  | 'pendente' 
  | 'lido' 
  | 'aula-assistida' 
  | 'resumo-feito' 
  | 'lei-seca-lida' 
  | 'revisado' 
  | 'questoes-feitas';

export type RevisionInterval = '24h' | '7d' | '30d';

export type CompetitionMode = 
  | 'horas-totais' 
  | 'horas-semanais' 
  | 'horas-mensais' 
  | 'media-diaria' 
  | 'percentual-edital' 
  | 'questoes-resolvidas' 
  | 'percentual-acertos' 
  | 'acertos-por-disciplina';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  selectedContest?: string;
  createdAt: Date;
}

export interface Contest {
  id: string;
  name: string;
  organization: string;
  category: string;
  status: 'aberto' | 'previsto' | 'encerrado';
  examDate?: Date;
  isPopular: boolean;
}

export interface Discipline {
  id: string;
  name: string;
  contestId: string;
  weight?: number;
  topics: Topic[];
  progress: number;
}

export interface Topic {
  id: string;
  name: string;
  disciplineId: string;
  status: ItemStatus;
  subtopics?: string[];
  progress: number;
}

export interface StudySession {
  id: string;
  userId: string;
  disciplineId: string;
  topicId: string;
  type: StudyType;
  duration: number; // em minutos
  date: Date;
  notes?: string;
}

export interface Question {
  id: string;
  userId: string;
  disciplineId: string;
  topicId: string;
  isCorrect: boolean;
  difficulty?: 'facil' | 'medio' | 'dificil';
  date: Date;
  source?: string;
}

export interface Revision {
  id: string;
  userId: string;
  topicId: string;
  interval: RevisionInterval;
  scheduledDate: Date;
  completed: boolean;
  completedDate?: Date;
}

export interface Law {
  id: string;
  name: string;
  number: string;
  articles: LawArticle[];
  progress: number;
}

export interface LawArticle {
  id: string;
  lawId: string;
  number: string;
  content: string;
  isStudied: boolean;
  lastStudied?: Date;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  contestId?: string;
  competitionModes: CompetitionMode[];
  members: GroupMember[];
  createdAt: Date;
}

export interface GroupMember {
  userId: string;
  groupId: string;
  selectedModes: CompetitionMode[];
  joinedAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface DashboardStats {
  totalStudyHours: number;
  totalQuestions: number;
  correctAnswersPercentage: number;
  editalProgress: number;
  disciplineProgress: { [key: string]: number };
  weeklyGoal: number;
  weeklyProgress: number;
  dailyGoal: number;
  dailyProgress: number;
  pendingRevisions: number;
  overdueTopics: number;
}
