"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import store, { setMappedResults } from "@/app/store/store";
import { createAlert, logActivity } from '@/lib/alerts';
import { Loader2 } from 'lucide-react';

export default function UrlScan() {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const email = localStorage.getItem('email');
        // if (!email) {
        //     router.push('/profile');
        //     return;
        // }

        let backendUrl1 = `${process.env.NEXT_PUBLIC_API_URL_1}/analyze_ciphers?url=${url}`;
        let backendUrl2 = `${process.env.NEXT_PUBLIC_API_URL_2}/analyze_ciphers?url=${url}`;

        try {

            if (email) {
                await createAlert(email, 'info', `Starting URL analysis for ${url}`);
                await logActivity(email, 'url_analysis_started', { url });
            }

            console.log("Fetching data from: ", backendUrl1, "and", backendUrl2);
                
                // Fetch data from both APIs
                const [response1, response2] = await Promise.all([
                    fetch(backendUrl1),
                    fetch(backendUrl2)
                ]);

                // Check if both responses are okay
                if (!response1.ok || !response2.ok) {
                    throw new Error("Failed to fetch data from one or both APIs");
                }

                // Convert both responses to JSON
                const data1 = await response1.json();
                const data2 = await response2.json();

                // Combine the data from both APIs
                const combinedData = {
                    ...data1,
                    ...data2,
                    url: url
                };

                // Set the result and update the Redux store
                dispatch(setMappedResults(combinedData));
            

            // Store analysis results
            const token = localStorage.getItem('token');
            if (email && token) {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                const apiUrl = `${baseUrl}/api/users/url-analysis`;
                
                try {
                    const storeResponse = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ 
                            email, 
                            url, 
                            result: combinedData 
                        })
                    });

                    if (!storeResponse.ok) {
                        throw new Error('Failed to store URL analysis result');
                    }

                    const data = await storeResponse.json();
                    console.log('URL analysis result stored:', data);
                    await createAlert(email, 'success', `Successfully analyzed ${url}`);
                    await logActivity(email, 'url_analysis_completed', { url, success: true });
                } catch (error) {
                    console.error('Error storing URL analysis result:', error);
                    await createAlert(email, 'warning', 'Analysis completed but failed to save results');
                    await logActivity(email, 'url_analysis_storage_failed', { url, error: error instanceof Error ? error.message : 'Unknown error' });
                }
            }

            router.push("/url/results");
        } catch (error) {
            console.error("An error occurred: ", error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            if (email) {
                await createAlert(email, 'error', `Failed to analyze ${url}: ${errorMessage}`);
                await logActivity(email, 'url_analysis_failed', { url, error: errorMessage });
            }
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full justify-center gap-y-5 py-4'>
            <div className='flex justify-center items-center'>
                <form className='flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl' onSubmit={handleSubmit}>
                    <input
                        id="url-input"
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="Enter website URL (e.g., https://example.com)"
                        className='flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isLoading}
                    />
                    <button 
                        type="submit" 
                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center min-w-[120px]'
                        disabled={isLoading || !url.trim()}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            'Analyze'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}