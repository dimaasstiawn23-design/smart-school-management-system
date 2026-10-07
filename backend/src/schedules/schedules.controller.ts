import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './create-schedule.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  // POST /schedules - Hanya Admin yang dapat membuat jadwal pelajaran
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const schedule = await this.schedulesService.create(createScheduleDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Jadwal pelajaran berhasil ditambahkan!',
      data: schedule,
    };
  }

  // GET /schedules - Dapat diakses oleh semua user terautentikasi
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const schedules = await this.schedulesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil seluruh daftar jadwal pelajaran.',
      data: schedules,
    };
  }

  // GET /schedules/class/:classId - Mengambil jadwal berdasarkan ID kelas tertentu
  @UseGuards(JwtAuthGuard)
  @Get('class/:classId')
  @HttpCode(HttpStatus.OK)
  async findByClass(@Param('classId') classId: string) {
    const schedules = await this.schedulesService.findByClass(classId);
    return {
      statusCode: HttpStatus.OK,
      message: `Berhasil mengambil jadwal untuk kelas ID ${classId}.`,
      data: schedules,
    };
  }
}