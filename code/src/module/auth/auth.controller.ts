import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';

@ApiTags('登录认证')
@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  async login(@Body() user: LoginDto) {
    return this.authService.login(user);
  }
}
