"use client";

import GithubExplorer from './github/page';
import CodeUpload from './codeupload/page';
import { Provider } from "react-redux";
import store from "@/app/store/store";

import Navbar from '@/app/navbar/page';
import BinaryUpload from './binary/page';


export default function CodeAnalysis() {

  return (
    <div className='bg-blue-200 text-gray-200 bg-url1 text-2xl h-screen'>
      <Navbar />
      <h1 className='text-center text-2xl font-bold text-clip py-3 px-4 '>Search for quantum-vulnerable encryption, signature and hash algorithms or gain additional context on the threat landscape with QryptShield.</h1>

        <div className='grid grid-cols-2 bg-transparent'>
          <div className=' '>
            {/* <BinaryUpload/> */}
            <CodeUpload/>
          </div>
          <div>
          <GithubExplorer owner={''} repo={''} />
          </div>
        </div>
        

      </div>            
  );
}