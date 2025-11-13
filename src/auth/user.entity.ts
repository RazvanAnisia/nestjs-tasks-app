import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  // eager:true - means when we fetch the user, we will also fetch the tasks with it
  // When a user creates a task we want them to own it
  @OneToMany((_) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
