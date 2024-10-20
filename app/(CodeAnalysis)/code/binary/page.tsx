"use client";
import { useState, useEffect, createContext } from 'react';
import parserImp from '../../services/utils/parserImp';
import { Lookup } from '../../services/utils/lookup';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import store, {setMappedResults} from "@/app/store/store";
import axios from "axios";

export default function BinaryUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const mappedResults = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("http://13.126.181.70:8001/upload", formData);
        const result = response.data;
        console.log("Upload successful:", result.result);
        console.log('filename', file.name);
        const mappedResult = {
          lines: 0,
          fileName: file.name,
          filteredResults: result.result,
        };
        const filteredResultsDict = mappedResult.filteredResults.reduce((acc: { [key: string]: any }, curr: any) => {
          const key = Object.keys(curr)[0];
          acc[key] = curr[key];
          return acc;
        }, {});        
        console.log("filteredResultsDict", filteredResultsDict);
        mappedResult.filteredResults = filteredResultsDict;
        console.log('result', mappedResult);
        mappedResults.push(mappedResult);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }
    console.log('mappedResults', mappedResults);
    dispatch(setMappedResults(mappedResults));
    router.push("/code/results");
  };

  return (
    <div className="grid grid-row-2 justify-center py-10">
      <h3 className="justify-center px-10 text-center font-bold">
        Upload Your Binary:
      </h3>
      <div className="justify-center items-center w-fit py-5" {...getRootProps()}>
        <input className="hidden" {...getInputProps()} />
        <p className="text-gray-300 p-3 py-7 rounded-md border-2 border-dashed border-gray-400">
          Drag and drop files here, or click to select files
        </p>
        
      </div>
      <button className="border rounded-md" onClick={handleUpload}>Upload</button>
    </div>
  );
}