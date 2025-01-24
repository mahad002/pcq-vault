"use client";

import React, { useState } from 'react';
import Navbar from '../navbar/page';
import { AuthCard } from '@/components/ui/auth-card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

interface RegistrationPageProps {
  setView: React.Dispatch<React.SetStateAction<'login' | 'register' | 'profile'>>;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ setView }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) throw new Error('Registration failed');
      toast.success('Registration successful! Please log in.');
      setView('login');
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
        />
        <div className="relative z-10 w-full max-w-md">
          <AuthCard
            title="Create Account"
            description="Join us to get started"
          >
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={handleRegister}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
              <Button
                onClick={() => setView('login')}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Button>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;