"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import store, {setMappedResults} from "@/app/store/store";
import { createAlert, logActivity } from '@/lib/alerts';
import { Loader2 } from 'lucide-react';
import parserImp from "../../services/utils/parserImp";
import { Lookup } from "../../services/utils/lookup";

interface GithubExplorerProps {
  owner: string;
  repo: string;
}

interface RepositoryInfo {
  owner: string;
  repo: string;
}

const GithubExplorer: React.FC<GithubExplorerProps> = () => {
  const [repositoryUrl, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filesRead, setFilesRead] = useState(0);
  const [foldersRead, setFoldersRead] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('url', repositoryUrl);
  }, [repositoryUrl]);

  const handleGetOwnerAndRepo = (repositoryUrl: string): RepositoryInfo | null => {
    try {
      const parsedUrl = new URL(repositoryUrl);
      const pathParts = parsedUrl.pathname.split('/').filter(part => part !== '');
      const owner = pathParts[0];
      const repo = pathParts[1];
      return { owner, repo };
    } catch (error) {
      console.error("Error parsing repository URL:", error);
      return null;
    }
  };

  const fetchRepositoryContents = async (owner: string, repo: string, path: string) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch repository contents');
      return await response.json();
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      throw error;
    }
  };

  const fetchDefaultBranch = async (owner: string, repo: string) => {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch repository information');
      const data = await response.json();
      return data.default_branch;
    } catch (error) {
      console.error('Error fetching repository information:', error);
      throw error;
    }
  };

  const fetchAndDisplayFile = async (owner: string, repo: string, path: string): Promise<string> => {
    try {
      const defaultBranch = await fetchDefaultBranch(owner, repo);
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${path}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch file contents');
      return await response.text();
    } catch (error) {
      console.error('Error fetching file contents:', error);
      return "";
    }
  };

  const isSupportedFileType = (fileName: string): boolean => {
    const supportedExtensions = [".py"];
    const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
    return supportedExtensions.includes(fileExtension);
  };

  const parseAndProcessContents = async (fileName: string, content: string) => {
    try {
      await parserImp.init();
      const parser = parserImp.getParser();
      const tree = parser.parse(content);
      const root = Lookup(tree.rootNode);
      let res = {};
      res = root.traverse(res, "");

      const lines = content.split("\n").length;
      const filteredResults = Object.entries(res)
        .filter(([key, value]) => (value as { grade?: any }).grade !== undefined)
        .reduce((obj: { [key: string]: any }, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      return {
        fileName,
        lines,
        filteredResults,
      };
    } catch (error) {
      console.error(`Error processing file ${fileName}:`, error);
      return null;
    }
  };

  const traverseDirectory = async (owner: string, repo: string, path: string): Promise<any[]> => {
    try {
      const contents = await fetchRepositoryContents(owner, repo, path);
      const mappedResults = [];

      for (const item of contents) {
        if (item.type === "dir") {
          setFoldersRead(prev => prev + 1);
          const subDirResults = await traverseDirectory(owner, repo, item.path);
          mappedResults.push(...subDirResults);
        } else if (item.type === "file" && isSupportedFileType(item.name)) {
          setFilesRead(prev => prev + 1);
          const content = await fetchAndDisplayFile(owner, repo, item.path);
          const result = await parseAndProcessContents(item.name, content);
          if (result) mappedResults.push(result);
        }
      }

      return mappedResults;
    } catch (error) {
      console.error('Error traversing directory:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const email = localStorage.getItem('email');
    
    if (!email) {
      router.push('/profile');
      return;
    }

    try {
      await createAlert(email, 'info', `Starting analysis of repository: ${repositoryUrl}`);
      await logActivity(email, 'github_analysis_started', { repositoryUrl });

      const extractedInfo = handleGetOwnerAndRepo(repositoryUrl);
      if (!extractedInfo) {
        throw new Error('Invalid repository URL');
      }

      const { owner, repo } = extractedInfo;
      const results = await traverseDirectory(owner, repo, "");
      
      dispatch(setMappedResults(results));
      localStorage.setItem('url', repositoryUrl);

      await createAlert(email, 'success', `Successfully analyzed repository: ${repositoryUrl}`);
      await logActivity(email, 'github_analysis_completed', { 
        repositoryUrl, 
        filesAnalyzed: filesRead,
        foldersScanned: foldersRead 
      });

      router.push("/code/results");
    } catch (error: any) {
      console.error("Error analyzing repository:", error);
      await createAlert(email, 'error', `Failed to analyze repository: ${repositoryUrl}`);
      await logActivity(email, 'github_analysis_failed', { 
        repositoryUrl, 
        error: error.message 
      });
    } finally {
      setIsLoading(false);
      setFilesRead(0);
      setFoldersRead(0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-6">
      <div className="w-full">
        <input 
          type="text" 
          placeholder="https://github.com/owner/repo"
          value={repositoryUrl} 
          onChange={event => setUrl(event.target.value)}
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      
      {isLoading && (
        <div className="text-gray-300 text-sm">
          <p>Files analyzed: {filesRead}</p>
          <p>Folders scanned: {foldersRead}</p>
        </div>
      )}
      
      <button 
        onClick={handleSubmit}
        disabled={isLoading || !repositoryUrl.trim()}
        className={`w-full max-w-xs px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200
          ${isLoading || !repositoryUrl.trim()
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          'Analyze Repository'
        )}
      </button>
    </div>
  );
};

export default GithubExplorer;