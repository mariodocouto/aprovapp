
import type { Edital } from '../types.ts';

export const mockPcrs: Edital = {
    id: 'pc-rs-2024',
    name: 'Polícia Civil RS',
    disciplines: [
        {
            id: 'pcrs-d1', name: 'Língua Portuguesa',
            topics: [
                { id: 'pcrs-t1-1', name: 'Leitura, interpretação e relação entre ideias' },
                { id: 'pcrs-t1-2', name: 'Linguagem e comunicação' },
                { id: 'pcrs-t1-3', name: 'Gêneros e tipos textuais, intertextualidade' },
                { id: 'pcrs-t1-4', name: 'Coesão e coerência textuais' },
                { id: 'pcrs-t1-5', name: 'Léxico: significação e substituição de palavras' },
                { id: 'pcrs-t1-6', name: 'Ortografia' },
                { id: 'pcrs-t1-7', name: 'Figuras de linguagem' },
                { id: 'pcrs-t1-8', name: 'Fonologia' },
                { id: 'pcrs-t1-9', name: 'Morfologia' },
                { id: 'pcrs-t1-10', name: 'Sintaxe (funções sintáticas, colocação, regência, concordância)' },
                { id: 'pcrs-t1-11', name: 'Coordenação e subordinação. Pontuação' }
            ]
        },
        {
            id: 'pcrs-d2', name: 'Informática',
            topics: [
                { id: 'pcrs-t2-1', name: 'Fundamentos da internet e da conectividade (Deep Web, Dark Web, etc)' },
                { id: 'pcrs-t2-2', name: 'Identificação de usuários (IP, CGNAT, P2P, DNS, etc)' },
                { id: 'pcrs-t2-3', name: 'Redes de computadores e comunicação' },
                { id: 'pcrs-t2-4', name: 'Modelos OSI/ISO e TCP/IP' },
                { id: 'pcrs-t2-5', name: 'Computação em nuvem (cloud computing)' },
                { id: 'pcrs-t2-6', name: 'Sistemas operacionais (Windows e Linux)' },
                { id: 'pcrs-t2-7', name: 'Manipulação de arquivos e pastas' },
                { id: 'pcrs-t2-8', name: 'Acesso remoto, colaboração online (Teams)' },
                { id: 'pcrs-t2-9', name: 'Edição de textos, planilhas e apresentações (Office 365 e LibreOffice)' },
                { id: 'pcrs-t2-10', name: 'Ferramentas de navegação e correio eletrônico' },
                { id: 'pcrs-t2-11', name: 'Hash (MD5, SHA-1, SHA-256)' },
                { id: 'pcrs-t2-12', name: 'Segurança da informação' },
                { id: 'pcrs-t2-13', name: 'Ferramentas e técnicas de segurança (antivírus, firewall, MFA)' },
                { id: 'pcrs-t2-14', name: 'Investigação de evidências digitais' },
                { id: 'pcrs-t2-15', name: 'Análise de metadados' },
                { id: 'pcrs-t2-16', name: 'Criptografia na investigação' }
            ]
        },
        {
            id: 'pcrs-d3', name: 'Raciocínio Lógico',
            topics: [
                { id: 'pcrs-t3-1', name: 'Estrutura lógica de relações arbitrárias' },
                { id: 'pcrs-t3-2', name: 'Diagramas lógicos' },
                { id: 'pcrs-t3-3', name: 'Proposições e conectivos' },
                { id: 'pcrs-t3-4', name: 'Operações lógicas sobre proposições' },
                { id: 'pcrs-t3-5', name: 'Construção de tabelas-verdade' },
                { id: 'pcrs-t3-6', name: 'Implicação lógica, equivalência lógica, Leis De Morgan' },
                { id: 'pcrs-t3-7', name: 'Argumentação e dedução lógica' },
                { id: 'pcrs-t3-8', name: 'Sentenças abertas' },
                { id: 'pcrs-t3-9', name: 'Quantificadores universal e existencial' },
                { id: 'pcrs-t3-10', name: 'Argumentos Lógicos Dedutivos; Argumentos Categóricos' }
            ]
        },
        {
            id: 'pcrs-d4', name: 'Contabilidade Geral',
            topics: [
                { id: 'pcrs-t4-1', name: 'Contabilidade Geral' },
                { id: 'pcrs-t4-2', name: 'Princípios da Contabilidade; Estrutura Conceitual' },
                { id: 'pcrs-t4-3', name: 'Atos Administrativos e Fatos contábeis' },
                { id: 'pcrs-t4-4', name: 'Origem e aplicação dos recursos' },
                { id: 'pcrs-t4-5', name: 'Patrimônio Líquido' },
                { id: 'pcrs-t4-6', name: 'Contas: Conceito, classificação e funcionamento' },
                { id: 'pcrs-t4-7', name: 'Plano de Contas' },
                { id: 'pcrs-t4-8', name: 'Débito, crédito e saldo' },
                { id: 'pcrs-t4-9', name: 'Receitas e despesas' },
                { id: 'pcrs-t4-10', name: 'Lançamentos e Escrituração Contábil' },
                { id: 'pcrs-t4-11', name: 'Balancete de Verificação' },
                { id: 'pcrs-t4-12', name: 'Ativo, passivo e patrimônio líquido' },
                { id: 'pcrs-t4-13', name: 'Operações Comerciais' },
                { id: 'pcrs-t4-14', name: 'Encerramento do exercício' },
                { id: 'pcrs-t4-15', name: 'Provisões e reservas' },
                { id: 'pcrs-t4-16', name: 'Inventário' },
                { id: 'pcrs-t4-17', name: 'Provisão para crédito de liquidação duvidosa' },
                { id: 'pcrs-t4-18', name: 'Depreciação, exaustão e amortização' },
                { id: 'pcrs-t4-19', name: 'Custo das Mercadorias Vendidas (CMV)' },
                { id: 'pcrs-t4-20', name: 'Normas Brasileiras de Contabilidade (NBC TG)' }
            ]
        },
        {
            id: 'pcrs-d5', name: 'Estatística',
            topics: [
                { id: 'pcrs-t5-1', name: 'Conceitos: tipos de dados, escalas de mensuração' },
                { id: 'pcrs-t5-2', name: 'Estatística descritiva' },
                { id: 'pcrs-t5-3', name: 'Probabilidade' },
                { id: 'pcrs-t5-4', name: 'Variáveis aleatórias' },
                { id: 'pcrs-t5-5', name: 'Distribuições discretas de probabilidade' },
                { id: 'pcrs-t5-6', name: 'Distribuições contínuas de probabilidade' },
                { id: 'pcrs-t5-7', name: 'Amostragens e Distribuições amostrais' },
                { id: 'pcrs-t5-8', name: 'Testes de hipóteses' },
                { id: 'pcrs-t5-9', name: 'Correlação, regressão linear simples e múltipla' },
                { id: 'pcrs-t5-10', name: 'Números índices' },
                { id: 'pcrs-t5-11', name: 'Índices complexos de quantidade e de preços' },
                { id: 'pcrs-t5-12', name: 'Análise de séries temporais' }
            ]
        },
        {
            id: 'pcrs-d6', name: 'Direito Penal',
            topics: [
                { id: 'pcrs-t6-1', name: 'Parte Geral' },
                { id: 'pcrs-t6-2', name: 'Princípios do Direito Penal' },
                { id: 'pcrs-t6-3', name: 'Lei penal no tempo e no espaço' },
                { id: 'pcrs-t6-4', name: 'Conceito de crime e seus elementos' },
                { id: 'pcrs-t6-5', name: 'Teoria da imputação objetiva' },
                { id: 'pcrs-t6-6', name: 'Concurso de pessoas e crimes' },
                { id: 'pcrs-t6-7', name: 'Pena e Medida de segurança' },
                { id: 'pcrs-t6-8', name: 'Parte Especial: Crimes em espécie' },
                { id: 'pcrs-t6-9', name: 'Leis Especiais e suas atualizações' }
            ]
        },
        {
            id: 'pcrs-d7', name: 'Direito Processual Penal',
            topics: [
                { id: 'pcrs-t7-1', name: 'Princípios e garantias processuais penais' },
                { id: 'pcrs-t7-2', name: 'Sistemas e Fontes do Direito Processual Penal' },
                { id: 'pcrs-t7-3', name: 'Lei processual no tempo e espaço' },
                { id: 'pcrs-t7-4', name: 'Jurisdição e Competência' },
                { id: 'pcrs-t7-5', name: 'Sujeitos da persecução penal' },
                { id: 'pcrs-t7-6', name: 'Ação penal' },
                { id: 'pcrs-t7-7', name: 'Investigação criminal policial' },
                { id: 'pcrs-t7-8', name: 'Prova (Busca, interceptação, cadeia de custódia)' },
                { id: 'pcrs-t7-9', name: 'Prisão e medidas cautelares' },
                { id: 'pcrs-t7-10', name: 'Processo e procedimentos' },
                { id: 'pcrs-t7-11', name: 'Nulidades e Recursos' },
                { id: 'pcrs-t7-12', name: 'Leis processuais penais especiais' },
                { id: 'pcrs-t7-13', name: 'Jurisprudência e súmulas do STF e STJ' }
            ]
        },
        {
            id: 'pcrs-d8', name: 'Direito Constitucional',
            topics: [
                { id: 'pcrs-t8-1', name: 'Teoria Geral do Direito Constitucional' },
                { id: 'pcrs-t8-2', name: 'Constituição: conceito, objeto, conteúdo e classificação' },
                { id: 'pcrs-t8-3', name: 'Poder Constituinte' },
                { id: 'pcrs-t8-4', name: 'Aplicabilidade das normas constitucionais' },
                { id: 'pcrs-t8-5', name: 'Constituição da República de 1988' },
                { id: 'pcrs-t8-6', name: 'Direitos e Garantias Fundamentais (LGPD)' },
                { id: 'pcrs-t8-7', name: 'Direitos sociais, políticos e de nacionalidade' },
                { id: 'pcrs-t8-8', name: 'Remédios Constitucionais' },
                { id: 'pcrs-t8-9', name: 'Organização do Estado e Administração Pública' },
                { id: 'pcrs-t8-10', name: 'Poderes do Estado (Executivo, Legislativo, Judiciário)' },
                { id: 'pcrs-t8-11', name: 'Funções Essenciais à Justiça' },
                { id: 'pcrs-t8-12', name: 'Defesa do Estado e das Instituições Democráticas' },
                { id: 'pcrs-t8-13', name: 'Ordem Social' },
                { id: 'pcrs-t8-14', name: 'Constituição do Estado do Rio Grande do Sul' }
            ]
        },
        {
            id: 'pcrs-d9', name: 'Direito Administrativo',
            topics: [
                { id: 'pcrs-t9-1', name: 'Fundamentos e fontes do direito administrativo' },
                { id: 'pcrs-t9-2', name: 'Princípios da Administração Pública' },
                { id: 'pcrs-t9-3', name: 'Organização da administração pública' },
                { id: 'pcrs-t9-4', name: 'Agentes públicos' },
                { id: 'pcrs-t9-5', name: 'Atos administrativos' },
                { id: 'pcrs-t9-6', name: 'Poderes da administração pública' },
                { id: 'pcrs-t9-7', name: 'Controle da administração pública' },
                { id: 'pcrs-t9-8', name: 'Licitações e contratos administrativos (Lei 14.133/2021)' },
                { id: 'pcrs-t9-9', name: 'Serviços públicos' },
                { id: 'pcrs-t9-10', name: 'Processo administrativo' },
                { id: 'pcrs-t9-11', name: 'Lei de Acesso à Informação' },
                { id: 'pcrs-t9-12', name: 'Lei Geral de Proteção de Dados (LGPD)' },
                { id: 'pcrs-t9-13', name: 'Responsabilidade do estado' },
                { id: 'pcrs-t9-14', name: 'Lei de Improbidade Administrativa' },
                { id: 'pcrs-t9-15', name: 'Lei Anticorrupção' }
            ]
        },
        {
            id: 'pcrs-d10', name: 'Direitos Humanos',
            topics: [
                { id: 'pcrs-t10-1', name: 'Teoria geral dos direitos humanos' },
                { id: 'pcrs-t10-2', name: 'Direitos humanos fundamentais' },
                { id: 'pcrs-t10-3', name: 'Sistema internacional e regional de proteção' },
                { id: 'pcrs-t10-4', name: 'Instrumentos internacionais de proteção' },
                { id: 'pcrs-t10-5', name: 'Políticas Nacionais de Direitos Humanos' },
                { id: 'pcrs-t10-6', name: 'Grupos em situação de vulnerabilidade e minorias' },
                { id: 'pcrs-t10-7', name: 'Segurança pública e direitos humanos' },
                { id: 'pcrs-t10-8', name: 'Fundamentos legais do uso da força policial' },
                { id: 'pcrs-t10-9', name: 'Normas internacionais sobre tratamento de pessoas presas' }
            ]
        },
        {
            id: 'pcrs-d11', name: 'Legislação Estatutária',
            topics: [
                { id: 'pcrs-t11-1', name: 'Lei Complementar nº 10.098/1994 (Estatuto e Regime Jurídico Único dos Servidores Públicos Civis do RS)' },
                { id: 'pcrs-t11-2', name: 'Lei nº 7.366/1980 (Estatuto dos Servidores da Polícia Civil)' },
                { id: 'pcrs-t11-3', name: 'Lei Orgânica Nacional das Polícias Civis (Lei nº 14.735/2023)' }
            ]
        }
    ]
};

