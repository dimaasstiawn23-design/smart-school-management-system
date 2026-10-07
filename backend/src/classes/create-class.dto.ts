import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Nama kelas tidak boleh kosong' })
  @IsString()
  name: string; // Contoh: "10 IPA 1"

  @IsNotEmpty({ message: 'Tingkat kelas tidak boleh kosong' })
  @IsString()
  gradeLevel: string; // Contoh: "10"
}