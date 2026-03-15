import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RemoteServerStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    UNKNOWN = "unknown",
}
@Entity()
export class RemoteServer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    ownerId: string;

    @Column({ type: "simple-json" })
    config: Record<string, any>;

    @Column({ default: RemoteServerStatus.UNKNOWN })
    status: RemoteServerStatus;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}

