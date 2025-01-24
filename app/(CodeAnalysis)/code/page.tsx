"use client";

import GithubExplorer from './github/page';
import CodeUpload from './codeupload/page';
import Navbar from '@/app/navbar/page';
import BinaryUpload from './binary/page';

export default function CodeAnalysis() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      <Navbar />
      <div className='relative'>
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/video.mp4"
          autoPlay
          muted
          loop
        />
        <div className='relative z-10 px-4 py-8'>
          <h1 className='text-center text-3xl font-bold text-white mb-8'>
            Quantum Vulnerability Analysis
          </h1>
          <p className='text-center text-xl text-gray-300 max-w-4xl mx-auto mb-12'>
            Search for quantum-vulnerable encryption, signature and hash algorithms or gain additional context on the threat landscape with QryptShield.
          </p>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl'>
              <h2 className='text-2xl font-semibold text-white mb-4'>Code Analysis</h2>
              <div className='space-y-4'>
                <p className='text-gray-300'>Upload your code files for quantum vulnerability analysis</p>
                <CodeUpload/>
              </div>
            </div>
            
            <div className='bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl'>
              <h2 className='text-2xl font-semibold text-white mb-4'>GitHub Repository Analysis</h2>
              <div className='space-y-4'>
                <p className='text-gray-300'>Analyze GitHub repositories for quantum vulnerabilities</p>
                <GithubExplorer owner={''} repo={''} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}