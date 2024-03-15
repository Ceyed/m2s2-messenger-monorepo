import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user';

export class UpdateUserProfileDto extends PartialType(
  PickType(UserEntity, ['username', 'firstName', 'lastName'] as const),
) {}
