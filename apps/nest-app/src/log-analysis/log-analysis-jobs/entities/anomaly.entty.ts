import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LogAnalysisJob } from "./log-analysis-job.entity";

@Entity()
export class Anomaly {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    severity: string;

    @Column({ type: 'simple-json', nullable: true })
    ticketInfo: Record<string, any>;

    @ManyToOne(() => LogAnalysisJob, (logAnalysisJob) => logAnalysisJob.anomalies, {
        onDelete: 'CASCADE'
    })
    logAnalysisJob: LogAnalysisJob;
}