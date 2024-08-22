import { EnvConfigService } from "./config.service";

export const environments = new EnvConfigService(
  `envs/.env.${process.env.NODE_ENV || "local"}`,
);
