import { Body, Controller, Delete, Param, Post, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Delete(':id')
deleteUser(@Param('id', ParseIntPipe) id: number) {
  return this.authService.deleteUser(id);
}

}