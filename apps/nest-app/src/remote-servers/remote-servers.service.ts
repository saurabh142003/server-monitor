import { Injectable } from '@nestjs/common';
import { CreateRemoteServerDto } from './dto/create-remote-server.dto';
import { UpdateRemoteServerDto } from './dto/update-remote-server.dto';
import { RemoteServer } from './entities/remote-server.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RemoteServersService {
  constructor(@InjectRepository(RemoteServer) private readonly remoteServersRepository: Repository<RemoteServer>) { }
  create(createRemoteServerDto: CreateRemoteServerDto, ownerId: string) {
    return this.remoteServersRepository.save({ ...createRemoteServerDto, ownerId });
  }

  findAll(ownerId: string) {
    return this.remoteServersRepository.find({ where: { ownerId } });
  }

  findOne(id: string, ownerId: string) {
    return this.remoteServersRepository.findOne({ where: { id, ownerId } });
  }

  update(id: string, updateRemoteServerDto: UpdateRemoteServerDto, ownerId: string) {
    return this.remoteServersRepository.update(id, { ...updateRemoteServerDto, ownerId });
  }

  remove(id: string, ownerId: string) {
    return this.remoteServersRepository.delete({ id, ownerId });
  }
}
