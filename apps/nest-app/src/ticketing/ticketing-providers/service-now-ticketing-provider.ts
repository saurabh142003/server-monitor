import { ITicketingProvider } from "./ticketing-provider.interface";
import { Ticket, TicketCreate, TicketStatus } from "../ticketing.types";
import { title } from "process";

export class ServiceNowTicketingProvider implements ITicketingProvider {
    constructor(private readonly config: Record<string, any>) { }
    createTicket(ticket: TicketCreate): Promise<Ticket> {
        const ticketProps: Ticket = {
            id: 'random-id',
            title: ticket.title,
            description: ticket.description,
            severity: ticket.severity,
            status: TicketStatus.OPEN,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        console.log('Ticket created: ', ticketProps);

        return Promise.resolve(ticketProps)
    }
    updateTicket(ticketId: string, props: Pick<Ticket, "status" | "title" | "description">): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    deleteTicket(ticketId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getTicket(ticketId: string): Promise<Ticket> {
        throw new Error("Method not implemented.");
    }
    getTickets(): Promise<Ticket[]> {
        throw new Error("Method not implemented.");
    }
}