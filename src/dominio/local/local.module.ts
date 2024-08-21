import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCampeonato } from "src/infra/typeOrm/repositorios/repositorioORMCampeonato";
import { RepositorioORMLocal } from "src/infra/typeOrm/repositorios/repositorioORMLocal";
import { Campeonato } from "../entidades/campeonato.entity";
import { Local } from "../entidades/local.entity";
import { LocalController } from "./local.controller";
import { BuscadorDeLocaisService } from "./services/buscadorDeLocais.service";
import { CriadorDeLocalService } from "./services/criadorDeLocal.service";
import { EditorDeLocalService } from "./services/editorDeLocal.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Local, Campeonato])],
  controllers: [LocalController],
  providers: [
    JwtService,
    CriadorDeLocalService,
    BuscadorDeLocaisService,
    EditorDeLocalService,
    {
      provide: "RepositorioLocal",
      useClass: RepositorioORMLocal,
    },
    {
      provide: "RepositorioCampeonato",
      useClass: RepositorioORMCampeonato,
    },
  ],
})
export class LocalModulo {}