export const mockOab: Edital = {
    id: 'oab-45-unificado',
    name: 'OAB 45º Exame',
    disciplines: [
        {
            id: 'oab-d1', name: 'Direito Administrativo',
            topics: [
                { id: 'oab-d1-t1', name: 'Princípios, fontes e interpretação. Lei 13.655/2018 (LINDB) e LGPD' },
                { id: 'oab-d1-t2', name: 'Atividade e estrutura administrativa. Organização (Terceiro setor)' },
                { id: 'oab-d1-t3', name: 'Poderes administrativos: hierárquico, disciplinar, regulamentar e de polícia' },
                { id: 'oab-d1-t4', name: 'Atos administrativos: conceito, atributos, classificação e extinção' },
                { id: 'oab-d1-t5', name: 'Licitações e contratos (Lei 8.666/93 e Lei 14.133/2021)' },
                { id: 'oab-d1-t6', name: 'Serviços públicos (concessões, PPPs, Agências Reguladoras)' },
                { id: 'oab-d1-t7', name: 'Agentes públicos: regime jurídico, direitos e responsabilidades' },
                { id: 'oab-d1-t8', name: 'Domínio público e bens públicos' },
                { id: 'oab-d1-t9', name: 'Intervenção estatal na propriedade e no domínio econômico' },
                { id: 'oab-d1-t10', name: 'Controle da Administração Pública (Tribunal de Contas, Judiciário)' },
                { id: 'oab-d1-t11', name: 'Lei Anticorrupção e Lei de Responsabilidade das Estatais' },
                { id: 'oab-d1-t12', name: 'Improbidade administrativa (Lei 8.429/92 com alterações)' },
                { id: 'oab-d1-t13', name: 'Lei de Abuso de Autoridade' },
                { id: 'oab-d1-t14', name: 'Responsabilidade civil do Estado' },
                { id: 'oab-d1-t15', name: 'Processo administrativo e prescrição' },
                { id: 'oab-d1-t16', name: 'Ações constitucionais (MS, Habeas Data, Ação Popular)' },
                { id: 'oab-d1-t17', name: 'Estatuto da Cidade' }
            ]
        },
        {
            id: 'oab-d2', name: 'Direito Civil',
            topics: [
                { id: 'oab-d2-t1', name: 'Direito Civil e Constituição. LINDB e LGPD' },
                { id: 'oab-d2-t2', name: 'Pessoa natural e Direitos da personalidade' },
                { id: 'oab-d2-t3', name: 'Pessoa jurídica e Domicílio' },
                { id: 'oab-d2-t4', name: 'Bens e Fatos Jurídicos (Negócio Jurídico)' },
                { id: 'oab-d2-t5', name: 'Prescrição, Decadência e Prova' },
                { id: 'oab-d2-t6', name: 'Teoria Geral das Obrigações (Modalidades, Transmissão, Extinção)' },
                { id: 'oab-d2-t7', name: 'Teoria do Contrato e Contratos em espécie' },
                { id: 'oab-d2-t8', name: 'Títulos de Crédito' },
                { id: 'oab-d2-t9', name: 'Responsabilidade Civil' },
                { id: 'oab-d2-t10', name: 'Direito das Coisas (Posse e Propriedade)' },
                { id: 'oab-d2-t11', name: 'Direitos Reais' },
                { id: 'oab-d2-t12', name: 'Direito de Família (Casamento, União Estável, Parentesco)' },
                { id: 'oab-d2-t13', name: 'Poder Familiar e Regimes de Bens' },
                { id: 'oab-d2-t14', name: 'Direito das Sucessões (Legítima e Testamentária)' },
                { id: 'oab-d2-t15', name: 'Leis Civis Especiais' },
                { id: 'oab-d2-t16', name: 'Direito do Consumidor (CDC)' }
            ]
        },
        {
            id: 'oab-d3', name: 'Direito Processual Civil',
            topics: [
                { id: 'oab-d3-t1', name: 'Teoria geral do processo e Normas fundamentais' },
                { id: 'oab-d3-t2', name: 'Jurisdição, Ação, Competência e Cooperação' },
                { id: 'oab-d3-t3', name: 'Sujeitos do processo, Juiz, Partes e Intervenção de terceiros' },
                { id: 'oab-d3-t4', name: 'Atos processuais, Prazos, Citação e Nulidades' },
                { id: 'oab-d3-t5', name: 'Tutela Provisória (Urgência e Evidência)' },
                { id: 'oab-d3-t6', name: 'Formação, suspensão e extinção do processo' },
                { id: 'oab-d3-t7', name: 'Processo de Conhecimento e Procedimento Comum' },
                { id: 'oab-d3-t8', name: 'Provas e Sentença' },
                { id: 'oab-d3-t9', name: 'Coisa Julgada e Ação Rescisória' },
                { id: 'oab-d3-t10', name: 'Ordem dos processos nos Tribunais e Precedentes' },
                { id: 'oab-d3-t11', name: 'Recursos (Apelação, Agravos, Embargos, Especial e Extraordinário)' },
                { id: 'oab-d3-t12', name: 'Execução e Cumprimento de Sentença' },
                { id: 'oab-d3-t13', name: 'Procedimentos Especiais (Jurisdição Voluntária, Monitória, etc)' },
                { id: 'oab-d3-t14', name: 'Juizados Especiais' },
                { id: 'oab-d3-t15', name: 'Processo Coletivo e Ações Constitucionais (MS, Habeas Data)' }
            ]
        },
        {
            id: 'oab-d4', name: 'Direito Constitucional',
            topics: [
                { id: 'oab-d4-t1', name: 'Constituição: conceito, classificação e eficácia' },
                { id: 'oab-d4-t2', name: 'Poder Constituinte e Reforma' },
                { id: 'oab-d4-t3', name: 'Hermenêutica Constitucional' },
                { id: 'oab-d4-t4', name: 'Controle de Constitucionalidade (Difuso e Concentrado)' },
                { id: 'oab-d4-t5', name: 'Ações de Controle (ADI, ADC, ADO, ADPF)' },
                { id: 'oab-d4-t6', name: 'Direitos e Garantias Fundamentais' },
                { id: 'oab-d4-t7', name: 'Remédios Constitucionais (HC, MS, MI, Ação Popular)' },
                { id: 'oab-d4-t8', name: 'Direitos Sociais, Nacionalidade e Políticos' },
                { id: 'oab-d4-t9', name: 'Organização do Estado (Federalismo e Intervenção)' },
                { id: 'oab-d4-t10', name: 'Administração Pública' },
                { id: 'oab-d4-t11', name: 'Organização dos Poderes (Legislativo, Executivo, Judiciário)' },
                { id: 'oab-d4-t12', name: 'Funções Essenciais à Justiça' },
                { id: 'oab-d4-t13', name: 'Sistema Tributário Nacional e Orçamento' },
                { id: 'oab-d4-t14', name: 'Ordem Econômica e Financeira' },
                { id: 'oab-d4-t15', name: 'Ordem Social' }
            ]
        },
        {
            id: 'oab-d5', name: 'Direito do Trabalho',
            topics: [
                { id: 'oab-d5-t1', name: 'Conceito, fontes e princípios do Direito do Trabalho' },
                { id: 'oab-d5-t2', name: 'Relação de trabalho e relação de emprego' },
                { id: 'oab-d5-t3', name: 'Sujeitos: Empregado e Empregador (Grupo Econômico, Sucessão)' },
                { id: 'oab-d5-t4', name: 'Terceirização' },
                { id: 'oab-d5-t5', name: 'Contrato de Trabalho: modalidades e alteração' },
                { id: 'oab-d5-t6', name: 'Suspensão e Interrupção do Contrato' },
                { id: 'oab-d5-t7', name: 'Duração do trabalho (Jornada, Horas extras, Intervalos, Férias)' },
                { id: 'oab-d5-t8', name: 'Remuneração e Salário (Equiparação, Adicionais)' },
                { id: 'oab-d5-t9', name: 'Cessação do contrato (Rescisão, Justa Causa, Estabilidade, FGTS)' },
                { id: 'oab-d5-t10', name: 'Segurança e Medicina do Trabalho (Insalubridade e Periculosidade)' },
                { id: 'oab-d5-t11', name: 'Direito Coletivo (Sindicatos, Negociação, Greve)' },
                { id: 'oab-d5-t12', name: 'Leis 13.467/17, 14.457/22 e Súmulas do TST' }
            ]
        },
        {
            id: 'oab-d6', name: 'Direito Processual do Trabalho',
            topics: [
                { id: 'oab-d6-t1', name: 'Organização e Competência da Justiça do Trabalho' },
                { id: 'oab-d6-t2', name: 'Atos, termos, prazos e nulidades processuais' },
                { id: 'oab-d6-t3', name: 'Dissídio Individual: Petição Inicial, Audiência e Resposta do Réu' },
                { id: 'oab-d6-t4', name: 'Provas no Processo do Trabalho' },
                { id: 'oab-d6-t5', name: 'Sentença e Coisa Julgada' },
                { id: 'oab-d6-t6', name: 'Sistema Recursal Trabalhista' },
                { id: 'oab-d6-t7', name: 'Execução Trabalhista' },
                { id: 'oab-d6-t8', name: 'Procedimentos Especiais (Inquérito, Ação Rescisória, Mandado de Segurança)' },
                { id: 'oab-d6-t9', name: 'Dissídio Coletivo' },
                { id: 'oab-d6-t10', name: 'Processo Judicial Eletrônico' }
            ]
        },
        {
            id: 'oab-d7', name: 'Direito Empresarial',
            topics: [
                { id: 'oab-d7-t1', name: 'Direito de Empresa, Empresário e Estabelecimento' },
                { id: 'oab-d7-t2', name: 'Direito Societário: Sociedades (Limitada, Anônima, Cooperativa)' },
                { id: 'oab-d7-t3', name: 'Títulos de Crédito' },
                { id: 'oab-d7-t4', name: 'Recuperação Judicial e Falência' },
                { id: 'oab-d7-t5', name: 'Contratos Empresariais' },
                { id: 'oab-d7-t6', name: 'Propriedade Industrial (Marcas e Patentes)' },
                { id: 'oab-d7-t7', name: 'Direito Concorrencial' }
            ]
        },
        {
            id: 'oab-d8', name: 'Direito Penal',
            topics: [
                { id: 'oab-d8-t1', name: 'Princípios e Aplicação da Lei Penal' },
                { id: 'oab-d8-t2', name: 'Teoria do Delito: Fato típico, Ilicitude e Culpabilidade' },
                { id: 'oab-d8-t3', name: 'Erro de Tipo e Erro de Proibição' },
                { id: 'oab-d8-t4', name: 'Concurso de Pessoas' },
                { id: 'oab-d8-t5', name: 'Penas e Medidas de Segurança' },
                { id: 'oab-d8-t6', name: 'Extinção da Punibilidade e Prescrição' },
                { id: 'oab-d8-t7', name: 'Crimes em Espécie (Pessoa, Patrimônio, Dignidade Sexual, Adm. Pública)' },
                { id: 'oab-d8-t8', name: 'Legislação Penal Especial (Drogas, Armas, Maria da Penha, etc)' }
            ]
        },
        {
            id: 'oab-d9', name: 'Direito Processual Penal',
            topics: [
                { id: 'oab-d9-t1', name: 'Inquérito Policial e Investigação' },
                { id: 'oab-d9-t2', name: 'Ação Penal' },
                { id: 'oab-d9-t3', name: 'Jurisdição e Competência' },
                { id: 'oab-d9-t4', name: 'Provas' },
                { id: 'oab-d9-t5', name: 'Prisões e Medidas Cautelares' },
                { id: 'oab-d9-t6', name: 'Procedimentos (Comum, Júri e Especiais)' },
                { id: 'oab-d9-t7', name: 'Nulidades' },
                { id: 'oab-d9-t8', name: 'Recursos e Ações Autônomas (Habeas Corpus, Revisão Criminal)' },
                { id: 'oab-d9-t9', name: 'Execução Penal (LEP)' }
            ]
        },
        {
            id: 'oab-d10', name: 'Direito Tributário',
            topics: [
                { id: 'oab-d10-t1', name: 'Sistema Tributário Nacional e Princípios' },
                { id: 'oab-d10-t2', name: 'Imunidades e Competência Tributária' },
                { id: 'oab-d10-t3', name: 'Tributos em Espécie (Impostos, Taxas, Contribuições)' },
                { id: 'oab-d10-t4', name: 'Obrigação e Crédito Tributário' },
                { id: 'oab-d10-t5', name: 'Suspensão, Extinção e Exclusão do Crédito' },
                { id: 'oab-d10-t6', name: 'Responsabilidade Tributária' },
                { id: 'oab-d10-t7', name: 'Administração Tributária e Dívida Ativa' },
                { id: 'oab-d10-t8', name: 'Processo Administrativo e Judicial Tributário (Execução Fiscal)' }
            ]
        }
    ]
};

