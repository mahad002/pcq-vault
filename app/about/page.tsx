"use client";

import Navbar from '../navbar/page';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="relative">
        <video 
          className="w-full h-[50vh] object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">About QryptShield</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trusted partner in quantum-safe cryptography analysis and security assessment
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              QryptShield is dedicated to helping organizations prepare for the quantum computing era by identifying and addressing cryptographic vulnerabilities in their systems. We provide comprehensive analysis tools for both code and web applications to ensure quantum-safe security implementations.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">✓</div>
                </div>
                <p className="ml-3 text-gray-600">Advanced quantum vulnerability scanning</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">✓</div>
                </div>
                <p className="ml-3 text-gray-600">Comprehensive cryptographic analysis</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white">✓</div>
                </div>
                <p className="ml-3 text-gray-600">Expert recommendations for quantum-safe implementations</p>
              </div>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/img1.png"
              alt="Quantum Computing Illustration"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose QryptShield?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Analysis</h3>
              <p className="text-gray-600">
                Our tools provide deep insights into cryptographic vulnerabilities across your entire codebase and web applications.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Future-Proof Security</h3>
              <p className="text-gray-600">
                Stay ahead of quantum computing threats with our advanced analysis and recommendations for quantum-safe implementations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600">
                Get detailed reports and expert guidance on transitioning to quantum-safe cryptographic solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}