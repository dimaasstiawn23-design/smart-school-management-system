import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Nama mata pelajaran tidak boleh kosong' })
  @IsString()
  name: string; // Contoh: "Matematika", "Fisika"

  @IsNotEmpty({ message: 'Kode mata pelajaran tidak boleh kosong' })
  @IsString()
  code: string; // Contoh: "MTK-101", "FIS-102"
}