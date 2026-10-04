import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Student } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])], // Mendaftarkan tabel database yang digunakan modul ini
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Diexport jika nanti modul lain butuh memanggil service ini
})
export class UsersModule {}