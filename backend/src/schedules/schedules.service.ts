import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';
import { CreateScheduleDto } from './create-schedule.dto';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // 1. Membuat Jadwal Pelajaran Baru (Oleh Admin)
  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleEntity> {
    const { classId, subjectId, ...scheduleData } = createScheduleDto;

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

    const newSchedule = this.scheduleRepository.create({
      ...scheduleData,
      classEntity,
      subject,
    });

    return await this.scheduleRepository.save(newSchedule);
  }

  // 2. Mengambil Seluruh Daftar Jadwal
  async findAll(): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find();
  }

  // 3. Mengambil Jadwal Berdasarkan Kelas Tertentu (Berguna untuk Portal Siswa/Guru)
  async findByClass(classId: string): Promise<ScheduleEntity[]> {
    const classEntity = await this.classRepository.findOne({ where: { id: classId } });
    if (!classEntity) {
      throw new NotFoundException(`Kelas dengan ID ${classId} tidak ditemukan.`);
    }

    return await this.scheduleRepository.find({
      where: { classEntity: { id: classId } },
    });
  }
}