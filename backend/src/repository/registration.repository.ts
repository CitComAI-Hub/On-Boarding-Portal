import { Brackets, QueryRunner } from "typeorm";
import { Registration, RegistrationStatus } from "../entity/registration.entity";
import { AppDataSource } from "../service/data.source";
import { BaseRepository } from "./base.repository";
import { storageService } from "../service/storage.service";
import { PaginatedResult } from "../type/pagination-result";

export type RegistrationUpdate = Partial<Pick<Registration, 'address' | 'city' | 'country' | 'did' | 'email' | 'name' | 'postCode' | 'taxId' | 'filesPath'>>

export const REGISTRATION_SORT_FIELDS = ['name', 'email', 'status', 'createdAt', 'updatedAt'] as const;
export type RegistrationSortField = typeof REGISTRATION_SORT_FIELDS[number];

export interface RegistrationSearchOptions {
    page: number;
    limit: number;
    statuses?: RegistrationStatus[];
    search?: string;
    sortBy: RegistrationSortField;
    order: 'ASC' | 'DESC';
}

// Text columns are sorted case-insensitively so "acme" and "Acme" end up together.
const CASE_INSENSITIVE_SORT: RegistrationSortField[] = ['name', 'email'];

class RegistrationRepository extends BaseRepository<Registration> {

    constructor() {
        super(Registration, AppDataSource);
    }

    async findById(id: any, qr?: QueryRunner): Promise<Registration | null> {
        const registration = await super.findById(id, qr);
        if (registration?.filesPath) {
            registration.files = await storageService.listFiles(registration.filesPath);
        }
        return registration;
    }

    async search(options: RegistrationSearchOptions): Promise<PaginatedResult<Registration>> {
        const { page, limit, statuses, search, sortBy, order } = options;
        const qb = this.repository.createQueryBuilder('registration');

        if (statuses?.length) {
            qb.andWhere('registration.status IN (:...statuses)', { statuses });
        }

        const term = search?.trim().toLowerCase();
        if (term) {
            const pattern = `%${term.replace(/[\\%_]/g, '\\$&')}%`;
            qb.andWhere(new Brackets(where => where
                .where('LOWER(registration.name) LIKE :pattern', { pattern })
                .orWhere('LOWER(registration.email) LIKE :pattern', { pattern })
            ));
        }

        if (CASE_INSENSITIVE_SORT.includes(sortBy)) {
            qb.addSelect(`LOWER(registration.${sortBy})`, 'sort_key').orderBy('sort_key', order);
        } else {
            qb.orderBy(`registration.${sortBy}`, order);
        }
        if (sortBy !== 'createdAt') {
            qb.addOrderBy('registration.createdAt', 'DESC');
        }

        const [items, total] = await qb.skip(page * limit).take(limit).getManyAndCount();
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async updateStatus(id: string, status: RegistrationStatus, reason: string, qr?: QueryRunner): Promise<Registration | null> {
        return super.update(id, { status, reason }, qr)
    }

    async updateInfo(id: string, data: RegistrationUpdate, qr?: QueryRunner): Promise<Registration | null> {
        return super.update(id, {...data, status: RegistrationStatus.SUBMITTED}, qr)
    }
}

export const registrationRepository = new RegistrationRepository();