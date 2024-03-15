import { ModuleEnum } from '@m2s2/backend/enums';
import { M2S2Controller } from '@m2s2/backend/shared/decorators';
import { RouteTypeEnum } from '@m2s2/backend/shared/enums';
import { Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@M2S2Controller(ModuleEnum.Auth, 'auth', RouteTypeEnum.Normal)
export class AuthNormalController {
  constructor(private readonly _authService: AuthService) {}

  @Get('profile')
  getProfile(@Request() req) {
    console.log('a');

    return req.user;
  }
}
