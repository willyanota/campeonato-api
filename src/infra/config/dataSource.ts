import { Logger } from "@nestjs/common";
import { DataSource } from "typeorm";
import { environments } from "./envConfig/environments";

const logger = new Logger("AppDataSource");

const AppDataSource = new DataSource({
  type: "postgres",
  host: environments.get("DB_HOST"),
  port: parseInt(environments.get("DB_PORT")),
  username: environments.get("DB_USERNAME"),
  password: environments.get("DB_PASSWORD"),
  database: environments.get("DB_DATABASE"),
  schema: environments.get("DB_SCHEMA"),
});

AppDataSource.initialize()
  .then(() => {
    logger.log("Data Source foi inicializado.");
  })
  .catch((err) => {
    logger.error("Erro durante inicialização do Data Source.", err);
  });

export const Manager = AppDataSource.manager;
