import { Controller, Get, Post, Body, Req, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './create-attendance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // POST /attendance - Hanya Admin yang dapat mencatat absensi
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    const attendance = await this.attendanceService.create(createAttendanceDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Data kehadiran siswa berhasil dicatat!',
      data: attendance,
    };
  }

  // GET /attendance - Hanya Admin yang dapat melihat seluruh rekap absensi sekolah
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const attendances = await this.attendanceService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil seluruh rekap data kehadiran.',
      data: attendances,
    };
  }

  // GET /attendance/my-attendance - Portal mandiri bagi siswa untuk melihat riwayat absensi mereka sendiri
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student')
  @Get('my-attendance')
  @HttpCode(HttpStatus.OK)
  async findMyAttendance(@Req() req: any) {
    const studentId = req.user.userId; // Mengambil ID dari payload token JWT aktif
    const attendances = await this.attendanceService.findByStudent(studentId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil riwayat kehadiran pribadi Anda.',
      data: attendances,
    };
  }
}