import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty({ message: 'Hari (dayOfWeek) tidak boleh kosong' })
  @IsString()
  dayOfWeek: string; // Contoh: "Senin"

  @IsNotEmpty({ message: 'Jam mulai (startTime) tidak boleh kosong' })
  @IsString()
  startTime: string; // Contoh: "08:00"

  @IsNotEmpty({ message: 'Jam selesai (endTime) tidak boleh kosong' })
  @IsString()
  endTime: string; // Contoh: "09:30"

  @IsString()
  room?: string; // Opsional: Ruangan kelas

  @IsNotEmpty({ message: 'ID Kelas wajib diisi' })
  @IsUUID('4', { message: 'Format ID Kelas harus UUID yang valid' })
  classId: string;

  @IsNotEmpty({ message: 'ID Mata Pelajaran wajib diisi' })
  @IsUUID('4', { message: 'Format ID Mata Pelajaran harus UUID yang valid' })
  subjectId: string;
}