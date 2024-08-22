import { Global, Module } from "@nestjs/common";
import { EnvConfigModule } from "../envConfig/config.module";
import { TypeOrmConfigService } from "./typeormConfig.service";

@Global()
@Module({
  imports: [EnvConfigModule],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
