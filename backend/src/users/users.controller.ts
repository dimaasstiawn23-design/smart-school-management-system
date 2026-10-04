import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';    // <--- Impor Roles Guard
import { Roles } from '../auth/roles.decorator';       // <--- Impor Dekorator Roles

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Registrasi pengguna berhasil!',
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  // --- ENDPOINT PROFIL TERPROTEKSI (Bisa diakses oleh semua role yang sudah login) ---
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil data profil pengguna.',
      data: req.user, // Berisi payload (id, email, role) dari token JWT
    };
  }

  // --- ENDPOINT KHUSUS ADMIN (Dilindungi RBAC) ---
  @UseGuards(JwtAuthGuard, RolesGuard) // Jalankan Satpam JWT lalu Satpam Role
  @Roles('admin')                      // Batasi hanya untuk role 'admin'
  @Get('admin/dashboard')
  @HttpCode(HttpStatus.OK)
  getAdminDashboard(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Selamat datang di Dashboard Admin!',
      data: req.user,
    };
  }
}