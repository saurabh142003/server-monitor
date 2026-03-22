import { Module } from '@nestjs/common';
import { TicketingService } from './ticketing.service';
import { TicketingProviderFactory } from './ticketing-providers/ticketing-provider.factory';
import { LogAnalysisJobsModule } from 'src/log-analysis/log-analysis-jobs/log-analysis-jobs.module';

@Module({
  imports: [LogAnalysisJobsModule],
  providers: [TicketingService, TicketingProviderFactory]
})
export class TicketingModule { }
