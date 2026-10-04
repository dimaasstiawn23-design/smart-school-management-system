import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Menentukan jenis peran (Role) yang tersedia di sistem sekolah
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  PARENT = 'parent',
}

@Entity('users') // Nama tabel di dalam database PostgreSQL
export class User {
  @PrimaryGeneratedColumn('uuid') // ID otomatis berbentuk teks unik (UUID)
  id: string;

  @Column({ unique: true }) // Email wajib unik (tidak boleh ada yang sama)
  email: string;

  @Column() // Kata sandi (nanti akan di-enkripsi)
  passwordHash: string;

  @Column() // Nama lengkap pengguna
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT, // Bawaan peran adalah siswa jika tidak diisi
  })
  role: UserRole;

  @CreateDateColumn() // Tanggal otomatis saat data dibuat
  createdAt: Date;

  @UpdateDateColumn() // Tanggal otomatis saat data diperbarui
  updatedAt: Date;
}