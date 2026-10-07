import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassEntity } from './class.entity';
import { CreateClassDto } from './create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  // 1. Membuat Kelas Baru
  async create(createClassDto: CreateClassDto): Promise<ClassEntity> {
    const existingClass = await classRepositoryFindByName(this.classRepository, createClassDto.name);
    if (existingClass) {
      throw new ConflictException('Nama kelas sudah terdaftar.');
    }

    const newClass = this.classRepository.create(createClassDto);
    return await this.classRepository.save(newClass);
  }

  // 2. Mengambil Semua Daftar Kelas
  async findAll(): Promise<ClassEntity[]> {
    return await this.classRepository.find();
  }

  // 3. Mengambil Detail Kelas Berdasarkan ID
  async findOne(id: string): Promise<ClassEntity> {
    const classEntity = await this.classRepository.findOne({ where: { id } });
    if (!classEntity) {
      throw new NotFoundException(`Kelas dengan ID ${id} tidak ditemukan.`);
    }
    return classEntity;
  }
}

// Helper kecil untuk pengecekan nama duplikat
async function classRepositoryFindByName(repo: Repository<ClassEntity>, name: string) {
  return await repo.findOne({ where: { name } });
}