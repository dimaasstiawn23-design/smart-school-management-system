import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { SubjectEntity } from './subject.entity';
import { CreateSubjectDto } from './create-subject.dto';
import { UpdateSubjectDto } from './update-subject.dto'; // Pastikan DTO ini sudah dibuat

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  // 1. Fungsi Membuat Mata Pelajaran Baru
  async create(createSubjectDto: CreateSubjectDto): Promise<SubjectEntity> {
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

  // 4. Fungsi Memperbarui Mata Pelajaran (UPDATE)
  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<SubjectEntity> {
    // Pastikan data yang mau di-edit benar-benar ada
    const subject = await this.findOne(id);

    // Jika kode atau nama diubah, pastikan tidak bentrok dengan data ID lain
    if (updateSubjectDto.code || updateSubjectDto.name) {
      const existing = await this.subjectRepository.findOne({
        where: [
          { code: updateSubjectDto.code, id: Not(id) },
          { name: updateSubjectDto.name, id: Not(id) },
        ],
      });

      if (existing) {
        throw new ConflictException('Kode atau nama mata pelajaran sudah digunakan oleh entitas lain.');
      }
    }

    // Gabungkan data lama dengan data baru
    Object.assign(subject, updateSubjectDto);
    return await this.subjectRepository.save(subject);
  }

  // 5. Fungsi Menghapus Mata Pelajaran (DELETE)
  async remove(id: string): Promise<{ message: string }> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
    return { message: `Mata pelajaran dengan ID ${id} berhasil dihapus.` };
  }
}