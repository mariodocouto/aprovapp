
import React from 'react';
import type { Edital, StudyData, Revision } from '../types.ts';
import { Card } from './common/Card.tsx';
import { Bell, Calendar } from 'lucide-react';

interface RevisionsProps {
    studyData: StudyData;
    setStudyData: React.Dispatch<React.SetStateAction<StudyData>>;
    edital: Edital;
}

export const Revisions: React.FC<RevisionsProps> = ({ studyData, setStudyData, edital }) => {
    const topicMap = React.useMemo(() => {
        const map = new Map<string, { topicName: string; disciplineName: string }>();
        edital.disciplines.forEach(d => {
            d.topics.forEach(t => {
                map.set(t.id, { topicName: t.name, disciplineName: d.name });
            });
        });
        return map;
    }, [edital]);

    const handleComplete = (revisionId: string) => {
        setStudyData(prev => ({
            ...prev,
            revisions: prev.revisions.map(r => r.id === revisionId ? { ...r, completed: true } : r)
        }));
    };
    
    const now = new Date();
    const pendingRevisions = studyData.revisions
        .filter(r => !r.completed && new Date(r.dueDate) <= now)
        .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const upcomingRevisions = studyData.revisions
        .filter(r => !r.completed && new Date(r.dueDate) > now)
        .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 10);

    const renderRevisionList = (revisions: Revision[]) => (
        <ul className="space-y-3">
            {revisions.map(revision => {
                const topicInfo = topicMap.get(revision.topicId);
                return (
                    <li key={revision.id} className="bg-neutral-800 p-3 rounded-lg flex justify-between items-center transition-all hover:bg-neutral-700/80">
                        <div>
                            <p className="font-semibold">{topicInfo?.topicName}</p>
                            <p className="text-sm text-neutral-400">{topicInfo?.disciplineName}</p>
                            <p className="text-xs text-secondary mt-1">Vence em: {new Date(revision.dueDate).toLocaleDateString()}</p>
                        </div>
                        <button onClick={() => handleComplete(revision.id)} className="bg-primary text-white font-bold py-1 px-3 rounded-md text-sm hover:bg-primary-700 transition-colors">
                            Revisado
                        </button>
                    </li>
                );
            })}
             {revisions.length === 0 && <p className="text-center text-neutral-400 py-4">Nenhuma revisão aqui.</p>}
        </ul>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Bell className="text-primary"/> Revisões Pendentes</h3>
                {renderRevisionList(pendingRevisions)}
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Calendar className="text-primary"/> Próximas Revisões</h3>
                {renderRevisionList(upcomingRevisions)}
            </Card>
        </div>
    );
};