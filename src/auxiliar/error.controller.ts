import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Error')
@Controller('error')
export class ErrorController {
  @Get('error-ejemplo')
  @ApiOperation({ summary: 'Lanza un error interno del servidor para pruebas' })
  lanzarErrorEjemplo() {
    throw new InternalServerErrorException('Esto es un error de ejemplo para probar el log de errores');
  }
}