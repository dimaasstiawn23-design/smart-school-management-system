import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceEntity } from './attendance.entity';
import { CreateAttendanceDto } from './create-attendance.dto';
import { User } from '../users/user.entity';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // 1. Mencatat Kehadiran Siswa (Oleh Admin / Guru)
  async create(createAttendanceDto: CreateAttendanceDto): Promise<AttendanceEntity> {
    const { studentId, classId, subjectId, ...attendanceData } = createAttendanceDto;

    // Validasi eksistensi Siswa
    const student = await this.userRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Siswa dengan ID ${studentId} tidak ditemukan.`);
    }

    // Validasi eksistensi Kelas
    const classEntity = await this.classRepository.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException(`Kelas dengan ID ${classId} tidak ditemukan.`);
    }

    // Validasi eksistensi Mata Pelajaran
    const subject = await this.subjectRepository.findOne({ where: { id: subjectId } });
    if (!subject) {
      throw new NotFoundException(`Mata pelajaran dengan ID ${subjectId} tidak ditemukan.`);
    }

    const newAttendance = this.attendanceRepository.create({
      ...attendanceData,
      student,
      classEntity,
      subject,
    });

    return await this.attendanceRepository.save(newAttendance);
  }

  // 2. Mengambil Seluruh Rekap Absensi (Admin)
  async findAll(): Promise<AttendanceEntity[]> {
    return await this.attendanceRepository.find();
  }

  // 3. Mengambil Riwayat Absensi Pribadi Siswa (Self-Service Portal)
  async findByStudent(studentId: string): Promise<AttendanceEntity[]> {
    const student = await this.userRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new NotFoundException(`Siswa dengan ID ${studentId} tidak ditemukan.`);
    }

    return await this.attendanceRepository.find({
      where: { student: { id: studentId } },
    });
  }
}