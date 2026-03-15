import { Controller, Post, Body, Param } from '@nestjs/common';
import { LogAnalysisService } from './log-analysis.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/current-user.interface';

@Controller('log-analysis')
export class LogAnalysisController {
    constructor(private readonly logAnalysisService: LogAnalysisService) { }
    @Post('ingest/:jobId')
    ingestLogs(@Param('jobId') jobId: string, @Body() body: Record<string, any>[], @CurrentUser() user: User) {
        return this.logAnalysisService.ingestLogs(jobId, user.id, body)
    }
}
