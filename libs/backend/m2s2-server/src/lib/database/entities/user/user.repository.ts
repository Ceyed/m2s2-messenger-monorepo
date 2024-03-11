import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }

  async getOneOrFail(mobile: string): Promise<UserEntity> {
    const user = await this.findOneBy({ mobile });
    if (!user) throw new NotFoundException('User not founded');
    return user;
  }
}
