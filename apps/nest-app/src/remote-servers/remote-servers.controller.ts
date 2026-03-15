import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemoteServersService } from './remote-servers.service';
import { CreateRemoteServerDto } from './dto/create-remote-server.dto';
import { UpdateRemoteServerDto } from './dto/update-remote-server.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { User } from 'src/auth/current-user.interface';

@Controller('remote-servers')
export class RemoteServersController {
  constructor(private readonly remoteServersService: RemoteServersService) { }

  @Post()
  create(@Body() createRemoteServerDto: CreateRemoteServerDto, @CurrentUser() user: User) {
    return this.remoteServersService.create(createRemoteServerDto, user?.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.remoteServersService.findAll(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.remoteServersService.findOne(id, user?.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRemoteServerDto: UpdateRemoteServerDto, @CurrentUser() user: User) {
    return this.remoteServersService.update(id, updateRemoteServerDto, user?.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.remoteServersService.remove(id, user?.id);
  }
}
