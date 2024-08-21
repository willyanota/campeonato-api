import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { environments } from "./environments";

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: environments,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModuleEnv {}
