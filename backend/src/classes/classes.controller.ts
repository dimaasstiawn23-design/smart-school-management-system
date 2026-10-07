import { Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './create-class.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  // POST /classes - Hanya Admin yang bisa membuat kelas baru
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClassDto: CreateClassDto) {
    const classData = await this.classesService.create(createClassDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Kelas berhasil dibuat!',
      data: classData,
    };
  }

  // GET /classes - Bisa diakses oleh semua user yang sudah login (Admin / Student / Teacher)
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const classes = await this.classesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil daftar kelas.',
      data: classes,
    };
  }

  // GET /classes/:id - Detail kelas berdasarkan ID
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    const classData = await this.classesService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil detail kelas.',
      data: classData,
    };
  }
}