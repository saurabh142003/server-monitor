import { AppEvent } from "./app-event";
import { Anomaly } from "../../log-analysis/log-analysis-jobs/entities/anomaly.entity";
import { LogAnalysisJob } from "../../log-analysis/log-analysis-jobs/entities/log-analysis-job.entity";

export interface AnomalyEventPayload {
    anomalyId: string,
    jobId: string,
    ownerId: string
}
export class AnomalyCreatedEvent extends AppEvent<AnomalyEventPayload> { }