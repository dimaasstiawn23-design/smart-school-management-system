import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Format email tidak valid.' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong.' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong.' })
  @MinLength(6, { message: 'Password minimal harus 6 karakter.' })
  password: string;
}