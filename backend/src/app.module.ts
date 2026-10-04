import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; // <--- Impor controller
import { UsersModule } from './users/users.module'; // <--- Impor UsersModule
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Menghubungkan NestJS ke PostgreSQL menggunakan konfigurasi dari Docker environment
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'school_admin',
      password: process.env.DB_PASSWORD || 'secure_password_123',
      database: process.env.DB_NAME || 'smart_school_db',
      autoLoadEntities: true, // Otomatis membaca entity tabel yang kita buat nanti
      synchronize: true, // Otomatis membuat tabel di database saat development (matikan saat production)
    }),
    UsersModule, // <--- Daftarkan di sini
    AuthModule, // Pastikan ini ada di dalam array imports
  ],
  controllers: [AppController], // <--- Daftarkan di sini
  providers: [],
})
export class AppModule {}