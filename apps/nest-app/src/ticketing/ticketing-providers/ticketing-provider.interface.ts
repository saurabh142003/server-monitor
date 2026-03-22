import { Ticket, TicketCreate } from "../ticketing.types";

export interface ITicketingProvider {
    createTicket(ticket: TicketCreate): Promise<Ticket>;
    updateTicket(ticketId: string, props: Pick<Ticket, 'status' | 'title' | 'description'>): Promise<Ticket>;
    deleteTicket(ticketId: string): Promise<void>;
    getTicket(ticketId: string): Promise<Ticket>;
    getTickets(): Promise<Ticket[]>;
}