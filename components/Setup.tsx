
import React, { useState } from 'react';
import type { Edital, Journey, TopicStatus } from '../types.ts';
import { supabase } from '../services/supabase.ts';
import { mockPcrs, mockOab } from '../data/mockData.ts';
import { UploadCloud, FileJson, Loader2, ArrowLeft } from 'lucide-react';

interface SetupProps {
    onJourneyCreated: (journey: Journey) => void;
    onCancel: () => void;
    userId: string;
}

const predefinedContests = [
    { name: 'Polícia Civil RS', edital: mockPcrs },
    { name: 'OAB 45º Exame', edital: mockOab },
    { name: 'TSE Unificado (Em breve)', edital: null },
    { name: 'Caixa (Em breve)', edital: null },
];

export const Setup: React.FC<SetupProps> = ({ onJourneyCreated, onCancel, userId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const createNewJourney = async (edital: Edital) => {
        setIsLoading(true);
        setError('');
        
        const initialStatus: { [key: string]: TopicStatus } = {};
        edital.disciplines.forEach(d => {
            d.topics.forEach(t => {
                initialStatus[t.id] = {
                    pending: true,
                    pdf: false,
                    video: false,
                    law: false,
                    questions: false,
                    summary: false,
                };
            });
        });

        // Laws removed from initial data structure
        const initialStudyData = {
            sessions: [],
            questions: [],
            revisions: [],
            topicStatus: initialStatus,
        };
        
        const { data, error } = await supabase
            .from('journeys')
            .insert({
                user_id: userId,
                edital: edital,
                study_data: initialStudyData
            })
            .select()
            .single();

        if (error) {
            console.error("Error creating journey:", error);
            setError('Não foi possível criar a jornada. Tente novamente.');
            setIsLoading(false);
            return;
        }

        if (data) {
            const newJourney: Journey = {
                id: data.id,
                edital: data.edital as Edital,
                studyData: data.study_data as any, // Supabase returns jsonb, cast as needed
            };
            onJourneyCreated(newJourney);
        }
        setIsLoading(false);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // PDF processing logic would go here
        alert("O processamento de PDF ainda não está implementado, por favor selecione uma jornada pré-definida.");
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
            <div className="w-full max-w-2xl text-center relative">
                <button 
                    onClick={onCancel}
                    className="absolute left-0 top-0 -mt-12 md:-mt-0 md:-ml-12 p-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="h-6 w-6" />
                    <span className="hidden md:inline">Voltar</span>
                </button>

                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">Crie sua Nova Jornada</h1>
                <p className="text-neutral-400 mb-8">Configure um novo plano de estudos para alcançar sua aprovação.</p>
                
                <div className="bg-neutral-800/50 rounded-xl p-8 shadow-lg border border-neutral-700/50 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Opção 1: Envie seu Próprio Edital</h2>
                        <label htmlFor="file-upload" className="cursor-pointer border-2 border-dashed border-neutral-600 hover:border-primary rounded-lg p-8 flex flex-col items-center justify-center transition-colors">
                            <UploadCloud className="h-12 w-12 text-neutral-500 mb-2"/>
                            <span className="font-semibold text-primary">Clique para enviar</span>
                            <span className="text-neutral-400 text-sm">ou arraste e solte o arquivo PDF</span>
                        </label>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf"/>
                    </div>
                    
                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-neutral-700"></div>
                        <span className="flex-shrink mx-4 text-neutral-500">OU</span>
                        <div className="flex-grow border-t border-neutral-700"></div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Opção 2: Escolha um Concurso com Edital Aberto</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {predefinedContests.map(contest => (
                                <button key={contest.name} onClick={() => contest.edital && createNewJourney(contest.edital)} disabled={!contest.edital} className="p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-center">
                                    <FileJson className="h-8 w-8 mx-auto mb-2 text-secondary"/>
                                    <span className="font-semibold text-sm">{contest.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-lg">
                            <Loader2 className="h-6 w-6 animate-spin"/>
                            <span>Criando jornada...</span>
                        </div>
                    )}
                     {error && (
                        <p className="text-red-500 mt-4">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
};
