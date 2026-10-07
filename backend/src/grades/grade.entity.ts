import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SubjectEntity } from '../subjects/subject.entity';
import { ClassEntity } from '../classes/class.entity';

@Entity('grades')
export class GradeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  score: number; // Contoh: 85.50, 90.00

  @Column({ nullable: true })
  semester: string; // Contoh: "Ganjil 2026/2027"

  @Column({ nullable: true })
  description: string; // Contoh: "Ujian Tengah Semester (UTS)"

  // Relasi: Nilai ini milik satu siswa tertentu (User)
  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  student: User;

  // Relasi: Nilai ini untuk mata pelajaran apa
  @ManyToOne(() => SubjectEntity, { eager: true, onDelete: 'CASCADE' })
  subject: SubjectEntity;

  // Relasi: Nilai ini untuk kelas apa
  @ManyToOne(() => ClassEntity, { eager: true, onDelete: 'CASCADE' })
  classEntity: ClassEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}