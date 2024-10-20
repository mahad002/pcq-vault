"use client";
import { useState, useEffect, createContext } from 'react';
import parserImp from '../../services/utils/parserImp';
import { Lookup } from '../../services/utils/lookup';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import store, {setMappedResults} from "@/app/store/store";

export default function CodeUpload() {
    const [files, setFiles] = useState<{ name: string; content: string }[]>([]);
    const dispatch = useDispatch();
    const router = useRouter();

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
          const parsedContents: { name: string; content: string }[] = [];
          Promise.all(acceptedFiles.map(readFileContent)).then((contents) => {
            parsedContents.push(...contents);
            setFiles(parsedContents);
          });
        },
      });
    
    const readFileContent = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const decoder = new TextDecoder('utf-8');
        const content = decoder.decode(buffer);
        console.log('file content', file.name, content);
        return { name: file.name, content };
    };

    const parseAndProcessContents = async (fileName: string, content: string) => {
        await parserImp.init();
        const parser = parserImp.getParser();
        const tree = parser.parse(content);
        const root = Lookup(tree.rootNode);
        let res = {};
        res = root.traverse(res, '');
        const lines = content.split('\n').length;
        console.log('fileafter', fileName, content);
        const filteredResults = Object.entries(res)
          .filter(([key, value]) => (value as { grade?: any }).grade !== undefined)
          .reduce((obj: { [key: string]: any }, [key, value]) => {  // Provide the type for obj here
            obj[key] = value;
            return obj;
          }, {}); 
        console.log('res', filteredResults);
    
        return { lines,fileName, filteredResults};
      };

    const getParsedResults = async () => {
        const results = [];
        for (const file of files) {
          const result = await parseAndProcessContents(file.name, file.content);
          results.push(result);
        }
        console.log('results', results);
        dispatch(setMappedResults(results))
        router.push("/code/results");
      };
    
    useEffect(() => {
        if (files.length > 0) {
          getParsedResults(); // Call getParsedResults when files change
        }
      }, [files]);

    const handleUpload=()=>{
      getParsedResults();
    }

      return (
        <div className='grid grid-row-2 justify-center'>
          <h3 className=' justify-center px-10 text-center font-bold'> Upload Your Code:</h3>
          <div className="justify-center items-center w-fit py-5" {...getRootProps()}>
            <input className="hidden p-3 py-5 rounded-md border-2 border-dashed border-gray-400" {...getInputProps()} />
            <p className="text-gray-300 p-3 py-7 rounded-md border-2 border-dashed border-gray-400">Drag and drop files here, or click to select files</p>
          </div>
          {/* <button className="border rounded-md" onClick={handleUpload}>Upload</button> */}
        </div>
      )
}