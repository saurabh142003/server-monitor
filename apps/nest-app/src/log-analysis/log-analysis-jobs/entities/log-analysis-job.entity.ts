import { LogSource } from "src/log-sources/entities/log-source.entity";
import { RemoteServer } from "src/remote-servers/entities/remote-server.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Anomaly } from "./anomaly.entity";

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

    @ManyToOne(() => LogSource, { nullable: true })
    @JoinColumn()
    logSource: LogSource;

    @ManyToOne(() => RemoteServer)
    @JoinColumn()
    remoteServer: RemoteServer;

    @OneToMany(() => Anomaly, (anomaly) => anomaly.logAnalysisJob)
    anomalies: Anomaly[];
}
