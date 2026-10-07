import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeEntity } from './grade.entity';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { User } from '../users/user.entity';
import { SubjectEntity } from '../subjects/subject.entity';
import { ClassEntity } from '../classes/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity, User, SubjectEntity, ClassEntity])],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}