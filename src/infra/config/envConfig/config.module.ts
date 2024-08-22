import { Global, Module } from "@nestjs/common";
import { EnvConfigService } from "./config.service";
import { environments } from "./environments";

@Global()
@Module({
  providers: [
    {
      provide: EnvConfigService,
      useValue: environments,
    },
  ],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
