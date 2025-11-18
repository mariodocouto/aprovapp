
import React from 'react';
import { Card } from './common/Card.tsx';
import { Trophy, Shield, Flame } from 'lucide-react';

// Mock data for demonstration
const leaderboardData = [
    { rank: 1, name: 'Concurseiro_Jedi', score: '125h', avatar: `https://picsum.photos/seed/1/40/40` },
    { rank: 2, name: 'Futura_Servidora', score: '118h', avatar: `https://picsum.photos/seed/2/40/40` },
    { rank: 3, name: 'Você', score: '105h', avatar: `https://picsum.photos/seed/you/40/40` },
    { rank: 4, name: 'Aprovado_2024', score: '99h', avatar: `https://picsum.photos/seed/4/40/40` },
    { rank: 5, name: 'Foco_Total', score: '95h', avatar: `https://picsum.photos/seed/5/40/40` },
];

const groupsData = [
    { name: 'Rumo ao TJ-SP', members: 42, icon: Shield },
    { name: 'Carreiras Policiais BR', members: 157, icon: Shield },
    { name: 'Área Fiscal Elite', members: 89, icon: Shield },
];

const achievementsData = [
    { name: 'Maratonista', description: 'Estude por 100 horas', achieved: true, icon: Flame },
    { name: 'Sniper', description: 'Acerte 90% em 1000 questões', achieved: true, icon: Trophy },
    { name: 'Madrugador', description: 'Comece a estudar antes das 6h', achieved: false, icon: Flame },
    { name: 'Consistência', description: 'Estude 30 dias seguidos', achieved: false, icon: Trophy },
];

export const Arena: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="text-yellow-400"/> Ranking Mensal (Horas Líquidas)</h3>
                    <ul className="space-y-2">
                        {leaderboardData.map(user => (
                            <li key={user.rank} className={`flex items-center p-3 rounded-lg ${user.name === 'Você' ? 'bg-primary/30' : 'bg-neutral-800'}`}>
                                <span className="font-bold w-8">{user.rank}</span>
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-4"/>
                                <span className="flex-1 font-semibold">{user.name}</span>
                                <span className="font-bold text-primary">{user.score}</span>
                            </li>
                        ))}
                    </ul>
                </Card>

                 <Card>
                    <h3 className="text-xl font-bold mb-4">Suas Conquistas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {achievementsData.map(ach => (
                            <div key={ach.name} className={`flex flex-col items-center text-center p-4 rounded-lg ${ach.achieved ? 'bg-green-500/20' : 'bg-neutral-700'}`}>
                                <ach.icon className={`h-8 w-8 mb-2 ${ach.achieved ? 'text-green-400' : 'text-neutral-400'}`} />
                                <p className="font-bold">{ach.name}</p>
                                <p className="text-xs text-neutral-400">{ach.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
            
            <div className="lg:col-span-1">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Grupos de Estudo</h3>
                    <ul className="space-y-3">
                        {groupsData.map(group => (
                            <li key={group.name} className="bg-neutral-800 p-3 rounded-lg flex items-center gap-4">
                               <div className="p-2 bg-secondary/20 rounded-lg">
                                    <group.icon className="h-6 w-6 text-secondary"/>
                                </div>
                                <div>
                                    <p className="font-semibold">{group.name}</p>
                                    <p className="text-sm text-neutral-400">{group.members} membros</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <button className="w-full mt-4 bg-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors">
                        Criar ou Encontrar Grupos
                    </button>
                </Card>
            </div>
        </div>
    );
};