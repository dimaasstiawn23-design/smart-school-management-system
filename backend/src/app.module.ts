import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; // <--- Impor controller
import { UsersModule } from './users/users.module'; // <--- Impor UsersModule
import { AuthModule } from './auth/auth.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { GradeEntity } from './grades/grade.entity';
import { GradesModule } from './grades/grades.module';
import { ScheduleEntity } from './schedules/schedule.entity';
import { SchedulesModule } from './schedules/schedules.module';
// --- IMPOR ENTITAS YANG DIBUTUHKAN ---
import { User } from './users/user.entity';
import { Student } from './users/student.entity';
import { ClassEntity } from './classes/class.entity';
import { SubjectEntity } from './subjects/subject.entity';
import { AttendanceEntity } from './attendance/attendance.entity'; // <--- Impor AttendanceEntity
import { AttendanceModule } from './attendance/attendance.module';



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
      entities: [User, Student, ClassEntity, SubjectEntity, GradeEntity, ScheduleEntity, AttendanceEntity],
    }),
    UsersModule, // <--- Daftarkan di sini
    AuthModule, // Pastikan ini ada di dalam array imports
    ClassesModule, // <--- Daftarkan di sini
    SubjectsModule, // <--- Daftarkan di sini
    SchedulesModule, // <--- Daftarkan di sini
    GradesModule, // <--- Daftarkan di sini
    AttendanceModule, // <--- Daftarkan di sini
  ],
  controllers: [AppController], // <--- Daftarkan di sini
  providers: [],
})
export class AppModule {}