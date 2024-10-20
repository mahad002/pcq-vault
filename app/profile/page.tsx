"use client"; 

import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/page';
import CodeSnippetItem from '@/components/CodeSnippetItem';
import AnalysisItem from '@/components/AnalysisItem';
import GitHubRepoItem from '@/components/GitHubRepoItem';
import { Provider } from 'react-redux';
import store from '../store/store';

// Define the structure for URL analysis data
interface UrlAnalysis {
    url: string; // URL to be analyzed
    result: any; // Analysis result
    date: Date; // Date of analysis
}

// Define the structure for code analysis data
interface CodeAnalysis {
    codeSnippet: string; // Code snippet to be analyzed
    analysisResult: any; // Analysis result
    date: Date; // Date of analysis
}

// Define the structure for GitHub repository analysis data
interface GithubRepoAnalysis {
    repoUrl: string; // URL of the GitHub repository
    findings: any; // Analysis findings
    date: Date; // Date of analysis
}

// Define the overall user history structure
interface UserHistory {
    urlAnalysisHistory: UrlAnalysis[];
    codeAnalysisHistory: CodeAnalysis[];
    githubRepoAnalysisHistory: GithubRepoAnalysis[];
}

const ProfilePage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [urlAnalysisHistory, setUrlAnalysisHistory] = useState<UrlAnalysis[]>([]);
    const [codeAnalysisHistory, setCodeAnalysisHistory] = useState<CodeAnalysis[]>([]);
    const [githubRepoAnalysisHistory, setGithubRepoAnalysisHistory] = useState<GithubRepoAnalysis[]>([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            fetchUserHistory(); // Fetch user history when component mounts
        }
    }, []);

    const fetchUserHistory = async () => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('username');

        console.log("HISTORY");

        if (!token) {
            console.error('Token is required');
            return;
        }

        if (!email) {
            console.error('Email is required');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/history`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email, token })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch user history');
            }
    
            const data: UserHistory = await response.json();
            
            // Convert date strings to Date objects
            setUrlAnalysisHistory(data.urlAnalysisHistory.map(item => ({
                ...item,
                date: new Date(item.date) // Convert to Date
            })));
    
            setCodeAnalysisHistory(data.codeAnalysisHistory.map(item => ({
                ...item,
                date: new Date(item.date) // Convert to Date
            })));
    
            setGithubRepoAnalysisHistory(data.githubRepoAnalysisHistory.map(item => ({
                ...item,
                date: new Date(item.date) // Convert to Date
            })));
        } catch (error) {
            console.error('Error fetching user history:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', email);
                setUsername(email);
                fetchUserHistory();
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            if (data.userId) {
                localStorage.setItem('username', email);
                setUsername(email);
                await handleLogin(); // Call login automatically on successful signup
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    if (!username) {
        return (
            <div>
                <Navbar />
                <div className='relative flex justify-center items-center'>
                    <video
                        className="min-w-full h-screen absolute object-cover"
                        src='/video.mp4'
                        autoPlay
                        muted
                        loop
                    />
                    <div className='flex flex-col items-center justify-center min-h-screen' style={{ zIndex: 1 }}>
                        <h2 className='text-3xl font-semibold text-white mb-5'>Login / Signup</h2>
                        <div className='bg-transparent rounded-lg shadow-md p-8 w-full max-w-sm'>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={handleLogin}
                                className='bg-blue-500 text-white rounded-md p-2 mb-4 w-full hover:bg-blue-600 transition duration-200'
                            >
                                Login
                            </button>
                            <button
                                onClick={handleSignup}
                                className='bg-green-500 text-white rounded-md p-2 w-full hover:bg-green-600 transition duration-200'
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        
        <Provider store={store}>
            <div>
            <Navbar />
            <div className='relative flex justify-center items-center'>
                <video
                    className="min-w-full h-screen absolute object-cover"
                    src='/video.mp4'
                    autoPlay
                    muted
                    loop
                />
                <div className='flex flex-col items-center justify-center min-h-screen p-5' style={{ zIndex: 1 }}>
                    <h2 className='text-3xl font-semibold text-white mb-5'>Welcome, {username}</h2>
                    <h3 className='text-xl font-semibold text-white mb-3'>URL Analysis History</h3>
                    <ul className='bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md'>
                        {urlAnalysisHistory.map((item, index) => (
                            <AnalysisItem
                                key={index}
                                url={item.url}
                                result={item.result}
                                date={item.date}
                            />
                        ))}
                    </ul>
                    <h3 className='text-xl font-semibold text-white mb-3'>Code Analysis History</h3>
                    <ul className='bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md'>
                        {codeAnalysisHistory.map((item) => (
                            <CodeSnippetItem
                                key={item.codeSnippet}
                                codeSnippet={item.codeSnippet as any}
                                analysisResult={item.analysisResult}
                                date={item.date}
                            />
                        ))}
                    </ul>
                    <h3 className='text-xl font-semibold text-white mb-3'>GitHub Repo Analysis History</h3>
                    <ul className='bg-white bg-opacity-80 rounded-lg p-5 shadow-md w-full max-w-md'>
                        {githubRepoAnalysisHistory.map((item, index) => (
                            <GitHubRepoItem
                                key={index}
                                repoUrl={item.repoUrl}
                                findings={item.findings}
                                date={item.date}
                        />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </Provider>


    );
};

export default ProfilePage;
