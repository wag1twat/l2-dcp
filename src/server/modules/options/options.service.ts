import { Inject, Injectable } from '@nestjs/common';
import { OptionEntity } from 'src/server/entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionsService {
  constructor(
    @Inject('OPTIONS_REPOSITORY')
    private optionsRepository: Repository<OptionEntity>,
  ) {}
  async get() {
    return this.optionsRepository.find();
  }
}
