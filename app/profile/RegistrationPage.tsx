import React, { useState } from 'react';
import Navbar from '../navbar/page';

interface RegistrationPageProps {
    setView: React.Dispatch<React.SetStateAction<'login' | 'register' | 'profile'>>;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ setView }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) throw new Error('Signup failed');
            alert('Registration successful! Please log in.');
            setView('login');
            // localStorage.setItem('email', email);
            
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className='relative flex justify-center items-center'>
            <video className="min-w-full h-screen absolute object-cover" src='/video.mp4' autoPlay muted loop />
            <div className='flex flex-col items-center justify-center min-h-screen' style={{ zIndex: 1 }}>
                <h2 className='text-3xl font-semibold text-white mb-5'>Signup</h2>
                <div className='bg-transparent rounded-lg shadow-md p-8 w-full max-w-sm'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
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
                        onClick={handleRegister}
                        className='bg-green-500 text-white rounded-md p-2 mb-4 w-full hover:bg-green-600 transition duration-200'
                    >
                        Signup
                    </button>
                    <button
                        onClick={() => setView('login')}
                        className='bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition duration-200'
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
        </div>      
    );
};

export default RegistrationPage;
