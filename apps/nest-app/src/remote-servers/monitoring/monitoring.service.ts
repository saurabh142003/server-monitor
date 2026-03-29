import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TicketCreatedEvent } from 'src/shared/events/ticket.event';
import { TicketCreationContextQuery } from 'src/queries';

@Injectable()
export class MonitoringService {
    constructor(private readonly ticketCreationContextQuery: TicketCreationContextQuery) { }

    @OnEvent(TicketCreatedEvent.name)
    async handleTicketCreated(event: TicketCreatedEvent) {
        const { anomalyId } = event.payload;
        const { server, ticket } = await this.ticketCreationContextQuery.execute(anomalyId);
        console.log(server, ticket);
    }

}
