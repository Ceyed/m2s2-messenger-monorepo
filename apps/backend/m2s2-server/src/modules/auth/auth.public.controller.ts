import { LoginDto } from '@m2s2/backend/dtos';
import { ModuleEnum } from '@m2s2/backend/enums';
import { M2S2Controller } from '@m2s2/backend/shared/decorators';
import { RouteTypeEnum } from '@m2s2/backend/shared/enums';
import { Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@M2S2Controller(ModuleEnum.Auth, 'auth', RouteTypeEnum.Public)
export class AuthPublicController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this._authService.signIn(loginDto.mobile, loginDto.password);
  }
}
