import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AnomalyCreatedEvent } from 'src/shared/events/anomaly-event';

@Injectable()
export class TicketingService {
    constructor(

    ) { }

    @OnEvent(AnomalyCreatedEvent.name)
    handleAnomalyCreated(event: AnomalyCreatedEvent) {
        console.log(event);
    }
}
