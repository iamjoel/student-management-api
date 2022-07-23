import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RO } from '../../declarations/service';
import { handler } from '../../utils/handler';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '../../config';
import LoginDto from './dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  // 验证
  async validate(user: LoginDto): Promise<RO> {
    return handler(async () => {
      const isFind = await this.authService.validate(user);
      if (!isFind) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
      return user;
    });
  }
}
