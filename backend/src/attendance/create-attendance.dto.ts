import { IsEnum, IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { AttendanceStatus } from './attendance.entity';

export class CreateAttendanceDto {
  @IsNotEmpty({ message: 'Tanggal absensi wajib diisi' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Format tanggal harus YYYY-MM-DD' })
  date: string;

  @IsNotEmpty({ message: 'Status kehadiran wajib diisi' })
  @IsEnum(AttendanceStatus, { message: 'Status harus bernilai: Hadir, Sakit, Izin, atau Alpa' })
  status: AttendanceStatus;

  @IsNotEmpty({ message: 'ID Siswa wajib diisi' })
  @IsUUID('4', { message: 'Format ID Siswa harus UUID yang valid' })
  studentId: string;

  @IsNotEmpty({ message: 'ID Kelas wajib diisi' })
  @IsUUID('4', { message: 'Format ID Kelas harus UUID yang valid' })
  classId: string;

  @IsNotEmpty({ message: 'ID Mata Pelajaran wajib diisi' })
  @IsUUID('4', { message: 'Format ID Mata Pelajaran harus UUID yang valid' })
  subjectId: string;
}