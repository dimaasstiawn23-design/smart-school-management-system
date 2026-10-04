import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nisn: string; // Nomor Induk Siswa Nasional

  @Column()
  gradeLevel: string; // Contoh: "Kelas 10", "Kelas 11"

  @Column()
  major: string; // Jurusan, contoh: "IPA", "IPS", "RPL"

  // Menghubungkan 1 data Siswa ke 1 data Akun Login (User)
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}