import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

export enum AttendanceStatus {
  PRESENT = 'Hadir',
  SICK = 'Sakit',
  PERMIT = 'Izin',
  ABSENT = 'Alpa',
}

@Entity('attendances')
export class AttendanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string; // Format: "YYYY-MM-DD"

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  // Relasi ke Siswa (User)
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  student: User;

  // Relasi ke Kelas
  @ManyToOne(() => ClassEntity, { eager: true, onDelete: 'CASCADE' })
  classEntity: ClassEntity;

  // Relasi ke Mata Pelajaran (Opsional jika absensi berbasis mapel, atau harian)
  @ManyToOne(() => SubjectEntity, { eager: true, onDelete: 'CASCADE' })
  subject: SubjectEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}