import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCampeonato } from "../../infra/typeOrm/repositorios/repositorioORMCampeonato";
import { RepositorioORMCategoria } from "../../infra/typeOrm/repositorios/repositorioORMCategoria";
import { Campeonato } from "../entidades/campeonato.entity";
import { Categoria } from "../entidades/categoria.entity";
import { CategoriaController } from "./categoria.controller";
import { BuscadorDeCategoriasService } from "./services/buscadorDeCategorias.service";
import { CriadorDeCategoriaService } from "./services/criadorDeCategoria.service";
import { EditorDeCategoriaService } from "./services/editorDeCategoria.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Campeonato])],
  controllers: [CategoriaController],
  providers: [
    JwtService,
    CriadorDeCategoriaService,
    EditorDeCategoriaService,
    BuscadorDeCategoriasService,
    {
      provide: "RepositorioCategoria",
      useClass: RepositorioORMCategoria,
    },
    {
      provide: "RepositorioCampeonato",
      useClass: RepositorioORMCampeonato,
    },
  ],
})
export class CategoriaModulo {}
