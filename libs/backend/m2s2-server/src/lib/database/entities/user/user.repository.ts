import { UpdateResultDto, uuid } from '@m2s2/shared/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }

  async getOneOrFail(id: uuid): Promise<UserEntity> {
    const user = await this.findOneBy({ id });
    if (!user) throw new NotFoundException('User not founded');
    return user;
  }

  async getOneOrFailByMobile(mobile: string): Promise<UserEntity> {
    const user = await this.findOneBy({ mobile });
    if (!user) throw new NotFoundException('User not founded');
    return user;
  }

  async edit(id: uuid, data: Partial<UserEntity>): Promise<UpdateResultDto> {
    const updateResult: UpdateResult = await this.update(id, data);
    return { status: !!updateResult.affected };
  }
}
