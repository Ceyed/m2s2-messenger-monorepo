import { UserEntity, UserRepository } from '@m2s2/backend/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNormalController } from './user.normal.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserNormalController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
