import { QueryRunner } from "typeorm";
import { JWTPayload } from "jose";
import { Registration } from "../entity/registration.entity";
import { RegistrationEvent } from "../entity/registration-event.entity";
import { AppDataSource } from "../service/data.source";
import { BaseRepository } from "./base.repository";

export function actorOf(user?: JWTPayload): string {
    const claim = (name: string) => typeof user?.[name] === 'string' ? user[name] as string : undefined;
    return claim('preferred_username') ?? claim('email') ?? claim('sub') ?? 'unknown';
}

class RegistrationEventRepository extends BaseRepository<RegistrationEvent> {

    constructor() {
        super(RegistrationEvent, AppDataSource);
    }

    async record(registration: Registration, fromStatus: string | null, toStatus: string,
                 reason: string | null | undefined, user: JWTPayload | undefined,
                 qr?: QueryRunner): Promise<RegistrationEvent> {
        return this.save({
            registrationId: registration.id,
            did: registration.did,
            name: registration.name,
            fromStatus,
            toStatus,
            reason: reason ?? null,
            actor: actorOf(user),
        }, qr);
    }

    async history(registrationId: string): Promise<RegistrationEvent[]> {
        return this.repository.find({ where: { registrationId }, order: { at: 'ASC' } });
    }
}

export const registrationEventRepository = new RegistrationEventRepository();
