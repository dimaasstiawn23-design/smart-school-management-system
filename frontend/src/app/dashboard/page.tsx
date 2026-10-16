'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar'; // Impor Sidebar terpusat

export default function DashboardPage() {
  const router = useRouter();
  
  const [authorized] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) return true;
    }
    return false;
  });

  if (!authorized && typeof window !== 'undefined') {
    router.replace('/login');
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Mengalihkan ke halaman login...</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Menggunakan Komponen Sidebar */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard Utama</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition duration-200"
          >
            Keluar (Logout)
          </button>
        </header>

        <main className="p-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Selamat Datang di Sistem! 🎉</h3>
            <p className="text-gray-600 text-sm">
              Autentikasi JWT Anda berhasil diverifikasi. Frontend Next.js dan Backend NestJS kini terhubung dengan mulus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500">Total Siswa</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500">Total Guru</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-sm font-medium text-gray-500">Mata Pelajaran</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}