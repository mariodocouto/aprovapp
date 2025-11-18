
import React, { useState, useMemo } from 'react';
import type { Law, Article } from '../types.ts';
import { Card } from './common/Card.tsx';
import { Gavel, PlusCircle, BookOpen } from 'lucide-react';

interface LeiSecaProps {
    laws: Law[];
    onAddLaw: (law: Law) => void;
    onUpdateArticle: (lawId: string, articleId: string, read: boolean) => void;
}

const AddLawForm: React.FC<{ onAddLaw: (law: Law) => void }> = ({ onAddLaw }) => {
    const [name, setName] = useState('');
    const [totalArticles, setTotalArticles] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || totalArticles === '' || totalArticles <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const newArticles: Article[] = Array.from({ length: totalArticles }, (_, i) => ({
            id: `art-${Date.now()}-${i + 1}`,
            number: i + 1,
            read: false,
        }));

        const newLaw: Law = {
            id: `law-${Date.now()}`,
            name,
            articles: newArticles,
        };

        onAddLaw(newLaw);
        setName('');
        setTotalArticles('');
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><PlusCircle className="text-primary"/> Adicionar Lei</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="lawName" className="block text-sm font-medium text-neutral-300 mb-1">Nome da Lei / Código</label>
                    <input type="text" id="lawName" value={name} onChange={e => setName(e.target.value)} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white" placeholder="Ex: Constituição Federal"/>
                </div>
                <div>
                    <label htmlFor="totalArticles" className="block text-sm font-medium text-neutral-300 mb-1">Número de Artigos</label>
                    <input type="number" id="totalArticles" value={totalArticles} onChange={e => setTotalArticles(Number(e.target.value))} className="w-full bg-neutral-700 border-neutral-600 rounded-md p-2 text-white" placeholder="Ex: 250"/>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">Adicionar</button>
            </form>
        </Card>
    );
};

const LawViewer: React.FC<{ law: Law; onUpdateArticle: (lawId: string, articleId: string, read: boolean) => void; }> = ({ law, onUpdateArticle }) => {
    const progress = useMemo(() => {
        const readCount = law.articles.filter(a => a.read).length;
        return law.articles.length > 0 ? (readCount / law.articles.length) * 100 : 0;
    }, [law.articles]);

    return (
        <Card className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><BookOpen className="text-primary"/> {law.name}</h3>
            <div className="mb-4">
                 <div className="w-full h-2.5 bg-neutral-700 rounded-full">
                    <div className="h-2.5 bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-right text-sm font-semibold mt-1">{progress.toFixed(1)}% lido</p>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
                 <div className="space-y-2">
                    {law.articles.map(article => (
                        <label key={article.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-800 cursor-pointer">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-primary focus:ring-primary"
                                checked={article.read}
                                onChange={e => onUpdateArticle(law.id, article.id, e.target.checked)}
                            />
                            <span>Art. {article.number}º</span>
                        </label>
                    ))}
                </div>
            </div>
        </Card>
    );
};


export const LeiSeca: React.FC<LeiSecaProps> = ({ laws, onAddLaw, onUpdateArticle }) => {
    const [selectedLawId, setSelectedLawId] = useState<string | null>(laws[0]?.id || null);

    const selectedLaw = useMemo(() => laws.find(l => l.id === selectedLawId), [laws, selectedLawId]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-150px)]">
            <div className="lg:col-span-1 flex flex-col gap-6">
                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Gavel className="text-primary"/> Suas Leis</h3>
                    <ul className="space-y-2">
                        {laws.map(law => (
                            <li key={law.id}>
                                <button onClick={() => setSelectedLawId(law.id)} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedLawId === law.id ? 'bg-primary text-white' : 'bg-neutral-800 hover:bg-neutral-700'}`}>
                                    {law.name}
                                </button>
                            </li>
                        ))}
                         {laws.length === 0 && <p className="text-center text-neutral-400 py-4">Nenhuma lei cadastrada.</p>}
                    </ul>
                </Card>
                <AddLawForm onAddLaw={onAddLaw} />
            </div>
            <div className="lg:col-span-2">
                {selectedLaw ? (
                    <LawViewer law={selectedLaw} onUpdateArticle={onUpdateArticle} />
                ) : (
                    <Card className="flex items-center justify-center h-full">
                        <div className="text-center text-neutral-500">
                            <Gavel size={48} className="mx-auto mb-4" />
                            <h2 className="text-xl font-semibold">Selecione ou adicione uma lei para começar</h2>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};