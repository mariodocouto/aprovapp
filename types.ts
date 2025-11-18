
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
    type: 'theory' | 'law' | 'questions' | 'pdf' | 'video' | 'review' | 'summary';
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

export interface Article {
    id: string;
    number: number;
    read: boolean;
}

export interface Law {
    id: string;
    name: string;
    articles: Article[];
}

export interface StudyData {
    sessions: StudySessionData[];
    questions: QuestionLog[];
    revisions: Revision[];
    topicStatus: { [topicId: string]: TopicStatus };
    laws: Law[];
}

export interface Journey {
    id: string;
    edital: Edital;
    studyData: StudyData;
}