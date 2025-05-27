import { BadRequestException } from '@nestjs/common';

export function validarFechas(fechaAlta: Date, fechaBaja: Date): void {
  if (fechaBaja < fechaAlta) {
    throw new BadRequestException('La fecha de baja no puede ser anterior a la fecha de alta');
  }
}