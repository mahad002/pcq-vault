import React, { useState } from 'react';
import Navbar from '../navbar/page';

interface LoginPageProps {
    setUsername: (username: string, token: string) => void;
    setView: React.Dispatch<React.SetStateAction<'login' | 'register' | 'profile'>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUsername, setView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            
            if (!response.ok) throw new Error('Login failed');
            const data = await response.json();

            if (data.token) {
                setUsername(email, data.token); // Pass username and token back to ProfilePage
            }

            localStorage.setItem('email', email)
            localStorage.setItem('token', data.token)
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
        <Navbar />
        <div className='relative flex justify-center items-center'>
            <video className="min-w-full h-screen absolute object-cover" src='/video.mp4' autoPlay muted loop />
            <div className='flex flex-col items-center justify-center min-h-screen' style={{ zIndex: 1 }}>
                <h2 className='text-3xl font-semibold text-white mb-5'>Login</h2>
                <div className='bg-transparent rounded-lg shadow-md p-8 w-full max-w-sm'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    <button
                        onClick={handleLogin}
                        className='bg-blue-500 text-white rounded-md p-2 mb-4 w-full hover:bg-blue-600 transition duration-200'
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setView('register')}
                        className='bg-green-500 text-white rounded-md p-2 w-full hover:bg-green-600 transition duration-200'
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
