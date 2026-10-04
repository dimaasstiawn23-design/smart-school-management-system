import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // 1. Validasi user berdasarkan email & password
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    // 2. Jika valid, buat token JWT
    return this.authService.login(user);
  }
}