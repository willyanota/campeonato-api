import { ConfigService } from "./config.service";

export const environments = new ConfigService(
  `envs/.env.${process.env.NODE_ENV || "local"}`,
);