export const mockTjsp: Edital = {
    id: 'tj-sp-2024',
    name: 'TJ-SP Escrevente',
    disciplines: [
        {
            id: 'd1', name: 'Língua Portuguesa',
            topics: [
                { id: 't1-1', name: 'Interpretação de Textos' }, { id: 't1-2', name: 'Pontuação' }, { id: 't1-3', name: 'Concordância' },
            ]
        },
        {
            id: 'd2', name: 'Direito Penal',
            topics: [ { id: 't2-1', name: 'Crimes Contra a Adm. Pública' }, { id: 't2-2', name: 'Teoria do Crime' },]
        },
        {
            id: 'd3', name: 'Raciocínio Lógico',
            topics: [ { id: 't4-1', name: 'Estruturas Lógicas' }, { id: 't4-2', name: 'Diagramas Lógicos' },]
        },
    ]
};

export const mockCnu: Edital = {
    id: 'cnu-bloco-8-2024',
    name: 'CNU - Bloco 8 Intermediário',
    disciplines: [
        {
            id: 'cnu-d1', name: 'Língua Portuguesa',
            topics: [ { id: 'cnu-t1-1', name: 'Interpretação de Textos' }, { id: 'cnu-t1-2', name: 'Gramática Aplicada' } ]
        },
        {
            id: 'cnu-d2', name: 'Direito Constitucional',
            topics: [ { id: 'cnu-t2-1', name: 'Direitos e Garantias Fundamentais' }, { id: 'cnu-t2-2', name: 'Organização do Estado' } ]
        },
         {
            id: 'cnu-d3', name: 'Noções de Direito Administrativo',
            topics: [ { id: 'cnu-t3-1', name: 'Atos Administrativos' }, { id: 'cnu-t3-2', name: 'Licitações e Contratos' } ]
        },
        {
            id: 'cnu-d4', name: 'Matemática',
            topics: [ { id: 'cnu-t4-1', name: 'Porcentagem e Juros' }, { id: 'cnu-t4-2', name: 'Raciocínio Lógico-Quantitativo' } ]
        },
    ]
};

