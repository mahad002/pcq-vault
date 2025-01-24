"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMappedResults } from '@/app/store/store';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';

interface AnalysisItemProps {
    url: string;
    result: any;
    date: Date;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({ url, result, date }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setMappedResults(result));
        router.push('/url/results');
    };

    return (
        <div 
            onClick={handleClick}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-0.5 transition-all duration-300 hover:scale-[1.01] hover:from-blue-500/20 hover:to-purple-500/20"
        >
            <div className="relative rounded-[11px] bg-gray-900 p-4 transition-all duration-300 group-hover:bg-gray-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <ExternalLink className="h-5 w-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white truncate max-w-[200px]">
                            {url}
                        </h3>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {date.toLocaleDateString()}
                    </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                        Click to view detailed analysis
                    </div>
                    <ArrowRight className="h-5 w-5 text-blue-400 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:bg-blue-500/5"></div>
            </div>
        </div>
    );
};

export default AnalysisItem;