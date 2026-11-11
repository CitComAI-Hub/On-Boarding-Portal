import "reflect-metadata";
import { DataSource } from "typeorm";
import { Registration } from "../entity/registration.entity";
import { RegistrationEvent } from "../entity/registration-event.entity";
import { configService } from "./config.service";
import { logger } from "./logger";

const config = configService.get();
export const AppDataSource: DataSource = new DataSource({ ...config.database, entities: [Registration, RegistrationEvent] });

export async function initializeDatabase(): Promise<DataSource> {
    if (!AppDataSource.isInitialized) {
        logger.info("Initializing database connection...");
        await AppDataSource.initialize();
        logger.info("Database connection initialized.");
    }
    return AppDataSource;
}