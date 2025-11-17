// Dados mock para demonstração do AprovApp

import { Contest, Discipline, Topic, DashboardStats, StudySession, Question, Revision, Law, Group } from './types';

export const MOCK_CONTESTS: Contest[] = [
  // Tribunais de Justiça
  { id: 'tj-sp', name: 'TJ-SP - Escrevente', organization: 'Tribunal de Justiça de São Paulo', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
  { id: 'tj-rj', name: 'TJ-RJ - Analista Judiciário', organization: 'Tribunal de Justiça do Rio de Janeiro', category: 'Carreiras de Tribunais', status: 'previsto', isPopular: true },
  { id: 'tj-rs', name: 'TJ-RS - Oficial de Justiça', organization: 'Tribunal de Justiça do Rio Grande do Sul', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
  { id: 'tj-sc', name: 'TJ-SC - Técnico Judiciário', organization: 'Tribunal de Justiça de Santa Catarina', category: 'Carreiras de Tribunais', status: 'previsto', isPopular: true },
  
  // Ministério Público
  { id: 'mpu', name: 'MPU - Técnico', organization: 'Ministério Público da União', category: 'Carreiras Administrativas', status: 'aberto', isPopular: true },
  
  // Polícia Federal e Rodoviária
  { id: 'pf', name: 'Polícia Federal - Agente', organization: 'Polícia Federal', category: 'Carreiras Policiais', status: 'previsto', isPopular: true },
  { id: 'prf', name: 'PRF - Policial Rodoviário', organization: 'Polícia Rodoviária Federal', category: 'Carreiras Policiais', status: 'aberto', isPopular: true },
  
  // INSS
  { id: 'inss', name: 'INSS - Técnico do Seguro Social', organization: 'Instituto Nacional do Seguro Social', category: 'Previdenciárias', status: 'previsto', isPopular: true },
  
  // Tribunais Regionais Federais
  { id: 'trf1', name: 'TRF 1ª Região - Analista', organization: 'Tribunal Regional Federal 1ª Região', category: 'Carreiras de Tribunais', status: 'previsto', isPopular: true },
  { id: 'trf2', name: 'TRF 2ª Região - Técnico', organization: 'Tribunal Regional Federal 2ª Região', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
  
  // Tribunais Regionais do Trabalho
  { id: 'trt-sp', name: 'TRT 2ª Região (SP) - Analista', organization: 'Tribunal Regional do Trabalho 2ª Região', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
  
  // Justiça Eleitoral
  { id: 'tse', name: 'TSE - Analista Judiciário', organization: 'Tribunal Superior Eleitoral', category: 'Carreiras de Tribunais', status: 'previsto', isPopular: true },
  { id: 'tre-sp', name: 'TRE-SP - Técnico Judiciário', organization: 'Tribunal Regional Eleitoral de São Paulo', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
  
  // Fazendárias
  { id: 'sefaz-sp', name: 'SEFAZ-SP - Agente Fiscal', organization: 'Secretaria da Fazenda de São Paulo', category: 'Carreiras Fiscais', status: 'previsto', isPopular: true },
  { id: 'receita-federal', name: 'Receita Federal - Auditor Fiscal', organization: 'Receita Federal do Brasil', category: 'Carreiras Fiscais', status: 'previsto', isPopular: true },
  
  // Tribunais de Contas
  { id: 'tcu', name: 'TCU - Auditor Federal', organization: 'Tribunal de Contas da União', category: 'Carreiras de Tribunais', status: 'previsto', isPopular: true },
  { id: 'tce-sp', name: 'TCE-SP - Agente de Fiscalização', organization: 'Tribunal de Contas do Estado de São Paulo', category: 'Carreiras de Tribunais', status: 'aberto', isPopular: true },
];

export const MOCK_DISCIPLINES: Discipline[] = [
  {
    id: 'dir-const',
    name: 'Direito Constitucional',
    contestId: 'tj-sp',
    weight: 15,
    progress: 45,
    topics: [
      { id: 'const-1', name: 'Princípios Fundamentais', disciplineId: 'dir-const', status: 'revisado', progress: 100 },
      { id: 'const-2', name: 'Direitos e Garantias Fundamentais', disciplineId: 'dir-const', status: 'lido', progress: 80 },
      { id: 'const-3', name: 'Organização do Estado', disciplineId: 'dir-const', status: 'pendente', progress: 20 },
      { id: 'const-4', name: 'Organização dos Poderes', disciplineId: 'dir-const', status: 'pendente', progress: 0 },
    ]
  },
  {
    id: 'dir-admin',
    name: 'Direito Administrativo',
    contestId: 'tj-sp',
    weight: 15,
    progress: 30,
    topics: [
      { id: 'admin-1', name: 'Princípios da Administração Pública', disciplineId: 'dir-admin', status: 'aula-assistida', progress: 100 },
      { id: 'admin-2', name: 'Atos Administrativos', disciplineId: 'dir-admin', status: 'lido', progress: 60 },
      { id: 'admin-3', name: 'Licitações e Contratos', disciplineId: 'dir-admin', status: 'pendente', progress: 0 },
      { id: 'admin-4', name: 'Servidores Públicos', disciplineId: 'dir-admin', status: 'pendente', progress: 0 },
    ]
  },
  {
    id: 'port',
    name: 'Língua Portuguesa',
    contestId: 'tj-sp',
    weight: 20,
    progress: 65,
    topics: [
      { id: 'port-1', name: 'Interpretação de Texto', disciplineId: 'port', status: 'questoes-feitas', progress: 100 },
      { id: 'port-2', name: 'Ortografia e Acentuação', disciplineId: 'port', status: 'revisado', progress: 100 },
      { id: 'port-3', name: 'Sintaxe', disciplineId: 'port', status: 'lido', progress: 70 },
      { id: 'port-4', name: 'Concordância Verbal e Nominal', disciplineId: 'port', status: 'aula-assistida', progress: 50 },
    ]
  },
  {
    id: 'raciocinio',
    name: 'Raciocínio Lógico',
    contestId: 'tj-sp',
    weight: 10,
    progress: 20,
    topics: [
      { id: 'rac-1', name: 'Lógica Proposicional', disciplineId: 'raciocinio', status: 'lido', progress: 40 },
      { id: 'rac-2', name: 'Raciocínio Quantitativo', disciplineId: 'raciocinio', status: 'pendente', progress: 0 },
      { id: 'rac-3', name: 'Sequências e Padrões', disciplineId: 'raciocinio', status: 'pendente', progress: 0 },
    ]
  },
  {
    id: 'informatica',
    name: 'Informática',
    contestId: 'tj-sp',
    weight: 10,
    progress: 55,
    topics: [
      { id: 'info-1', name: 'Windows e Linux', disciplineId: 'informatica', status: 'revisado', progress: 100 },
      { id: 'info-2', name: 'Microsoft Office', disciplineId: 'informatica', status: 'questoes-feitas', progress: 80 },
      { id: 'info-3', name: 'Internet e Segurança', disciplineId: 'informatica', status: 'lido', progress: 40 },
    ]
  },
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalStudyHours: 127.5,
  totalQuestions: 1847,
  correctAnswersPercentage: 73.2,
  editalProgress: 42,
  disciplineProgress: {
    'dir-const': 45,
    'dir-admin': 30,
    'port': 65,
    'raciocinio': 20,
    'informatica': 55,
  },
  weeklyGoal: 30,
  weeklyProgress: 18.5,
  dailyGoal: 4,
  dailyProgress: 2.5,
  pendingRevisions: 12,
  overdueTopics: 3,
};

export const MOCK_RECENT_SESSIONS: StudySession[] = [
  {
    id: 's1',
    userId: 'user1',
    disciplineId: 'port',
    topicId: 'port-3',
    type: 'teoria',
    duration: 90,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 's2',
    userId: 'user1',
    disciplineId: 'dir-const',
    topicId: 'const-2',
    type: 'questoes',
    duration: 45,
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 's3',
    userId: 'user1',
    disciplineId: 'informatica',
    topicId: 'info-2',
    type: 'revisao',
    duration: 30,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

export const MOCK_LAWS: Law[] = [
  {
    id: 'lei-8112',
    name: 'Lei 8.112/90',
    number: '8.112/90',
    progress: 35,
    articles: [
      { id: 'art-1', lawId: 'lei-8112', number: '1', content: 'Esta Lei institui o Regime Jurídico dos Servidores Públicos Civis da União...', isStudied: true },
      { id: 'art-2', lawId: 'lei-8112', number: '2', content: 'Para os efeitos desta Lei, servidor é a pessoa legalmente investida em cargo público.', isStudied: true },
      { id: 'art-3', lawId: 'lei-8112', number: '3', content: 'Cargo público é o conjunto de atribuições e responsabilidades previstas...', isStudied: false },
    ]
  },
  {
    id: 'cf-88',
    name: 'Constituição Federal',
    number: 'CF/88',
    progress: 22,
    articles: [
      { id: 'cf-art-1', lawId: 'cf-88', number: '1', content: 'A República Federativa do Brasil, formada pela união indissolúvel...', isStudied: true },
      { id: 'cf-art-5', lawId: 'cf-88', number: '5', content: 'Todos são iguais perante a lei, sem distinção de qualquer natureza...', isStudied: true },
    ]
  },
];

export const MOCK_REVISIONS: Revision[] = [
  {
    id: 'rev-1',
    userId: 'user1',
    topicId: 'const-1',
    interval: '24h',
    scheduledDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
    completed: false,
  },
  {
    id: 'rev-2',
    userId: 'user1',
    topicId: 'port-2',
    interval: '7d',
    scheduledDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    completed: false,
  },
  {
    id: 'rev-3',
    userId: 'user1',
    topicId: 'info-1',
    interval: '30d',
    scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    completed: false,
  },
];

export const CONTEST_CATEGORIES = [
  { id: 'policiais', name: 'Carreiras Policiais', icon: 'Shield' },
  { id: 'administrativas', name: 'Carreiras Administrativas', icon: 'Briefcase' },
  { id: 'fiscais', name: 'Carreiras Fiscais', icon: 'Calculator' },
  { id: 'tribunais', name: 'Carreiras de Tribunais', icon: 'Scale' },
  { id: 'saude', name: 'Carreiras da Saúde', icon: 'Heart' },
  { id: 'previdenciarias', name: 'Previdenciárias (INSS)', icon: 'Users' },
];
