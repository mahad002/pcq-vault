"use client"

import React, {useState, useEffect} from "react";
import parserImp from "../../services/utils/parserImp";
import {Lookup} from "../../services/utils/lookup";
import store, {setMappedResults} from "@/app/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';


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
    //const [repositoryInfo, setRepositoryInfo] = useState<RepositoryInfo | null>();

    useEffect(() => {
        localStorage.setItem('url', repositoryUrl);
    }, [repositoryUrl]);

    const [filesRead, setFilesRead] = useState(0);
    const [foldersRead, setFoldersRead] = useState(0);
    const [results, setResults] = useState<any[]>([]);
    const dispatch = useDispatch();
    const router = useRouter();

    // Parse the URL to extract owner and repo
    const handleGetOwnerAndRepo = (repositoryUrl: string) : RepositoryInfo | null => {
        
        try {
            const parsedUrl = new URL(repositoryUrl);
            const pathParts = parsedUrl.pathname.split('/').filter(part => part !== '');
            const owner = pathParts[0];
            const repo = pathParts[1];

            console.log("Owner and repo", owner, repo)

            return {owner, repo};
        } catch (error) {
            console.log("Error fetching owner and repo details: ",error);
            return null;
        }
        
    };

    const fetchRepositoryContents = async (
        owner: string,
        repo: string,
        path: string
    ) => {
        // existing fetchRepositoryContents logic
        //console.log("INSIDE fetchRepositoryContents")
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
            
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch repository contents.');
            }
            
            const data = await response.json();
            //console.log('Data from fetchRepocontents: ', data)
            return data;
        } catch (error) {
            console.error('Error fetching repository contents:', error);
            throw error;
        }
    };

    const fetchDefaultBranch = async (owner: string, repo: string) => {
        // existing fetchDefaultBranch logic
        const url = `https://api.github.com/repos/${owner}/${repo}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch repository information.');
                }
                
                const data = await response.json();
                return data.default_branch;
            } catch (error) {
                console.error('Error fetching repository information:', error);
                throw error;
            }
    };

    const fetchAndDisplayFile = async (
        owner: string,
        repo: string,
        path: string
    ): Promise<string> => {
        // existing fetchAndDisplayFile logic
        try {
            const defaultBranch = await fetchDefaultBranch(owner, repo);
            const url = `https://raw.githubusercontent.com/${owner}/${repo}/${defaultBranch}/${path}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch file contents.');
            }
            
            const content = await response.text();
            // Display the content or save it for display
            console.log(content);
            return content;
        } catch (error) {
            console.error('Error fetching file contents:', error);
        }
        return ""; //If you want to ensure a return value even in error cases, you can add this. We have to add this statement because
                    // we are using Promise<string> without it there is an error: Function lacks ending return statement and return type does not include 'undefined'. 
    };

    const isSupportedFileType = (fileName: string): boolean => {
        const supportedExtensions = [".py"]; // Add more extensions as needed
        const fileExtension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        return supportedExtensions.includes(fileExtension);
      };

    const parseAndProcessContents = async (fileName:string,content: string) => {
        const mappedResults = [];
        console.log("Content for parseAndProcessContents: ", fileName)
        // parserImp.init().then(() => {
        await parserImp.init();
        const parser = parserImp.getParser();
        const tree = parser.parse(content);
        const root = Lookup(tree.rootNode);
        let res = {};
        res = root.traverse(res, "");
        console.log("Result:", fileName,res);
        const lines = content.split("\n").length;
        const filteredResults = Object.entries(res)
            .filter(([key, value]) => (value as { grade?: any }).grade !== undefined)
            .reduce((obj: { [key: string]: any }, [key, value]) => {  // Type obj here
                obj[key] = value;
                return obj;
            }, {}); 
        console.log('res', filteredResults);
        const mappedResult = {
            fileName,
            lines,
            filteredResults,
            };
            console.log('mappedResult', mappedResult);
            return mappedResult;
        
    };

    const traverseDirectory = async (owner: string, repo: string, path: string) => {
        const contents = await fetchRepositoryContents(owner, repo, path);
        const mappedResults = [];

        for (const item of contents) {
            if (item.type === "dir") {
                setFoldersRead((prevFolders) => prevFolders + 1);
                await traverseDirectory(owner, repo, item.path);
            } else if (item.type === "file" && isSupportedFileType(item.name)) {
                setFilesRead((prevFiles) => prevFiles + 1);
                const content = await fetchAndDisplayFile(owner, repo, item.path);
                console.log("Content for parseAndProcessContents: ", item.name)
                const res = await parseAndProcessContents(item.name,content);
                console.log("Result from parseAndProcessContents: ", res)
                mappedResults.push(res);
            }
            console.log("Mapped results: ", mappedResults)
        }

        dispatch(setMappedResults(mappedResults))
        router.push("/code/results");
        console.log("Store state: ", store.getState().results)
    };

    const startTraverse = () => {

        const extractedInfo = handleGetOwnerAndRepo(repositoryUrl);
        //setRepositoryInfo(extractedInfo);

        if (extractedInfo?.owner && extractedInfo?.repo) {
            traverseDirectory(extractedInfo.owner, extractedInfo.repo, "")
    
            .then(() => {
                console.log("Traversal completed.");
            })
            .catch((error) => {
                console.error("Traversal error:", error);
            });
        } else {
            console.error("Missing repository information.");
        }
    };

  return (
    <div className="grid grid-rows-3 justify-center py-10">
        <div className="py-11"></div>
        <label className="justify-center font-bold" htmlFor="repositoryUrl">Enter GitHub Repository URL:</label>
        <div className="justify-stretch">
            <div>
            <input className="text-gray-700 p-10 py-3 rounded-md border-2 border-solid border-gray-400 text-left bg-transparent" type="text" 
                    placeholder="https://github.com/owner/repo"
                    value={repositoryUrl} 
                    onChange={event => setUrl(event.target.value)} 
                />
            </div>
        <div className="py-2">
            <button className ="'bg-white hover:bg-gray-200 border border-black rounded-md px-2 space-y-5" onClick={startTraverse}>Scan</button>
        </div>
        </div>
        
        

    </div>
  );
};

export default GithubExplorer;
