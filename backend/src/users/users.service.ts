import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { Student } from './student.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Fungsi untuk mendaftarkan pengguna baru
  async createUser(dto: CreateUserDto): Promise<User> {
    // 1. Cek apakah email sudah terdaftar di database
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar di dalam sistem.');
    }

    // 2. Acak (encrypt) password agar aman
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // 3. Simpan data ke tabel users
    const newUser = this.userRepository.create({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
      role: dto.role || UserRole.STUDENT,
    });
    const savedUser = await this.userRepository.save(newUser);

    // 4. Jika rolenya adalah STUDENT, buat juga data profil di tabel students
    if (savedUser.role === UserRole.STUDENT) {
      const newStudent = this.studentRepository.create({
        nisn: dto.nisn || 'DEFAULT_NISN',
        gradeLevel: dto.gradeLevel || 'Belum ditentukan',
        major: dto.major || 'Umum',
        user: savedUser,
      });
      await this.studentRepository.save(newStudent);
    }

    return savedUser;
  }
}