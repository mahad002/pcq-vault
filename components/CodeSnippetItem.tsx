import React from 'react';
import { useRouter } from 'next/navigation'; // Use this for Next.js routing

// Define the types for props
interface CodeSnippetItemProps {
  codeSnippet: {
    mappedResults: Array<{
      lines: number;
      fileName: string;
      filteredResults: object; // Define more specific types if necessary
    }>;
  };
  analysisResult: any; // Define more specific types if you know the structure
  date: any; // Assuming date is a string (ISO format)
}

const CodeSnippetItem = ({ codeSnippet, analysisResult, date }: CodeSnippetItemProps) => {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Construct the URL with query parameters
    localStorage.setItem('finalResults', JSON.stringify(analysisResult)); // Store the analysis result in local storage
    const url = `/code/results?finalResults=${encodeURIComponent(JSON.stringify(analysisResult))}`;
    router.push(url); // Navigate to the Results component with the URL
  };

  return (
    <li 
      className='mb-4 cursor-pointer border border-black hover:scale-105 transition-transform duration-200' 
      onClick={handleClick}>
      {codeSnippet.mappedResults.map((result, index) => (
        <div key={index}>
          <strong className='text-gray-800'>File Name:</strong> {result.fileName} <br />
          {/* <strong className='text-gray-800'>Lines:</strong> {result.lines} <br /> */}
        </div>
      ))}
    </li>
  );
};

export default CodeSnippetItem;
