import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface UserRepository extends Repository<User> {
  createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}

export const createUsersRepository = (dataSource: DataSource): UserRepository =>
  dataSource.getRepository(User).extend({
    async createUser(
      this: Repository<User>,
      authCredentialsDto: AuthCredentialsDto,
    ) {
      const { username, password } = authCredentialsDto;

      // eslint-disable-next-line
      const salt = await bcrypt.genSalt();
      // eslint-disable-next-line
      const hashedPassword = await bcrypt.hash(password, salt);

      // eslint-disable-next-line
      const user = this.create({ username, password: hashedPassword });
      try {
        await this.save(user);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if ('code' in error && error.code === '23505') {
          throw new ConflictException('Username already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
    },
  });
