import { UpdateUserProfileDto } from '@m2s2/backend/dtos';
import { ModuleEnum } from '@m2s2/backend/enums';
import { M2S2Controller, User } from '@m2s2/backend/shared/decorators';
import { RouteTypeEnum } from '@m2s2/backend/shared/enums';
import { UserAuth } from '@m2s2/backend/shared/types';
import { UpdateResultDto } from '@m2s2/shared/common';
import { Body, Put } from '@nestjs/common';
import { UserService } from './user.service';

@M2S2Controller(ModuleEnum.User, 'user', RouteTypeEnum.Normal)
export class UserNormalController {
  constructor(private readonly _userService: UserService) {}

  @Put(':id')
  updateUserProfile(
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @User() user: UserAuth,
  ): Promise<UpdateResultDto> {
    return this._userService.updateProfile(user, updateUserProfileDto);
  }
}
