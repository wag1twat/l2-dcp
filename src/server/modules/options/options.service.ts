import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PatchOptionDto, PostOptionDto } from './dto/option.dto';
import { OptionEntity } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @Inject(OptionEntity.name)
    private optionsRepository: Repository<OptionEntity>,
  ) {}
  async get() {
    return this.optionsRepository.find();
  }

  async post(dto: PostOptionDto) {
    const entity = this.optionsRepository.create();

    Object.assign(entity, dto);

    return await this.optionsRepository.save(entity);
  }

  async patch(id: OptionEntity['id'], dto: PatchOptionDto) {
    await this.optionsRepository.update({ id }, dto);
    return await this.optionsRepository.findOneOrFail({ where: { id } });
  }

  async delete(id: OptionEntity['id']) {
    await this.optionsRepository.update({ id }, { deleted: true });

    return await this.optionsRepository.findOneOrFail({ where: { id } });
  }
}
