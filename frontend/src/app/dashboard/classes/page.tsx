'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import Sidebar from '@/components/Sidebar'; // Menggunakan Sidebar terpusat

interface ClassItem {
  id?: string | number;
  name: string;
  homeroomTeacher?: string;
}

export default function ClassesPage() {
  const router = useRouter();
  
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [className, setClassName] = useState('');
  const [homeroomTeacher, setHomeroomTeacher] = useState('');

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }

      const response = await api.get('/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const classList = response.data?.data || response.data || [];
      setClasses(Array.isArray(classList) ? classList : []);
    } catch {
      setError('Gagal memuat data kelas dari server.');
    } finally {
      setLoading(false);
    }
  };

  const [isInitialized, setIsInitialized] = useState(false);
  if (!isInitialized && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsInitialized(true);
      fetchClasses();
    }
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/classes', {
        name: className,
        homeroomTeacher: homeroomTeacher,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setClassName('');
      setHomeroomTeacher('');
      fetchClasses();
      alert('Kelas berhasil ditambahkan!');
    } catch {
      alert('Gagal menambahkan kelas baru.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Menggunakan Sidebar Terpusat */}
      <Sidebar />

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">Manajemen Data Kelas</h2>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              router.replace('/login');
            }}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition duration-200"
          >
            Keluar (Logout)
          </button>
        </header>

        <main className="p-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
            <h3 className="text-md font-bold text-gray-800 mb-4">Tambah Kelas Baru</h3>
            <form onSubmit={handleCreateClass} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nama Kelas (Cth: X IPA 1)"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Wali Kelas"
                value={homeroomTeacher}
                onChange={(e) => setHomeroomTeacher(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
              >
                Simpan Kelas
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-md font-bold text-gray-800">Daftar Kelas Terdaftar</h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500 text-sm">Memuat data kelas...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 text-sm">{error}</div>
            ) : classes.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">Belum ada data kelas yang tersimpan.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">No</th>
                      <th className="p-4 font-semibold">Nama Kelas</th>
                      <th className="p-4 font-semibold">Wali Kelas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {classes.map((cls, index) => (
                      <tr key={cls.id || index} className="hover:bg-gray-50">
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 font-medium text-gray-900">{cls.name}</td>
                        <td className="p-4">{cls.homeroomTeacher || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}