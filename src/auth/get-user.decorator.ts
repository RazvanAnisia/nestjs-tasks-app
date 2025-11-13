import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    // eslint-disable-next-line
    const req = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line
    return req.user;
  },
);
