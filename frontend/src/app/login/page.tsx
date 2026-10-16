'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios'; // Menggunakan named import sesuai struktur file axios Anda

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setErrorMsg(''); 

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const token = 
        response.data?.access_token || 
        response.data?.accessToken || 
        response.data?.token || 
        response.data?.data?.access_token || 
        response.data?.data?.accessToken || 
        response.data?.data?.token;

      if (!token) {
        throw new Error('Token autentikasi tidak ditemukan dalam respons server.');
      }

      // Aman untuk SSR Next.js
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }

      router.push('/dashboard');

    } catch (err: unknown) {
      console.error('Error Login:', err);
      
      let message = 'Gagal Login. Periksa kembali email dan password Anda.';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        }
      }
      
      setErrorMsg(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Smart School Login
        </h1>

        {errorMsg && (
          <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="nama@sekolah.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white font-semibold transition hover:bg-blue-700"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}