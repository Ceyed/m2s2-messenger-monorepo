import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../database/entities/user';

export class LoginDto extends PickType(UserEntity, ['mobile'] as const) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
