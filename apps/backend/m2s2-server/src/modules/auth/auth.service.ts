import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async signIn(mobile: string, password: string): Promise<{ access_token: string }> {
    const user = await this._usersService.getOneOrFail(mobile);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, mobile: user.mobile };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
