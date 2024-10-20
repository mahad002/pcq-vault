import React from 'react';
import { useRouter } from 'next/navigation'; // Use this for Next.js routing

// Define the types for the props
interface GitHubRepoItemProps {
  repoUrl: string;
  findings: Record<string, any>; // Adjust type based on structure of findings
  date?: any; // Optional prop
}

const GitHubRepoItem: React.FC<GitHubRepoItemProps> = ({ repoUrl, findings, date }) => {
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    // Store the findings in local storage
    localStorage.setItem('finalResults', JSON.stringify(findings)); // You can keep this if you prefer using local storage

    // Construct the URL with query parameters
    const url = `/code/results?finalResults=${encodeURIComponent(JSON.stringify(findings))}`;
    router.push(url); // Navigate to the Results component with the URL
  };

  return (
    <li
      className='mb-4 cursor-pointer border border-black hover:scale-105 transition-transform duration-200'
      onClick={handleClick}
    >
      <strong className='text-gray-800'>Repo URL:</strong> {repoUrl} <br />
      {/* Uncomment this if needed */}
      {/* <strong className='text-gray-800'>Findings:</strong> {findings ? JSON.stringify(findings) : 'No findings available'} <br />
      <strong className='text-gray-800'>Date:</strong> {date ? new Date(date).toLocaleString() : 'No date available'} */}
    </li>
  );
};

export default GitHubRepoItem;
