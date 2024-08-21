import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMGrupo } from "src/infra/typeOrm/repositorios/repositorioORMGrupo";
import { RepositorioORMJogo } from "src/infra/typeOrm/repositorios/repositorioORMJogo";
import { RepositorioORMCategoria } from "../../infra/typeOrm/repositorios/repositorioORMCategoria";
import { RepositorioORMEquipe } from "../../infra/typeOrm/repositorios/repositorioORMEquipe";
import { Categoria } from "../entidades/categoria.entity";
import { Equipe } from "../entidades/equipe.entity";
import { Grupo } from "../entidades/grupo.entity";
import { Jogo } from "../entidades/jogo.entity";
import { EquipeController } from "./equipe.controller";
import { BuscadorDeEquipesService } from "./services/buscadorDeEquipes.service";
import { CriadorDeEquipeService } from "./services/criadorDeEquipe.service";
import { EditorDeEquipeService } from "./services/editorDeEquipe.service";
import { ExcluidorDeEquipeService } from "./services/excluidorDeEquipe.service";
import { PontuadorDeEquipesService } from "./services/pontuadorDeEquipes.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Equipe, Categoria, Jogo, Grupo])],
  controllers: [EquipeController],
  providers: [
    JwtService,
    CriadorDeEquipeService,
    EditorDeEquipeService,
    BuscadorDeEquipesService,
    ExcluidorDeEquipeService,
    PontuadorDeEquipesService,
    {
      provide: "RepositorioEquipe",
      useClass: RepositorioORMEquipe,
    },
    {
      provide: "RepositorioCategoria",
      useClass: RepositorioORMCategoria,
    },
    {
      provide: "RepositorioJogo",
      useClass: RepositorioORMJogo,
    },
    {
      provide: "RepositorioGrupo",
      useClass: RepositorioORMGrupo,
    },
  ],
})
export class EquipeModulo {}
