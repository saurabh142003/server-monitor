import { AppEvent } from "./app-event";
import { Anomaly } from "../../log-analysis/log-analysis-jobs/entities/anomaly.entity";
import { LogAnalysisJob } from "../../log-analysis/log-analysis-jobs/entities/log-analysis-job.entity";

export interface AnomalyEventPayload {
    anomaly: Anomaly,
    job: LogAnalysisJob
}
export class AnomalyCreatedEvent extends AppEvent<AnomalyEventPayload> { }