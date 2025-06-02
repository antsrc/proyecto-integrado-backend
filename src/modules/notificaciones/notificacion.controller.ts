import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Roles('user')
@ApiTags('Notificaciones')
@Controller('notificaciones')
export class NotificacionController {
  constructor(private readonly notificacionService: NotificacionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener resumen de notificaciones (mensualidades sin pagar, alquileres finalizando, incidencias activas)' })
  getResumen() {
    return this.notificacionService.getNotificaciones();
  }
}
