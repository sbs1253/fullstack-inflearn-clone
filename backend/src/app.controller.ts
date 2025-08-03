import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtPayload } from './types/express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user-test')
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth('access-token')
  testUser(@Req() req: Request & { user?: JwtPayload }) {
    console.log(req.user);
    return `유저 이메일: ${req.user?.email}`;
  }
}
