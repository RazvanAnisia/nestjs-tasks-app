import { CreateTaskDto } from './dto/create-task.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import type { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const foundTask = await this.getTaskById(id);
    if (!foundTask) {
      throw new NotFoundException('Task not found');
    }
    foundTask.status = status;
    await this.tasksRepository.save(foundTask);

    return foundTask;
  }
}
