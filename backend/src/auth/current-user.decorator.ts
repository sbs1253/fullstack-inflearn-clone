import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

type JwtUser = { sub: string; email?: string };

export const CurrentUser = createParamDecorator(
  (pick: keyof JwtUser | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user as JwtUser | undefined;
    if (!user) throw new UnauthorizedException('사용자 인증 정보가 없습니다.');
    return pick ? user[pick] : user;
  },
);
