import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './create-grade.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  // POST /grades - Hanya Admin / Teacher yang bisa input nilai
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Bisa dikembangkan jadi ['admin', 'teacher'] nanti
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGradeDto: CreateGradeDto) {
    const grade = await this.gradesService.create(createGradeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Nilai siswa berhasil dicatat!',
      data: grade,
    };
  }

  // GET /grades - Admin melihat seluruh rekap nilai
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const grades = await this.gradesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil seluruh data nilai.',
      data: grades,
    };
  }

  // GET /grades/my-grades - Siswa melihat nilai mereka sendiri berdasarkan token login
  @UseGuards(JwtAuthGuard)
  @Get('my-grades')
  @HttpCode(HttpStatus.OK)
  async getMyGrades(@Request() req) {
    const studentId = req.user.id; // Diambil dari payload token JWT yang sedang login
    const grades = await this.gradesService.findByStudent(studentId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil daftar nilai Anda.',
      data: grades,
    };
  }
}