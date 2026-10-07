import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeEntity } from './grade.entity';
import { CreateGradeDto } from './create-grade.dto';
import { User } from '../users/user.entity';
import { SubjectEntity } from '../subjects/subject.entity';
import { ClassEntity } from '../classes/class.entity';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(GradeEntity)
    private readonly gradeRepository: Repository<GradeEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  // 1. Input Nilai Baru (Biasanya oleh Admin / Teacher)
  async create(createGradeDto: CreateGradeDto): Promise<GradeEntity> {
    const { studentId, subjectId, classId, ...gradeData } = createGradeDto;

    // Validasi keberadaan Siswa
    const student = await this.userRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Siswa dengan ID ${studentId} tidak ditemukan.`);
    }

    // Validasi keberadaan Mata Pelajaran
    const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
    if (!subject) {
      throw new NotFoundException(`Mata pelajaran dengan ID ${subjectId} tidak ditemukan.`);
    }

    // Validasi keberadaan Kelas
    const classEntity = await this.classRepository.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException(`Kelas dengan ID ${classId} tidak ditemukan.`);
    }

    // Buat dan simpan entitas nilai baru beserta relasinya
    const newGrade = this.gradeRepository.create({
      ...gradeData,
      student,
      subject,
      classEntity,
    });

    return await this.gradeRepository.save(newGrade);
  }

  // 2. Ambil Semua Daftar Nilai (Untuk Admin / Guru)
  async findAll(): Promise<GradeEntity[]> {
    return await this.gradeRepository.find();
  }

  // 3. Ambil Nilai Berdasarkan Siswa Tertentu (Misalnya untuk portal siswa)
  async findByStudent(studentId: string): Promise<GradeEntity[]> {
    return await this.gradeRepository.find({
      where: { student: { id: studentId } },
    });
  }
}