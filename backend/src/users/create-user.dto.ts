import { IsEmail, IsNotEmpty, IsEnum, IsString, MinLength, IsOptional } from 'class-validator';
import { UserRole } from './user.entity';

export class CreateUserDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password minimal harus memiliki 6 karakter' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama lengkap wajib diisi' })
  fullName: string;

  @IsEnum(UserRole, { message: 'Role tidak valid' })
  @IsOptional()
  role?: UserRole;

  // Atribut tambahan khusus jika yang mendaftar adalah siswa
  @IsString()
  @IsOptional()
  nisn?: string;

  @IsString()
  @IsOptional()
  gradeLevel?: string;

  @IsString()
  @IsOptional()
  major?: string;
}