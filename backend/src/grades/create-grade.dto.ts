import { IsNotEmpty, IsNumber, IsString, IsUUID, Min, Max } from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty({ message: 'Nilai (score) tidak boleh kosong' })
  @IsNumber({}, { message: 'Nilai harus berupa angka' })
  @Min(0, { message: 'Nilai minimal adalah 0' })
  @Max(100, { message: 'Nilai maksimal adalah 100' })
  score: number;

  @IsNotEmpty({ message: 'Semester tidak boleh kosong' })
  @IsString()
  semester: string; // Contoh: "Ganjil 2026/2027"

  @IsNotEmpty({ message: 'Keterangan tidak boleh kosong' })
  @IsString()
  description: string; // Contoh: "UTS", "UAS", "Tugas 1"

  @IsNotEmpty({ message: 'ID Siswa wajib diisi' })
  @IsUUID('4', { message: 'Format ID Siswa harus UUID yang valid' })
  studentId: string;

  @IsNotEmpty({ message: 'ID Mata Pelajaran wajib diisi' })
  @IsUUID('4', { message: 'Format ID Mata Pelajaran harus UUID yang valid' })
  subjectId: string;

  @IsNotEmpty({ message: 'ID Kelas wajib diisi' })
  @IsUUID('4', { message: 'Format ID Kelas harus UUID yang valid' })
  classId: string;
}