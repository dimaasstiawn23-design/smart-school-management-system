'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  // Daftar menu navigasi utama
  const menuItems = [
    { name: '📊 Beranda / Statistik', href: '/dashboard' },
    { name: '🏫 Manajemen Kelas', href: '/dashboard/classes' },
    { name: '📚 Mata Pelajaran', href: '/dashboard/subjects' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block flex-shrink-0">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-blue-600">Smart School</h1>
        <p className="text-xs text-gray-400 mt-1">Management System</p>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}