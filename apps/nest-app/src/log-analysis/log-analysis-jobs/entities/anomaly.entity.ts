import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LogAnalysisJob } from "./log-analysis-job.entity";

export enum Severity {
    CRITICAL = 'critical',
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
}

export enum AnomalyStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    CLOSED = 'closed',
}

@Entity()
export class Anomaly {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    severity: Severity;

    @Column()
    status: AnomalyStatus;

    @Column({ type: 'simple-json', nullable: true })
    ticketInfo: Record<string, any>;

    @ManyToOne(() => LogAnalysisJob, (logAnalysisJob) => logAnalysisJob.anomalies, {
        onDelete: 'CASCADE'
    })
    logAnalysisJob: LogAnalysisJob;
}