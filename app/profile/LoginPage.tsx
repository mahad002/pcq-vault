"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/page';
import { AuthCard } from '@/components/ui/auth-card';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { createAlert, logActivity } from '@/lib/alerts';

interface LoginPageProps {
  setUsername: (username: string, token: string) => void;
  setView: React.Dispatch<React.SetStateAction<'login' | 'register' | 'profile'>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUsername, setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();

      if (data.token) {
        setUsername(email, data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);

        // Create success alert and log activity
        await createAlert(email, 'success', 'Successfully logged in');
        await logActivity(email, 'login', { timestamp: new Date(), role: data.role });

        // Redirect based on role
        if (data.role === 'admin') {
          console.log('Redirecting to admin page...');
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (email) {
        await createAlert(email, 'error', 'Login attempt failed');
      }
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
            title="Welcome Back"
            description="Sign in to your account to continue"
          >
            <div className="space-y-4">
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
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
              <Button
                onClick={() => setView('register')}
                variant="outline"
                className="w-full"
              >
                Create account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;