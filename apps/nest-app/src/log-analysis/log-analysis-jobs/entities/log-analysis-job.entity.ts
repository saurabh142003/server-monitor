import { LogSource } from "src/log-sources/entities/log-source.entity";
import { RemoteServer } from "src/remote-servers/entities/remote-server.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Anomaly } from "./anomaly.entty";

export enum LogAnalysisJobStatus {
    INITIALISED = 'initialised',
    PENDING = 'pending',
    RUNNING = 'running',
    COMPLETED = 'completed',
    FAILED = 'failed'
}

export enum LogAnalysisJobType {
    ONE_TIME = 'one_time',
    RECURRING = 'recurring'
}

@Entity()
export class LogAnalysisJob {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    ownerId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    type: LogAnalysisJobType;

    @Column()
    status: LogAnalysisJobStatus;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column({ type: "simple-json", nullable: true })
    ticketingSystemConfig?: Record<string, any>;

    @OneToOne(() => LogSource, { nullable: true })
    @JoinColumn()
    logSource: LogSource;

    @OneToOne(() => RemoteServer)
    @JoinColumn()
    remoteServer: RemoteServer;

    @OneToMany(() => Anomaly, (anomaly) => anomaly.logAnalysisJob)
    anomalies: Anomaly[];
}
