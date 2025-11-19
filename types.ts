
export interface Topic {
    id: string;
    name: string;
}

export interface Discipline {
    id: string;
    name:string;
    topics: Topic[];
}

export interface Edital {
    id: string;
    name: string;
    disciplines: Discipline[];
}

export interface StudySessionData {
    id: string;
    disciplineId: string;
    topicId: string;
    duration: number; // in seconds
    date: Date;
    type: 'theory' | 'questions' | 'pdf' | 'video' | 'review' | 'summary' | 'law';
}

export interface QuestionLog {
    id: string;
    disciplineId: string;
    topicId: string;
    total: number;
    correct: number;
    date: Date;
}

export interface Revision {
    id: string;
    topicId: string;
    dueDate: Date;
    completed: boolean;
    label: string; // Ex: "24h", "7 dias", "30 dias"
}

export interface TopicStatus {
    pending: boolean;
    // Novos status detalhados
    pdf: boolean;
    video: boolean;
    law: boolean;
    questions: boolean;
    summary: boolean;
}

export interface StudyData {
    sessions: StudySessionData[];
    questions: QuestionLog[];
    revisions: Revision[];
    topicStatus: { [topicId: string]: TopicStatus };
    // Removed laws property
}

export interface Journey {
    id: string;
    edital: Edital;
    studyData: StudyData;
}

export interface GeneratedQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}
