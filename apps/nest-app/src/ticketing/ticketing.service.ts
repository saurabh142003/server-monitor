import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AnomalyCreatedEvent } from 'src/shared/events/anomaly-event';
import { TicketingProviderFactory } from './ticketing-providers/ticketing-provider.factory';
import { AnomalyStatus, Severity } from 'src/log-analysis/log-analysis-jobs/entities/anomaly.entity';
import { TicketSeverity } from './ticketing.types';
import { LogAnalysisJobsService } from 'src/log-analysis/log-analysis-jobs/log-analysis-jobs.service';
import { TicketCreatedEvent } from 'src/shared/events/ticket.event';

@Injectable()
export class TicketingService {
    constructor(
        private readonly ticketingProviderFactory: TicketingProviderFactory,
        private readonly logAnalysisJobService: LogAnalysisJobsService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    @OnEvent(AnomalyCreatedEvent.name)
    async handleAnomalyCreated(event: AnomalyCreatedEvent) {
        const { ownerId, anomalyId, jobId } = event.payload;
        const ticketingSystemConfig = await this.logAnalysisJobService.getTicketingSystemConfig(jobId, ownerId);

        if (!ticketingSystemConfig?.type) {
            console.log('No provider config found');
            return;
        }
        const provider = this.ticketingProviderFactory.create(ticketingSystemConfig);
        const anomaly = await this.logAnalysisJobService.getAnomalyById(anomalyId);

        if (!anomaly || anomaly.status != AnomalyStatus.OPEN) {
            console.log('Anomaly not found or not open');
            return;
        }

        await provider.createTicket({
            title: anomaly.title,
            description: anomaly.description as string,
            severity: this.mapSeverity(anomaly.severity),
        });

        this.eventEmitter.emit(TicketCreatedEvent.name, new TicketCreatedEvent({
            anomalyId
        }))
    }

    mapSeverity(severity: Severity): TicketSeverity {
        switch (severity) {
            case Severity.LOW:
                return TicketSeverity.LOW;
            case Severity.MEDIUM:
                return TicketSeverity.MEDIUM;
            case Severity.HIGH:
                return TicketSeverity.HIGH;
            case Severity.CRITICAL:
                return TicketSeverity.CRITICAL;
            default:
                return TicketSeverity.MEDIUM;
        }
    }
}