export const mockTse: Edital = {
    id: 'tse-unificado-2024',
    name: 'TSE Unificado - Técnico',
    disciplines: [
        {
            id: 'tse-d1', name: 'Língua Portuguesa',
            topics: [ { id: 'tse-t1-1', name: 'Interpretação e Compreensão de Texto' }, { id: 'tse-t1-2', name: 'Redação Oficial' } ]
        },
        {
            id: 'tse-d2', name: 'Noções de Direito Eleitoral',
            topics: [ { id: 'tse-t2-1', name: 'Conceitos Fundamentais' }, { id: 'tse-t2-2', name: 'Partidos Políticos' } ]
        },
        {
            id: 'tse-d3', name: 'Noções de Direito Administrativo',
            topics: [ { id: 'tse-t3-1', name: 'Agentes Públicos' }, { id: 'tse-t3-2', name: 'Poderes Administrativos' } ]
        },
    ]
};

export const mockCaixa: Edital = {
    id: 'caixa-tbn-2024',
    name: 'Caixa - Técnico Bancário',
    disciplines: [
        {
            id: 'caixa-d1', name: 'Conhecimentos Bancários',
            topics: [ { id: 'caixa-t1-1', name: 'Sistema Financeiro Nacional' }, { id: 'caixa-t1-2', name: 'Produtos e Serviços Bancários' } ]
        },
        {
            id: 'caixa-d2', name: 'Atendimento Bancário',
            topics: [ { id: 'caixa-t2-1', name: 'Técnicas de Vendas' }, { id: 'caixa-t2-2', name: 'CDC e Legislação' } ]
        },
         {
            id: 'caixa-d3', name: 'Tecnologia da Informação',
            topics: [ { id: 'caixa-t3-1', name: 'Segurança da Informação' }, { id: 'caixa-t3-2', name: 'Noções de Sistemas Operacionais' } ]
        },
    ]
};
