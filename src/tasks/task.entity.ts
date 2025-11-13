import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status-enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  // Will make TypeOrm automatically generate ID's for our tasks
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;

  @ManyToOne((_) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
