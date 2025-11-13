import { CreateTaskDto } from './dto/create-task.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import type { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        user,
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const foundTask = await this.getTaskById(id, user);
    if (!foundTask) {
      throw new NotFoundException('Task not found');
    }
    foundTask.status = status;
    await this.tasksRepository.save(foundTask);

    return foundTask;
  }
}
