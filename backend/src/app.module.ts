import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; // <--- Impor controller

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
  ],
  controllers: [AppController], // <--- Daftarkan di sini
  providers: [],
})
export class AppModule {}