import { Injectable } from "@nestjs/common";
import { TicketSeverity, TicketStatus } from "src/ticketing/ticketing.types";

export interface TicketCreationContext {
    ticket: {
        id: string;
        title: string;
        description: string;
        severity: TicketSeverity;
        status: TicketStatus;
        createdAt: Date;
        updatedAt: Date;
    },
    server: {
        isConfigured: boolean;
        sshConfiguration: {
            host: string;
            username: string;
            privateKey: string;
        }
    }
}

@Injectable()
export class TicketCreationContextQuery {
    execute(anomalyId: string): Promise<TicketCreationContext> {
        throw new Error("Method not implemented.");
    }
}