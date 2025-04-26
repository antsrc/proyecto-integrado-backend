import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Deployed';
  }
}
