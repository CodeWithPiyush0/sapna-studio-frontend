import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            toast.success(res.data.message);
            localStorage.setItem('token', res.data.token);
            navigate('/admin/dashboard');

        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

  return (
    <div className="h-screen bg-dark flex items-center justify-center text-white px-4">
        <div className="w-full max-w-md bg-white/5 p-8 rounded-xl border border-white/10 backdrop-blur-md">
            <h2 className="text-3xl font-serif text-gold text-center mb-2">Admin Access</h2>
            <p className="text-gray-400 text-center mb-8">Enter your credentials to manage the studio.</p>

            <form onSubmit={handleLogin} className='space-y-6'>
                <div>
                    <label className='block text-sm text-gray-400 mb-2'>Email Address</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none text-white' 
                        required
                    />
                </div>

                <div>
                    <label className='block text-sm text-gray-400 mb-2'>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full bg-black/50 border border-gray-700 p-3 rounded-lg focus:border-gold outline-none text-white' 
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full bg-gold text-block font-bold py-3 rounded-lg hover:bg-yellow-500 transition'
                >
                    LOGIN
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login