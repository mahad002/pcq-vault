// /url/results
"use client";
import CipherTable from "@/components/CipherTable";
import DonutChart from "@/components/Donut";
import HorizontalBar from "@/components/HorizontalBar";
import ProtocolSupportTable from "@/components/ProtocolSupportTable";
import BarChart from "@/components/VerticalBar";
import { useSelector } from "react-redux";
import Navbar from "@/app/navbar/page";
import Link from "next/link";
import { Suspense } from "react";

function Results() {
    // Get the mapped results from Redux store
    const mappedResults = useSelector((state: any) => state.results.mappedResults);

    // Use the mapped results directly
    const result = mappedResults;

    return (
        <div className="bg-blue-50">
            <Navbar />
            <div className="flex flex-row w-full gap-x-40 justify-center h-32">
                <div>
                    <h1 className="text-2xl text-center p-2">Website:</h1>
                    <h1 className="text-3xl text-blue-900 font-bold">{result?.url || "No URL found"}</h1>
                </div>
                <div>
                    <h1 className="text-2xl text-center p-2">Grade:</h1>
                    <h1 className="text-3xl text-blue-900 font-bold text-center">{result?.grade || "No grade available"}</h1>
                </div>
                <Link
                    className="text-xl text-center p-4 font-bold text-black hover:text-blue-900"
                    href={`/url/urlscan`}
                >
                    Scan for more Websites!
                </Link>
            </div>

            <div className="grid grid-cols-3">
                <div>
                    <h1 className="text-2xl text-center p-2 font-bold">Supported Cipher Suites</h1>
                    <CipherTable result={result} />
                </div>
                <div>
                    <h1 className="text-2xl text-center p-2 font-bold">Cipher Suite Security</h1>
                    <DonutChart result={result} />
                </div>
                <div>
                    <h1 className="text-2xl text-center p-2 font-bold">Protocol Support</h1>
                    <ProtocolSupportTable result={result} />
                </div>
            </div>

            <div className="grid grid-cols-2">
                <div>
                    <h1 className="text-2xl text-center p-2 font-bold">Supported Variants and Bit Security</h1>
                    <BarChart result={result} />
                </div>
                <div>
                    <h1 className="text-2xl text-center p-2 font-bold">Pre-Quantum vs Post Quantum</h1>
                    <HorizontalBar result={result} />
                </div>
            </div>
        </div>
    );
}

export default function UrlResults() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Results />
        </Suspense>
    );
}
