import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RemoteServer } from "src/remote-servers/entities/remote-server.entity";

export enum LogSourceStatus {
    ONLINE = 'online',
    OFFLINE = 'offline',
}

export enum LogSourceType {
    ZABBIX = 'zabbix',
    PROMETHEUS = 'prometheus',
}

@Entity()
export class LogSource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    ownerId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: LogSourceStatus;

    @Column()
    type: LogSourceType;

    @Column('simple-json')
    config: Record<string, any>;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
