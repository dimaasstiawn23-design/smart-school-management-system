import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dayOfWeek: string; // Contoh: "Senin", "Selasa", "Rabu"

  @Column()
  startTime: string; // Contoh: "08:00"

  @Column()
  endTime: string; // Contoh: "09:30"

  @Column({ nullable: true })
  room: string; // Contoh: "Lab Komputer 1", "Ruang 101"

  // Relasi: Jadwal ini milik kelas tertentu
  @ManyToOne(() => ClassEntity, { eager: true, onDelete: 'CASCADE' })
  classEntity: ClassEntity;

  // Relasi: Jadwal ini untuk mata pelajaran tertentu
  @ManyToOne(() => SubjectEntity, { eager: true, onDelete: 'CASCADE' })
  subject: SubjectEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}