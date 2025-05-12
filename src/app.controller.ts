import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  @Get()
  getHello(@Req() req: Request) {
    return req.user;
  }
}
