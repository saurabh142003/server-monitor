import { Injectable, NotFoundException } from '@nestjs/common';
import { Severity } from './log-analysis-jobs/entities/anomaly.entty';
import { LogAnalysisJobsService } from './log-analysis-jobs/log-analysis-jobs.service';

@Injectable()
export class LogAnalysisService {
    constructor(private readonly logAnalysisJobsService: LogAnalysisJobsService) { }
    async ingestLogs(jobId: string, ownerId: string, logs: any[]) {
        const job = await this.logAnalysisJobsService.findOne(jobId, ownerId);
        if (!job) {
            throw new NotFoundException('Job not found');
        }

        for (const log of logs) {
            const message = log['message'] || "";
            const level = log['level'] || "";
            await this.logAnalysisJobsService.addAnomaly(job, {
                title: message,
                severity: level === 'error' ? Severity.CRITICAL : level === 'warn' ? Severity.HIGH : level === 'info' ? Severity.MEDIUM : Severity.LOW,
            });
        }


    }
}
