import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './create-subject.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  // POST /subjects - Hanya Admin yang boleh membuat mata pelajaran
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    const subject = await this.subjectsService.create(createSubjectDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Mata pelajaran berhasil ditambahkan!',
      data: subject,
    };
  }

  // GET /subjects - Dapat diakses oleh semua pengguna yang sudah login
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const subjects = await this.subjectsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil daftar mata pelajaran.',
      data: subjects,
    };
  }

  // GET /subjects/:id - Detail mata pelajaran berdasarkan ID unik
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const subject = await this.subjectsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil detail mata pelajaran.',
      data: subject,
    };
  }
}