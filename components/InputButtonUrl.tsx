"use client";

import { useState } from "react";
import DonutChart from "../components/Donut";
import BarChart from "../components/VerticalBar";
import HorizontalBar from "../components/HorizontalBar";
import CipherTable from "../components/CipherTable";
import ProtocolSupportTable from "../components/ProtocolSupportTable";

export default function InputButtonUrl() {
    const [url, setUrl] = useState<string>(''); // Set types for states
    const [result, setResult] = useState<any>(''); // You may replace 'any' with a more specific type if known

    // Define type for event parameter
    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let backendUrl = `http://3.110.117.175:8000/analyze_ciphers?url=${url}`;
        const response = await fetch(backendUrl);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setResult(data);
    };

    return (
        <div>
            <div>
                <form className='flex space-x-2' onSubmit={handleSubmit}>
                    <label htmlFor="url-input"></label>
                    <input 
                        id="url-input" 
                        type="text" 
                        value={url} 
                        onChange={handleUrlChange} 
                        className='border border-black rounded-md px-3 flex-shrink-0' 
                    />
                    <button type="submit" className='bg-white hover:bg-gray-200 border border-black rounded-md px-2'>Analyze</button>
                </form>
            </div>
            <div>
                <DonutChart result={result} />
                <BarChart result={result} />
                <HorizontalBar result={result} />
                <CipherTable result={result} />
                <ProtocolSupportTable result={result} />
            </div>
        </div>
    );
}
