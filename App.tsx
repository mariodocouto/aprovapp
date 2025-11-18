
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './services/supabase.ts';
import type { Session } from '@supabase/supabase-js';

import { JourneySelection } from './components/JourneySelection.tsx';
import { LoginPage } from './components/LoginPage.tsx';

const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-neutral-900">
                <p className="text-white">Carregando...</p>
            </div>
        );
    }

    if (!session) {
        return <LoginPage />;
    }

    return <JourneySelection user={session.user} />;
};

export default App;