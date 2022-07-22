import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import LoginDto from '../user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate({ account, password }: LoginDto): Promise<User> {
    const user = await this.usersService.checkUser({ account, password });
    return user;
  }

  async login(user: LoginDto): Promise<{ access_token: string } | string> {
    const findUser = await this.validate(user);
    if (findUser) {
      return {
        access_token: this.jwtService.sign(
          {
            id: findUser.id,
            name: findUser.name,
            account: user.account,
            password: user.password,
          },
          {
            expiresIn: '7 days',
          },
        ),
        // access_token: this.jwtService.sign(user)
      };
    }
    return '帐号或密码错误';
  }
}
