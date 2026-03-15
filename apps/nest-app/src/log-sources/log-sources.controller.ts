import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogSourcesService } from './log-sources.service';
import { CreateLogSourceDto } from './dto/create-log-source.dto';
import { UpdateLogSourceDto } from './dto/update-log-source.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { User } from 'src/auth/current-user.interface';

@Controller('log-sources')
export class LogSourcesController {
  constructor(private readonly logSourcesService: LogSourcesService) { }

  @Post()
  create(@Body() createLogSourceDto: CreateLogSourceDto, @CurrentUser() user: User) {
    return this.logSourcesService.create(createLogSourceDto, user?.id);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.logSourcesService.findAll(user?.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.logSourcesService.findOne(id, user?.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogSourceDto: UpdateLogSourceDto, @CurrentUser() user: User) {
    return this.logSourcesService.update(id, updateLogSourceDto, user?.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.logSourcesService.remove(id, user?.id);
  }
}
