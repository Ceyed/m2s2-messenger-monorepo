import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../database/entities/user';
import { GLOBAL_EXCEPT_DTO } from './../../../../../shared/src/lib/constants/global-except.constant';

export class RegisterDto extends OmitType(UserEntity, [
  ...GLOBAL_EXCEPT_DTO,
  'salt',
  'password',
] as const) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
