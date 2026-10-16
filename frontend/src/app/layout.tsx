import type { Metadata } from 'next';
import './globals.css'; // Memuat file desain Tailwind CSS utama

// Judul dan deskripsi website
export const metadata: Metadata = {
  title: 'Smart School Management System',
  description: 'Sistem Informasi Manajemen Sekolah Terpadu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {/* {children} adalah tempat di mana halaman kita (seperti halaman login atau dashboard) akan diselipkan */}
        {children}
      </body>
    </html>
  );
}