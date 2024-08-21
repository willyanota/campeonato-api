import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCategoria } from "../../infra/typeOrm/repositorios/repositorioORMCategoria";
import { RepositorioORMFase } from "../../infra/typeOrm/repositorios/repositorioORMFase";
import { Categoria } from "../entidades/categoria.entity";
import { Fase } from "../entidades/fase.entity";
import { FaseController } from "./fase.controller";
import { BuscadorDeFasesService } from "./services/buscadorDeFases.service";
import { CriadorDeFaseService } from "./services/criadorDeFase.service";
import { EditorDeFaseService } from "./services/editorDeFase.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Fase, Categoria])],
  controllers: [FaseController],
  providers: [
    JwtService,
    CriadorDeFaseService,
    EditorDeFaseService,
    BuscadorDeFasesService,
    {
      provide: "RepositorioFase",
      useClass: RepositorioORMFase,
    },
    {
      provide: "RepositorioCategoria",
      useClass: RepositorioORMCategoria,
    },
  ],
})
export class FaseModulo {}
