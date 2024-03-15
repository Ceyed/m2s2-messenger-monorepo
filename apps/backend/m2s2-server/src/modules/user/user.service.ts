import { RegisterDto, UpdateUserProfileDto } from '@m2s2/backend/dtos';
import { UserEntity, UserRepository } from '@m2s2/backend/entities';
import { UserAuth } from '@m2s2/backend/shared/types';
import { UpdateResultDto } from '@m2s2/shared/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  getOneOrFailByMobile(mobile: string): Promise<UserEntity> {
    return this._userRepository.getOneOrFailByMobile(mobile);
  }

  async userExists(conditions: Partial<Record<keyof UserEntity, any>>): Promise<boolean> {
    const count: number = await this._userRepository.countBy(conditions);
    return !!count;
  }

  create(registerDto: RegisterDto, salt: string): Promise<UserEntity> {
    return this._userRepository.save({ ...registerDto, salt });
  }

  async updateProfile(
    user: UserAuth,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UpdateResultDto> {
    await this._userRepository.getOneOrFail(user.id);
    return this._userRepository.edit(user.id, updateUserProfileDto);
  }
}
