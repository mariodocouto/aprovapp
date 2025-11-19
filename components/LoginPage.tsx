
import React, { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase.ts';
import { LogIn, UserPlus, AlertTriangle, User, FileText, Copy, Check, Info } from 'lucide-react';
import { Logo } from './common/Logo.tsx';

export const LoginPage: React.FC = () => {
    const [emailOrCpf, setEmailOrCpf] = useState('');
    const [fullName, setFullName] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        // Get the current URL for Supabase configuration
        setCurrentUrl(window.location.origin);

        // Check for hash in URL (returned from Supabase email confirmation)
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
            setMessage('E-mail confirmado com sucesso! Você já pode fazer login.');
            // Optional: Clear the hash to clean up the URL
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    const copyUrlToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Função simples para formatar CPF (000.000.000-00)
    const formatCPF = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCpf(formatCPF(e.target.value));
    };

    // Remove pontuação do CPF para enviar ao banco
    const cleanCpf = (value: string) => value.replace(/\D/g, '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!isSupabaseConfigured) {
            setError('O Supabase não está configurado. Veja as instruções no topo.');
            setLoading(false);
            return;
        }

        try {
            if (isSignUp) {
                // Lógica de Cadastro
                if (cleanCpf(cpf).length !== 11) {
                    throw new Error("CPF inválido. Digite os 11 números.");
                }

                const { error } = await supabase.auth.signUp({
                    email: emailOrCpf, // No cadastro, o primeiro campo é sempre Email
                    password,
                    options: {
                        // IMPORTANTE: Isso corrige o redirecionamento para o localhost.
                        // Ele manda o usuário de volta para a URL atual do navegador.
                        emailRedirectTo: window.location.origin,
                        data: {
                            full_name: fullName,
                            cpf: cleanCpf(cpf),
                        }
                    }
                });
                if (error) throw error;
                setMessage('Cadastro realizado! Verifique seu e-mail (inclusive spam) e clique no link para ativar sua conta. Depois, volte aqui para entrar.');
                
                // Não limpamos o campo de email para facilitar o login posterior
                setPassword(''); 
                
            } else {
                // Lógica de Login (Email OU CPF)
                let emailToLogin = emailOrCpf;

                // Se o usuário digitou algo que parece CPF (apenas números ou formato de CPF)
                const justNumbers = cleanCpf(emailOrCpf);
                const isCpfInput = justNumbers.length === 11 && !emailOrCpf.includes('@');

                if (isCpfInput) {
                    // Tenta buscar o e-mail associado a esse CPF
                    const { data, error: rpcError } = await supabase.rpc('get_email_by_cpf', { 
                        cpf_input: justNumbers 
                    });

                    if (rpcError || !data) {
                        throw new Error("CPF não encontrado ou senha incorreta.");
                    }
                    emailToLogin = data; // Usa o email encontrado
                }

                const { error } = await supabase.auth.signInWithPassword({ 
                    email: emailToLogin, 
                    password 
                });
                if (error) throw error;
            }
        } catch (error: any) {
            console.error(error);
            // Tradução amigável de erros comuns
            if (error.message.includes("Invalid login credentials")) {
                setError("E-mail/CPF ou senha incorretos.");
            } else if (error.message.includes("User already registered")) {
                setError("Este e-mail já está cadastrado.");
            } else {
                setError(error.message || 'Ocorreu um erro.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    {/* Logo atualizada e maior */}
                    <Logo className="h-24 w-24 mx-auto mb-4 drop-shadow-2xl" />
                    
                    <h1 className="text-4xl font-bold text-white">AprovApp</h1>
                    
                    {/* Nova frase solicitada */}
                    <p className="text-lg font-semibold text-white mt-2">
                        O melhor App de controle de estudos do Brasil
                    </p>
                    
                    <p className="text-neutral-400 mt-2 text-sm">
                        Sua jornada para a aprovação começa aqui.
                    </p>
                </div>
                
                {!isSupabaseConfigured && (
                    <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-4 mb-6 text-left">
                        <div className="flex gap-3">
                            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-yellow-500">Configuração Necessária</h3>
                                <p className="text-sm text-yellow-200/80 mt-1">
                                    Para fazer login, verifique se as chaves no arquivo services/supabase.ts estão corretas.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-neutral-800/50 rounded-xl p-8 shadow-lg border border-neutral-700/50">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {isSignUp && (
                            <>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-300 mb-2">Nome Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required={isSignUp}
                                            className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 pl-10 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                            placeholder="Seu nome completo"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-medium text-neutral-300 mb-2">CPF</label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 h-5 w-5 text-neutral-500" />
                                        <input
                                            type="text"
                                            id="cpf"
                                            value={cpf}
                                            onChange={handleCpfChange}
                                            maxLength={14}
                                            required={isSignUp}
                                            className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 pl-10 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                                            placeholder="000.000.000-00"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                                {isSignUp ? 'E-mail' : 'E-mail ou CPF'}
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={emailOrCpf}
                                onChange={(e) => setEmailOrCpf(e.target.value)}
                                required
                                disabled={!isSupabaseConfigured}
                                className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-primary focus:border-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder={isSignUp ? "seu@email.com" : "seu@email.com ou CPF"}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">Senha</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={!isSupabaseConfigured}
                                className="w-full bg-neutral-700 border-neutral-600 rounded-md p-3 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-primary focus:border-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="********"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">{error}</p>}
                        {message && <p className="text-green-400 text-sm text-center bg-green-500/10 p-2 rounded">{message}</p>}
                        
                        <button
                            type="submit"
                            disabled={loading || !isSupabaseConfigured}
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSignUp ? <UserPlus className="h-5 w-5"/> : <LogIn className="h-5 w-5"/>}
                            <span>{loading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}</span>
                        </button>
                    </form>
                    
                    <div className="text-center mt-6 pt-6 border-t border-neutral-700">
                        <p className="text-sm text-neutral-400 mb-2">
                            {isSignUp ? 'Já tem cadastro?' : 'Ainda não tem conta?'}
                        </p>
                        <button 
                            onClick={() => { 
                                setIsSignUp(!isSignUp); 
                                setError(''); 
                                setMessage(''); 
                                setCpf('');
                                setFullName('');
                            }} 
                            disabled={!isSupabaseConfigured}
                            className="text-primary font-bold hover:text-white transition-colors disabled:opacity-50"
                        >
                            {isSignUp ? 'Fazer Login' : 'Criar Conta Gratuitamente'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Configuração de Redirecionamento Helper - Removido pois já está configurado */}
        </div>
    );
};
