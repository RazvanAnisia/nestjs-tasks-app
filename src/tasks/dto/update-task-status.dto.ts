import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  // Ensures the string passed can only be from that enum
  // Otherwise returns eg: "message": [ "status must be one of the following values: OPEN, IN_PROGRESS, DONE"],
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
