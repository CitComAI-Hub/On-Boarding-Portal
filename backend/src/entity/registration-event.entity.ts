import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { configService } from "../service/config.service";

const dbType = configService.get().database.type;
const DATE_COLUMN_TYPE = dbType === 'mysql' ? 'datetime' : 'timestamptz';

/** Status a deleted registration is recorded with. */
export const DELETED = "deleted";

/**
 * One admin action on a registration: a status change or a deletion. Append-only history
 * of who let an organisation into the trust anchor (or removed it), when and why.
 * It keeps the registration's DID and name and has no foreign key, so it outlives
 * the registration it refers to.
 */
@Entity()
export class RegistrationEvent {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index()
    @Column()
    registrationId!: string;

    @Column()
    did!: string;

    @Column()
    name!: string;

    @Column({ type: 'varchar', nullable: true })
    fromStatus!: string | null;

    @Column()
    toStatus!: string;

    @Column({ nullable: true, type: 'text' })
    reason!: string | null;

    /** Admin who did it: preferred_username, else email, else sub of their token. */
    @Column()
    actor!: string;

    @CreateDateColumn({ type: DATE_COLUMN_TYPE })
    at?: Date;
}
