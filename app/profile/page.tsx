"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/page';
import CodeSnippetItem from '@/components/CodeSnippetItem';
import AnalysisItem from '@/components/AnalysisItem';
import GitHubRepoItem from '@/components/GitHubRepoItem';
import { Provider } from 'react-redux';
import store from '../store/store';

// Import newly created components for Registration and Login
import RegistrationPage from './RegistrationPage';
import LoginPage from './LoginPage';

interface UrlAnalysis {
    url: string;
    result: any;
    date: Date;
}

interface CodeAnalysis {
    codeSnippet: {
        mappedResults: Array<{
            lines: number;
            fileName: string;
            filteredResults: object;
        }>;
    };
    analysisResult: any;
    date: Date;
}

interface GithubRepoAnalysis {
    repoUrl: string;
    findings: any;
    date: Date;
}

interface UserHistory {
    urlAnalysisHistory: UrlAnalysis[];
    codeAnalysisHistory: CodeAnalysis[];
    githubRepoAnalysisHistory: GithubRepoAnalysis[];
}

const ProfilePage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [urlAnalysisHistory, setUrlAnalysisHistory] = useState<UrlAnalysis[]>([]);
    const [codeAnalysisHistory, setCodeAnalysisHistory] = useState<CodeAnalysis[]>([]);
    const [githubRepoAnalysisHistory, setGithubRepoAnalysisHistory] = useState<GithubRepoAnalysis[]>([]);
    const [view, setView] = useState<'login' | 'register' | 'profile'>('login');

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedToken = localStorage.getItem('token');
        console.log("Email: ", storedEmail)
        if (storedEmail && storedToken) {
            setUsername(storedEmail);
            setView('profile');
            fetchUserHistory(storedEmail, storedToken); // Fetch history on initial load if user is logged in
        }
    }, []);

    // Fetch user history function with email and token
    const fetchUserHistory = async (email: string, token: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email, token }),
            });

            if (!response.ok) throw new Error('Failed to fetch user history');
            const data: UserHistory = await response.json();

            // Map dates from strings to Date objects
            setUrlAnalysisHistory(data.urlAnalysisHistory.map(item => ({ ...item, date: new Date(item.date) })));
            setCodeAnalysisHistory(data.codeAnalysisHistory.map(item => ({ ...item, date: new Date(item.date) })));
            setGithubRepoAnalysisHistory(data.githubRepoAnalysisHistory.map(item => ({ ...item, date: new Date(item.date) })));
        } catch (error) {
            console.error('Error fetching user history:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setUsername(null);
        setView('login');
    };

    const renderContent = () => {
        if (view === 'login') {
            return (
                <LoginPage
                    setUsername={(email, token) => {
                        setUsername(email);
                        localStorage.setItem('email', email);
                        localStorage.setItem('token', token); // Store token in localStorage
                        setView('profile');
                        fetchUserHistory(email, token); // Fetch history immediately after login
                    }}
                    setView={setView}
                />
            );
        }

        if (view === 'register') {
            return <RegistrationPage setView={setView} />;
        }

        // Profile View
        return (
            <Provider store={store}>
                <div>
                    <Navbar />
                    <div className="relative flex justify-center items-center">
                        <video className="min-w-full h-screen absolute object-cover" src="/video.mp4" autoPlay muted loop />
                        <div className="flex flex-col items-center justify-center min-h-screen p-5" style={{ zIndex: 1 }}>
                            <h2 className="text-3xl font-semibold text-white mb-5">Welcome, {username}</h2>
                            <h3 className="text-xl font-semibold text-white mb-3">URL Analysis History</h3>
                            <ul className="bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md">
                                {urlAnalysisHistory.map((item, index) => (
                                    <AnalysisItem key={index} url={item.url} result={item.result} date={item.date} />
                                ))}
                            </ul>
                            <h3 className="text-xl font-semibold text-white mb-3">Code Analysis History</h3>
                            <ul className="bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md">
                                {codeAnalysisHistory.map((item, index) => (
                                    <CodeSnippetItem key={index} codeSnippet={item.codeSnippet} analysisResult={item.analysisResult} date={item.date} />
                                ))}
                            </ul>
                            <h3 className="text-xl font-semibold text-white mb-3">GitHub Repo Analysis History</h3>
                            <ul className="bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md">
                                {githubRepoAnalysisHistory.map((item, index) => (
                                    <GitHubRepoItem key={index} repoUrl={item.repoUrl} findings={item.findings} date={item.date} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    };

    return <div>{renderContent()}</div>;
};

export default ProfilePage;
