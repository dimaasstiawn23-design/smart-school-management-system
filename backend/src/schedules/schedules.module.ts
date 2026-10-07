import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleEntity } from './schedule.entity';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { ClassEntity } from '../classes/class.entity';
import { SubjectEntity } from '../subjects/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity, ClassEntity, SubjectEntity])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}