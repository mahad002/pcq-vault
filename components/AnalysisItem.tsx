// components/AnalysisItem.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setMappedResults } from '@/app/store/store';

interface AnalysisItemProps {
    url: string;
    result: any;
    date: any;
}

const AnalysisItem: React.FC<AnalysisItemProps> = ({ url, result, date }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {
        // Dispatch the result to the Redux store
        dispatch(setMappedResults(result));
        
        // Navigate to the results page
        router.push('/url/results');
    };

    return (
        <li 
            className='mb-4 cursor-pointer border border-black hover:scale-105 transition-transform duration-200' 
            onClick={handleClick}
        >
            <strong className='text-gray-800'>URL:</strong> {url} <br />
            {/* Additional information can be displayed here */}
            {/* <span>{date.toString()}</span> */}
        </li>
    );
};

export default AnalysisItem;
