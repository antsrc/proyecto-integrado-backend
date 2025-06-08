import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { LogQueryDto } from './log-query.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('Logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('audit')
  @ApiOperation({ summary: 'Obtener las n primeras líneas del log de auditoría' })
  getAuditLog(@Query() query: LogQueryDto) {
    return this.logService.getAuditLogLines(query.n);
  }

  @Get('error')
  @ApiOperation({ summary: 'Obtener las n primeras líneas del log de errores' })
  getErrorLog(@Query() query: LogQueryDto) {
    return this.logService.getErrorLogLines(query.n);
  }
}
