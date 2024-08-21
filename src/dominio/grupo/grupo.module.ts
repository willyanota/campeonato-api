import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMFase } from "../../infra/typeOrm/repositorios/repositorioORMFase";
import { RepositorioORMGrupo } from "../../infra/typeOrm/repositorios/repositorioORMGrupo";
import { Fase } from "../entidades/fase.entity";
import { Grupo } from "../entidades/grupo.entity";
import { GrupoController } from "./grupo.controller";
import { BuscadorDeGruposService } from "./services/buscadorDeGrupos.service";
import { CriadorDeGrupoService } from "./services/criadorDeGrupo.service";
import { EditorDeGrupoService } from "./services/editorDeGrupo.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Grupo, Fase])],
  controllers: [GrupoController],
  providers: [
    JwtService,
    CriadorDeGrupoService,
    EditorDeGrupoService,
    BuscadorDeGruposService,
    {
      provide: "RepositorioGrupo",
      useClass: RepositorioORMGrupo,
    },
    {
      provide: "RepositorioFase",
      useClass: RepositorioORMFase,
    },
  ],
})
export class GrupoModulo {}
