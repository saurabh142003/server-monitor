import { AppEvent } from "./app-event";
export interface TicketEventPayload {
    ticketId: string,
}
export class TicketCreatedEvent extends AppEvent<TicketEventPayload> { }