import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLogAnalysisJobDto } from './dto/create-log-analysis-job.dto';
import { UpdateLogAnalysisJobDto } from './dto/update-log-analysis-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogAnalysisJob, LogAnalysisJobStatus } from './entities/log-analysis-job.entity';
import { In, Repository } from 'typeorm';
import { LogSourcesService } from 'src/log-sources/log-sources.service';
import { RemoteServersService } from 'src/remote-servers/remote-servers.service';
import { Anomaly, AnomalyStatus, Severity } from './entities/anomaly.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AnomalyCreatedEvent } from 'src/shared/events/anomaly-event';


@Injectable()
export class LogAnalysisJobsService {
  constructor(@InjectRepository(LogAnalysisJob) private readonly logAnalysisJobRepository: Repository<LogAnalysisJob>,
    @InjectRepository(Anomaly) private readonly anomalyRepository: Repository<Anomaly>,
    private readonly logSourcesService: LogSourcesService,
    private readonly remoteServersService: RemoteServersService,
    private readonly eventEmitter: EventEmitter2) { }
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
      ...dto,
      ownerId,
      status: LogAnalysisJobStatus.INITIALISED,
      logSource,
      remoteServer,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  findAll(ownerId: string) {
    return this.logAnalysisJobRepository.find({ where: { ownerId } });
  }

  findOne(id: string, ownerId: string) {
    return this.logAnalysisJobRepository.findOne({ where: { id, ownerId } });
  }

  update(id: string, updateLogAnalysisJobDto: UpdateLogAnalysisJobDto, ownerId: string) {
    return this.logAnalysisJobRepository.update({ id, ownerId }, updateLogAnalysisJobDto);
  }

  remove(id: string, ownerId: string) {
    return this.logAnalysisJobRepository.delete({ id, ownerId });
  }

  async addAnomaly(logAnalysisJob: LogAnalysisJob, anomaly: {
    title: string;
    description?: string;
    severity: Severity;
    ticketInfo?: Record<string, any>;
  }) {
    const job = await this.anomalyRepository.findOne({ where: { logAnalysisJob: { id: logAnalysisJob.id }, status: In([AnomalyStatus.OPEN, AnomalyStatus.IN_PROGRESS]) } });
    if (job) return;
    const savedAnomaly = await this.anomalyRepository.save({
      ...anomaly,
      logAnalysisJob,
      status: AnomalyStatus.OPEN
    })

    this.eventEmitter.emit(AnomalyCreatedEvent.name, new AnomalyCreatedEvent({
      anomaly: savedAnomaly,
      job: logAnalysisJob
    }))
  }
}
