"use client";

import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/page';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Link2, FileCode, LogOut, UserCircle } from 'lucide-react';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import AnalysisItem from '@/components/AnalysisItem';
import CodeSnippetItem from '@/components/CodeSnippetItem';
import GitHubRepoItem from '@/components/GitHubRepoItem';

interface UrlAnalysis {
  url: string;
  result: any;
  date: Date;
}

interface CodeAnalysis {
  codeSnippet: any;
  analysisResult: any;
  date: Date;
}

interface GithubRepoAnalysis {
  repoUrl: string;
  findings: any;
  date: Date;
}

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [view, setView] = useState<'login' | 'register' | 'profile'>('login');
  const [urlAnalysisHistory, setUrlAnalysisHistory] = useState<UrlAnalysis[]>([]);
  const [codeAnalysisHistory, setCodeAnalysisHistory] = useState<CodeAnalysis[]>([]);
  const [githubRepoAnalysisHistory, setGithubRepoAnalysisHistory] = useState<GithubRepoAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    
    if (email && token) {
      setUsername(email);
      setView('profile');
      fetchUserHistory(email, token);
    } else {
      setView('login');
      setIsLoading(false);
    }
  }, []);

  const fetchUserHistory = async (email: string, token: string) => {
    try {
      console.log("Fetching History!")
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) throw new Error('Failed to fetch user history');
      const data = await response.json();

      console.log("History: ", response)

      // Map dates from strings to Date objects
      setUrlAnalysisHistory(data.urlAnalysisHistory.map((item: { date: string | number | Date; }) => ({ ...item, date: new Date(item.date) })));
      setCodeAnalysisHistory(data.codeAnalysisHistory.map((item: { date: string | number | Date; }) => ({ ...item, date: new Date(item.date) })));
      setGithubRepoAnalysisHistory(data.githubRepoAnalysisHistory.map((item: { date: string | number | Date; }) => ({ ...item, date: new Date(item.date) })));
    } catch (error) {
      console.error('Error fetching user history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setUsername(null);
      setView('login');
      router.push('/');
    }
  };

  if (view === 'login') {
    return <LoginPage setUsername={(email: string, token: string) => {
      setUsername(email);
      setView('profile');
    }} setView={setView} />;
  }

  if (view === 'register') {
    return <RegistrationPage setView={setView} />;
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Navbar />
        <div className="relative">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            src="/video.mp4"
            autoPlay
            muted
            loop
          />
          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <UserCircle className="h-12 w-12 text-blue-400" />
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    Welcome, <span className="text-blue-400">{username}</span>
                  </h1>
                  <p className="text-gray-400 text-sm">Manage your security analysis history</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 flex items-center space-x-2 group"
              >
                <LogOut className="h-5 w-5 group-hover:rotate-180 transition-transform duration-200" />
                <span className="font-semibold">Sign Out</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 bg-white/10 backdrop-blur-lg border-none text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <History className="mr-2" /> Recent URL Analysis
                </h2>
                <ScrollArea className="h-[300px]">
                  {isLoading ? (
                    <p className="text-gray-400 text-center py-4">Loading...</p>
                  ) : urlAnalysisHistory.length > 0 ? (
                    <ul className="space-y-4">
                      {urlAnalysisHistory.map((analysis, index) => (
                        <AnalysisItem
                          key={index}
                          url={analysis.url}
                          result={analysis.result}
                          date={analysis.date}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No URL analysis history available</p>
                  )}
                </ScrollArea>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-lg border-none text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FileCode className="mr-2" /> Recent Code Analysis
                </h2>
                <ScrollArea className="h-[300px]">
                  {isLoading ? (
                    <p className="text-gray-400 text-center py-4">Loading...</p>
                  ) : codeAnalysisHistory.length > 0 ? (
                    <ul className="space-y-4">
                      {codeAnalysisHistory.map((analysis, index) => (
                        <CodeSnippetItem
                          key={index}
                          codeSnippet={analysis.codeSnippet}
                          analysisResult={analysis.analysisResult}
                          date={analysis.date}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No code analysis history available</p>
                  )}
                </ScrollArea>
              </Card>

              <Card className="p-6 bg-white/10 backdrop-blur-lg border-none text-white">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Link2 className="mr-2" /> GitHub Repository Analysis
                </h2>
                <ScrollArea className="h-[300px]">
                  {isLoading ? (
                    <p className="text-gray-400 text-center py-4">Loading...</p>
                  ) : githubRepoAnalysisHistory.length > 0 ? (
                    <ul className="space-y-4">
                      {githubRepoAnalysisHistory.map((analysis, index) => (
                        <GitHubRepoItem
                          key={index}
                          repoUrl={analysis.repoUrl}
                          findings={analysis.findings}
                          date={analysis.date}
                        />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-center py-4">No repository analysis history available</p>
                  )}
                </ScrollArea>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default ProfilePage;