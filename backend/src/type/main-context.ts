import { Registration, RegistrationStatus } from "../entity/registration.entity";

export interface MailContext {
    registration: Registration;
    previousState?: RegistrationStatus;
    serverOrigin: string;
    accountUrl?: string;
    adminUrl?: string;
    /** Realm admin credentials, only set when the realm has just been created. */
    adminUsername?: string;
    temporaryPassword?: string;
    guideUrl?: string;
}