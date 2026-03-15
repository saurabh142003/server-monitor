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
    const remoteServer = this.remoteServersRepository.create({ ...createRemoteServerDto, ownerId });
    return this.remoteServersRepository.save(remoteServer);
  }

  findAll(ownerId: string) {
    return this.remoteServersRepository.find({ where: { ownerId } });
  }

  findOne(id: string) {
    return this.remoteServersRepository.findOne({ where: { id } });
  }

  update(id: string, updateRemoteServerDto: UpdateRemoteServerDto) {
    return this.remoteServersRepository.update(id as any, updateRemoteServerDto);
  }

  remove(id: string) {
    return this.remoteServersRepository.delete(id as any);
  }
}
