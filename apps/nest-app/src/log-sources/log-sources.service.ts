import { Injectable } from '@nestjs/common';
import { CreateLogSourceDto } from './dto/create-log-source.dto';
import { UpdateLogSourceDto } from './dto/update-log-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogSource } from './entities/log-source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogSourcesService {
  constructor(@InjectRepository(LogSource) private readonly logSourceRepository: Repository<LogSource>) { }

  create(createLogSourceDto: CreateLogSourceDto, ownerId: string) {
    const logSource = this.logSourceRepository.create({ ...createLogSourceDto, ownerId });
    return this.logSourceRepository.save(logSource);
  }

  findAll(ownerId: string) {
    return this.logSourceRepository.find({ where: { ownerId } });
  }

  findOne(id: string, ownerId: string) {
    return this.logSourceRepository.findOne({ where: { id, ownerId } });
  }

  update(id: string, updateLogSourceDto: UpdateLogSourceDto, ownerId: string) {
    return this.logSourceRepository.update(id, { ...updateLogSourceDto, ownerId });
  }

  remove(id: string, ownerId: string) {
    return this.logSourceRepository.delete({ id, ownerId });
  }
}
