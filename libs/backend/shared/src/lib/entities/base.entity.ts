import { uuid } from '@m2s2/shared/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({ format: 'uuid', type: 'string' })
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  @IsUUID()
  id: uuid;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty()
  @IsDate()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  public deletedAt: Date;
}
