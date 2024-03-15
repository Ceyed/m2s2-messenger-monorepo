import { AccessTokenDto, RegisterDto } from '@m2s2/backend/dtos';
import { UserEntity } from '@m2s2/backend/entities';
import { BcryptConfig, bcryptConfig } from '@m2s2/backend/shared/configs';
import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UserService,
    private readonly _jwtService: JwtService,
    @Inject(bcryptConfig.KEY)
    private readonly _bcryptConfigService: BcryptConfig,
  ) {}

  async register(registerDto: RegisterDto): Promise<AccessTokenDto> {
    await this._registerValidation(registerDto);

    const userSalt: string = randomBytes(16).toString('hex');
    registerDto.password = await this._encryptPassword(registerDto.password, userSalt);

    const user: UserEntity = await this._usersService.create(registerDto, userSalt);
    return this._createToken(user);
  }

  async login(mobile: string, password: string): Promise<AccessTokenDto> {
    const user: UserEntity = await this._usersService.getOneOrFailByMobile(mobile);

    const passwordMatches: boolean = await bcrypt.compare(password + user.salt, user.password);
    if (!passwordMatches) throw new UnauthorizedException();

    return this._createToken(user);
  }

  private async _registerValidation(registerDto: RegisterDto): Promise<void> {
    if (await this._usersService.userExists({ mobile: registerDto.mobile })) {
      throw new ConflictException('Mobile already taken. Please choose another');
    }
    if (registerDto.username) {
      if (await this._usersService.userExists({ username: registerDto.username })) {
        throw new ConflictException('Username already taken. Please choose another');
      }
    }
  }

  private async _encryptPassword(password: string, userSalt: string): Promise<string> {
    return bcrypt.hash(password + userSalt, this._bcryptConfigService.saltHash);
  }

  private async _createToken(user: UserEntity): Promise<AccessTokenDto> {
    const payload = { sub: user.id, mobile: user.mobile, username: user.username };
    return {
      access_token: await this._jwtService.signAsync(payload),
    };
  }
}
