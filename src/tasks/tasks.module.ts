import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createTasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'TasksRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => createTasksRepository(dataSource),
    },
  ],
  exports: ['TasksRepository'],
})
export class TasksModule {}
