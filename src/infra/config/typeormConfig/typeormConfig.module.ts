import { Global, Module } from "@nestjs/common";
import { ConfigModuleEnv } from "../envConfig/config.module";
import { TypeOrmConfigService } from "./typeormConfig.service";

@Global()
@Module({
  imports: [ConfigModuleEnv],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
