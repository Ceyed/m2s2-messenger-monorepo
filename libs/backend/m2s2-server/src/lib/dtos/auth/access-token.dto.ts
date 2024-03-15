import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  access_token: string;
}