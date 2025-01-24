"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FileCode, Calendar, ArrowRight } from 'lucide-react';

interface CodeSnippetItemProps {
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

const CodeSnippetItem: React.FC<CodeSnippetItemProps> = ({ codeSnippet, analysisResult, date }) => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('finalResults', JSON.stringify(analysisResult));
    const url = `/code/results?finalResults=${encodeURIComponent(JSON.stringify(analysisResult))}`;
    router.push(url);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-0.5 transition-all duration-300 hover:scale-[1.01] hover:from-green-500/20 hover:to-emerald-500/20"
    >
      <div className="relative rounded-[11px] bg-gray-900 p-4 transition-all duration-300 group-hover:bg-gray-800">
        <div className="space-y-3">
          {codeSnippet.mappedResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileCode className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white truncate max-w-[200px]">
                  {result.fileName}
                </h3>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {date.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-700 pt-2">
          <div className="text-sm text-gray-400">
            Click to view analysis results
          </div>
          <ArrowRight className="h-5 w-5 text-green-400 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>

        <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-green-500/5"></div>
      </div>
    </div>
  );
};

export default CodeSnippetItem;