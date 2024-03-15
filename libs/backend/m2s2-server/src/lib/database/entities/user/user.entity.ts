import { BaseEntity } from '@m2s2/backend/shared/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
  schema: 'user',
})
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  @ApiProperty()
  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Exclude()
  salt: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Column({ nullable: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;

  @Column({ nullable: true, unique: true })
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username?: string;

  get fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
