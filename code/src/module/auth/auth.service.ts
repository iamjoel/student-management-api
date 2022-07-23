import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validate({ account, password }: LoginDto): boolean {
    if (account === 'admin' && password === '1') {
      return true;
    }
    return false;
  }

  async login(user: LoginDto): Promise<{ access_token: string } | string> {
    const isValid = this.validate(user);
    if (isValid) {
      return {
        // sign 的内容里，必须包含 account, 和 password 内容，否则验证不过。
        access_token: this.jwtService.sign(
          {
            id: 1,
            name: 'joel',
            ...user,
          },
          {
            expiresIn: '7 days',
          },
        ),
      };
    }
    return '帐号或密码错误';
  }
}
