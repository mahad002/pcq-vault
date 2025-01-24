"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { GitBranch, Calendar, ArrowRight } from 'lucide-react';

interface GitHubRepoItemProps {
  repoUrl: string;
  findings: Record<string, any>;
  date: Date;
}

const GitHubRepoItem: React.FC<GitHubRepoItemProps> = ({ repoUrl, findings, date }) => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('finalResults', JSON.stringify(findings));
    const url = `/code/results?finalResults=${encodeURIComponent(JSON.stringify(findings))}`;
    router.push(url);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-0.5 transition-all duration-300 hover:scale-[1.01] hover:from-purple-500/20 hover:to-pink-500/20"
    >
      <div className="relative rounded-[11px] bg-gray-900 p-4 transition-all duration-300 group-hover:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white truncate max-w-[200px]">
              {repoUrl.replace('https://github.com/', '')}
            </h3>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {date.toLocaleDateString()}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Click to view repository analysis
          </div>
          <ArrowRight className="h-5 w-5 text-purple-400 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-purple-500/5"></div>
      </div>
    </div>
  );
};

export default GitHubRepoItem;