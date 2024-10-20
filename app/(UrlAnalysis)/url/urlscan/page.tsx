"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import store, { setMappedResults } from "@/app/store/store";
import Image from "next/image";

export default function UrlScan() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState<any>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Define both backend URLs
        let backendUrl1 = `${process.env.NEXT_PUBLIC_API_URL_1}/analyze_ciphers?url=${url}`;
        let backendUrl2 = `${process.env.NEXT_PUBLIC_API_URL_2}/analyze_ciphers?url=${url}`;

        try {
            console.log("Fetching data from: ", backendUrl1, "and", backendUrl2);
            
            // Fetch data from both APIs
            const [response1, response2] = await Promise.all([
                fetch(backendUrl1),
                fetch(backendUrl2)
            ]);

            // Check if both responses are okay
            if (!response1.ok || !response2.ok) {
                console.error("Failed to fetch data from one or both APIs");
                return;
            }

            // Convert both responses to JSON
            const data1 = await response1.json();
            const data2 = await response2.json();

            console.log("Fetching data from 1: ", data1);
            console.log("Fetching data from 2: ", data2);

            // Combine the data from both APIs
            const combinedData = {
                ...data1,
                ...data2,
                url: url
            };

            console.log("Combined data: ", combinedData);

            // Set the result and update the Redux store
            setResult(combinedData);
            dispatch(setMappedResults(combinedData));

            console.log("Store state: ", store.getState().results);

            const email = localStorage.getItem('username');
            if (email) {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                const apiUrl = `${baseUrl}/api/users/url-analysis`; // Check URL existence
                const token = localStorage.getItem('token');
                const result = combinedData;

                // Proceed to store the analysis result since the URL doesn't exist
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ email, url, result })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Url Scan analysis result added', data);
                })
                .catch(error => {
                    console.error('Error adding url scan analysis result', error);
                });
            }

            // Redirect to results page
            router.push("/url/results");

        } catch (error) {
            console.error("An error occurred: ", error);
        }

    };
    

    return (
        <div className='grid grid-rows-3 gap-y-4 bg-black bg-url1 h-screen '>
            <h1 className="text-center text-2xl text-clip py-5 px-4 text-white font-bold">
                Scan web applications for quantum vulnerabilities and gain insights into cryptographic weaknesses, including weak, strong, and recommended cipher suites. Additionally, compare the security of cipher suites in both pre-quantum and post-quantum contexts
            </h1>
            <div className='w-full justify-center gap-y-5 py-4'>
                <div className='flex justify-center items-center'>
                    <h1 className='text-center font-bold text-m text-white'>Scan your Website:</h1>
                    <form className='flex space-x-2' onSubmit={handleSubmit}>
                        <input
                            id="url-input"
                            type="text"
                            value={url}
                            onChange={handleUrlChange}
                            className='border border-black rounded-md px-3 flex-shrink-0'
                        />
                        <button type="submit" className='bg-white hover:bg-gray-200 border border-black rounded-md px-2'>
                            Analyze
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
