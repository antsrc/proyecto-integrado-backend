import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener cookie con token' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(dto.nombre, dto.contrasena);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3600000,
    });

    res.status(200).send();
  }

  @Public()
  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión y eliminar cookie del token' })
  logout(@Res() res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).send();
  }

  @Public()
  @Get('user')
  @ApiOperation({ summary: 'Obtener el usuario autenticado desde la cookie' })
  getUser(@Req() req: Request) {
    return this.authService.getUser(req.cookies?.token);
  }
}
