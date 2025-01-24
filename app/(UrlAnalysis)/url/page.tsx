"use client";

import Navbar from "../../navbar/page"
import UrlScan from "./urlscan/page";

export default function UrlAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      <div className="relative">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/video.mp4"
          autoPlay
          muted
          loop
        />
        <div className="relative z-10 px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">
              Web Application Security Analysis
            </h1>
            <p className="text-xl text-gray-300">
              Scan web applications for quantum vulnerabilities and gain insights into cryptographic weaknesses, 
              including weak, strong, and recommended cipher suites. Compare the security of cipher suites in 
              both pre-quantum and post-quantum contexts.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-white text-center">
                  Start Your Analysis
                </h2>
                <p className="text-gray-300 text-center">
                  Enter your website URL below to begin the quantum vulnerability assessment
                </p>
                <UrlScan />
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Analysis</h3>
              <p className="text-gray-400">
                Get detailed insights into your web applications cryptographic security posture
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Quantum Readiness</h3>
              <p className="text-gray-400">
                Evaluate your applications preparedness for the post-quantum era
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Security Recommendations</h3>
              <p className="text-gray-400">
                Receive actionable insights to improve your cryptographic implementation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}