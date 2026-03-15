import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogAnalysisJobDto } from './dto/create-log-analysis-job.dto';
import { UpdateLogAnalysisJobDto } from './dto/update-log-analysis-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogAnalysisJob, LogAnalysisJobStatus } from './entities/log-analysis-job.entity';
import { Repository } from 'typeorm';
import { LogSourcesService } from 'src/log-sources/log-sources.service';
import { RemoteServersService } from 'src/remote-servers/remote-servers.service';

@Injectable()
export class LogAnalysisJobsService {
  constructor(@InjectRepository(LogAnalysisJob) private readonly logAnalysisJobRepository: Repository<LogAnalysisJob>,
    private readonly logSourcesService: LogSourcesService,
    private readonly remoteServersService: RemoteServersService) { }
  async create(dto: CreateLogAnalysisJobDto, ownerId: string) {

    const logSource = await this.logSourcesService.findOne(dto.logSourceId, ownerId);

    if (!logSource) {
      throw new NotFoundException('Log source not found');
    }

    const remoteServer = await this.remoteServersService.findOne(dto.remoteServerId, ownerId);

    if (!remoteServer) {
      throw new NotFoundException('Remote server not found');
    }

    return this.logAnalysisJobRepository.save({
      ownerId,
      name: dto.name,
      description: dto.description,
      type: dto.type,
      status: LogAnalysisJobStatus.INITIALISED,
      logSource,
      remoteServer,
    });
  }

  findAll() {
    return `This action returns all logAnalysisJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logAnalysisJob`;
  }

  update(id: number, updateLogAnalysisJobDto: UpdateLogAnalysisJobDto) {
    return `This action updates a #${id} logAnalysisJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} logAnalysisJob`;
  }
}
