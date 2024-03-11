import { UserEntity, UserRepository } from '@m2s2/backend/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  getOneOrFail(mobile: string): Promise<UserEntity> {
    return this._userRepository.getOneOrFail(mobile);
  }
}
