import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from 'src/server/database/database.provider';
import { DataSource } from 'typeorm';
import { PatchOptionDto, PostOptionDto } from './dto/option.dto';
import { OptionEntity } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) {}
  async get() {
    return this.dataSource.getRepository(OptionEntity).find();
  }

  async post(dto: PostOptionDto) {
    const entity = this.dataSource.getRepository(OptionEntity).create();

    Object.assign(entity, dto);

    return await this.dataSource.getRepository(OptionEntity).save(entity);
  }

  async patch(id: OptionEntity['id'], dto: PatchOptionDto) {
    await this.dataSource.getRepository(OptionEntity).update({ id }, dto);
    return await this.dataSource
      .getRepository(OptionEntity)
      .findOneOrFail({ where: { id } });
  }

  async delete(id: OptionEntity['id']) {
    await this.dataSource
      .getRepository(OptionEntity)
      .update({ id }, { deleted: true });

    return await this.dataSource
      .getRepository(OptionEntity)
      .findOneOrFail({ where: { id } });
  }
}
