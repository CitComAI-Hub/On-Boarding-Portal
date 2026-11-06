import { Registration } from "../entity/registration.entity";
import { TrusterIssuer } from "../type/truster-issuer";
import { CreatedRealm, keycloakService } from "./keycloak.service";
import { logger } from "./logger";
import { tirService } from "./tir.service";
import { tilService } from "./til.service";

class RegistrationService {

    /**
     * Registers the DID in the TIR/TIL. If the DID was generated, it also creates the realm
     * and returns the credentials of its admin user, to be sent to the organization.
     */
    async register(registration: Registration): Promise<CreatedRealm['admin']> {
        let admin: CreatedRealm['admin'];
        if (registration.didGenerated) {
            ({ admin } = await keycloakService.createRealm(registration));
        }
        const tirIssuer: TrusterIssuer = {
            did: registration.did,
            credentials: []
        }
        try {
            await tirService.registerDid(tirIssuer);
            await tilService.registerDid(tirIssuer);
        } catch(error) {
            logger.info('Remove realm because register DID failed');
            if (registration.didGenerated) {
                await keycloakService.removeRealm(registration.did);
            }
            throw error;
        }
        return admin;
    }
    async unregister(did: string, removeRealm: boolean = false) {
        if (removeRealm) {
            await keycloakService.removeRealm(did);
        }
        await Promise.all([
            tirService.deleteDid(did),
            tilService.deleteDid(did),
        ]);
    }
}

export const registrationService = new RegistrationService();