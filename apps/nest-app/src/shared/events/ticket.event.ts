import { AppEvent } from "./app-event";
export interface TicketEventPayload {
    anomalyId: string,
}
export class TicketCreatedEvent extends AppEvent<TicketEventPayload> { }