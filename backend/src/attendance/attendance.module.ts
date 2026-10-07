import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { User } from '../users/user.entity';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity, User, ClassEntity, SubjectEntity])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}