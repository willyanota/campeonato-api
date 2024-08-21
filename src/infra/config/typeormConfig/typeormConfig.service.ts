import { Injectable } from "@nestjs/common";
import { TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist";
import * as path from "path";
import { ConfigService } from "../envConfig/config.service";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    const CONNECTIONS = {
      postgres: {
        name: "postgres",
        type: "postgres",
        host: this.configService.get("DB_HOST"),
        port: parseInt(this.configService.get("DB_PORT")),
        username: this.configService.get("DB_USERNAME"),
        password: this.configService.get("DB_PASSWORD"),
        database: this.configService.get("DB_DATABASE"),
        schema: this.configService.get("DB_SCHEMA"),
        entities: [
          path.join(
            __dirname + "../../../../dominio/entidades/*.entity{.ts,.js}",
          ),
        ],
        synchronize: false,
        logging: this.configService.getBooleanValue("DB_LOGGING"),
      },
    };

    return CONNECTIONS[connectionName]
      ? CONNECTIONS[connectionName]
      : CONNECTIONS.postgres;
  }
}
