'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import Sidebar from '@/components/Sidebar';

interface SubjectItem {
  id?: string | number;
  name: string;
  code?: string;
  teacher?: string;
}

export default function SubjectsPage() {
  const router = useRouter();
  
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [teacher, setTeacher] = useState('');

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.get('/subjects');
      const subjectList = response.data?.data || response.data || [];
      setSubjects(Array.isArray(subjectList) ? subjectList : []);
    } catch (err: unknown) {
      const errorObj = err as { response?: { status?: number } };
      if (errorObj.response?.status === 401) {
        localStorage.removeItem('token');
        router.replace('/login');
        return;
      }
      setError('Gagal memuat data mata pelajaran dari server.');
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
      fetchSubjects();
    }
  }

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post('/subjects', {
        name: subjectName,
        code: subjectCode,
        teacher: teacher,
      });

      setSubjectName('');
      setSubjectCode('');
      setTeacher('');
      fetchSubjects();
      alert('Mata pelajaran berhasil ditambahkan!');
    } catch (err: unknown) {
      const errorObj = err as { response?: { status?: number; data?: { message?: string | string[] } } };
      
      if (errorObj.response?.status === 401) {
        alert('Sesi Anda telah habis. Silakan login ulang.');
        localStorage.removeItem('token');
        router.replace('/login');
        return;
      }

      const errorMsg = errorObj.response?.data?.message || 'Gagal menambahkan mata pelajaran baru.';
      alert(`Error: ${Array.isArray(errorMsg) ? errorMsg.join(', ') : errorMsg}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">Manajemen Mata Pelajaran</h2>
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
            <h3 className="text-md font-bold text-gray-800 mb-4">Tambah Mata Pelajaran Baru</h3>
            <form onSubmit={handleCreateSubject} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Kode Mapel (Cth: MTK)"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Nama Mata Pelajaran"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Pengampu / Guru"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
              >
                Simpan Mapel
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-md font-bold text-gray-800">Daftar Mata Pelajaran</h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-500 text-sm">Memuat data mata pelajaran...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500 text-sm">{error}</div>
            ) : subjects.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">Belum ada data mata pelajaran yang tersimpan.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-semibold">No</th>
                      <th className="p-4 font-semibold">Kode</th>
                      <th className="p-4 font-semibold">Nama Mata Pelajaran</th>
                      <th className="p-4 font-semibold">Guru Pengampu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {subjects.map((subj, index) => (
                      <tr key={subj.id || index} className="hover:bg-gray-50">
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4 font-mono font-semibold text-blue-600">{subj.code || '-'}</td>
                        <td className="p-4 font-medium text-gray-900">{subj.name}</td>
                        <td className="p-4">{subj.teacher || '-'}</td>
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