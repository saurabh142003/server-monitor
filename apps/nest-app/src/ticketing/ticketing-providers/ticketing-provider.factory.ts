import { Injectable } from "@nestjs/common";
import { ITicketingProvider } from "./ticketing-provider.interface";
import { ServiceNowTicketingProvider } from "./service-now-ticketing-provider";

@Injectable()
export class TicketingProviderFactory {
    create(config: Record<string, any>): ITicketingProvider {
        switch (config.type) {
            case ServiceNowTicketingProvider.name:
                return new ServiceNowTicketingProvider(config);
            default:
                throw new Error('Invalid provider');
        }
    }
}