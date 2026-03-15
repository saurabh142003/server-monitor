import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogAnalysisJobsService } from './log-analysis-jobs.service';
import { CreateLogAnalysisJobDto } from './dto/create-log-analysis-job.dto';
import { UpdateLogAnalysisJobDto } from './dto/update-log-analysis-job.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/current-user.interface';

@Controller('log-analysis-jobs')
export class LogAnalysisJobsController {
  constructor(private readonly logAnalysisJobsService: LogAnalysisJobsService) { }

  @Post()
  create(@Body() createLogAnalysisJobDto: CreateLogAnalysisJobDto, @CurrentUser() user: User) {
    return this.logAnalysisJobsService.create(createLogAnalysisJobDto, user.id);
  }

  @Get()
  findAll() {
    return this.logAnalysisJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logAnalysisJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogAnalysisJobDto: UpdateLogAnalysisJobDto) {
    return this.logAnalysisJobsService.update(+id, updateLogAnalysisJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logAnalysisJobsService.remove(+id);
  }
}
