"use client";
import DetectedAlgo from '@/components/DetectedAlgo';
import RiskChart from '@/components/RiskGraph';
import DetectedAlgoCount from '@/components/DetectedAlgoCount';
import { useSearchParams } from 'next/navigation';
import { useSelector } from "react-redux";
import CalculateResults from './calculateResults';
import CardDetails from '@/components/CardDetails';
import Navbar from '@/app/navbar/page';
import { Suspense } from 'react';

function ResultsContent() {
    const searchParams = useSearchParams();
    const mappedResults = useSelector((state: any) => state.results);
    let finalResults;

    // Retrieve search parameter
    const finalResultsParam = searchParams.get('finalResults');

    if (finalResultsParam) {
        // Use data from the search params if available
        finalResults = JSON.parse(decodeURIComponent(finalResultsParam));
        console.log("Using finalResults from search params:", finalResults);
    } else {
        // Otherwise, fallback to Redux state
        console.log("Using mappedResults from Redux:", mappedResults);
        const lines = mappedResults.lines;
        console.log("Number of lines:", lines);

        // Calculate final results using the Redux data
        finalResults = CalculateResults(mappedResults);
        console.log("Calculated finalResults:", finalResults);
    }

    return (
        <div className='bg-blue-50'>
            <Navbar />
            <div className='bg-blue-100 min-h-screen text-black'>
                <div>
                    <CardDetails result={finalResults.card} />
                </div>
                <div className='text-black bg-blue-50'>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold p-3'>Risk Levels</h1>
                        <RiskChart result={finalResults.riskLevels} />
                    </div>
                    <DetectedAlgo result={finalResults.detectedAlgoTable} />
                    <DetectedAlgoCount result={finalResults.detectedAlgoCount} />
                </div>
            </div>
        </div>
    );
}

export default function Results() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultsContent />
        </Suspense>
    );
}