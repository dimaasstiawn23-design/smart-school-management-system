import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { CreateSubjectDto } from './create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // 1. Fungsi Membuat Mata Pelajaran Baru
  async create(createSubjectDto: CreateSubjectDto): Promise<SubjectEntity> {
    // Cek apakah kode atau nama mata pelajaran sudah ada di database
    const existingSubject = await this.subjectRepository.findOne({
      where: [{ code: createSubjectDto.code }, { name: createSubjectDto.name }],
    });

    if (existingSubject) {
      throw new ConflictException('Mata pelajaran dengan kode atau nama tersebut sudah ada.');
    }

    const newSubject = this.subjectRepository.create(createSubjectDto);
    return await this.subjectRepository.save(newSubject);
  }

  // 2. Fungsi Mengambil Seluruh Daftar Mata Pelajaran
  async findAll(): Promise<SubjectEntity[]> {
    return await this.subjectRepository.find();
  }

  // 3. Fungsi Mencari Mata Pelajaran Berdasarkan ID
  async findOne(id: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOne({ where: { id } });
    if (!subject) {
      throw new NotFoundException(`Mata pelajaran dengan ID ${id} tidak ditemukan.`);
    }
    return subject;
  }
}