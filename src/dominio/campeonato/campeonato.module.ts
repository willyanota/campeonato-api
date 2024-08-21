import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCampeonato } from "../../infra/typeOrm/repositorios/repositorioORMCampeonato";
import { Campeonato } from "../entidades/campeonato.entity";
import { CampeonatoController } from "./campeonato.controller";
import { BuscadorDeCampeonatosService } from "./services/buscadorDeCampeonatos.service";
import { CriadorDeCampeonatoService } from "./services/criadorDeCampeonato.service";
import { EditorDeCampeonatoService } from "./services/editorDeCampeonato.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Campeonato])],
  controllers: [CampeonatoController],
  providers: [
    JwtService,
    CriadorDeCampeonatoService,
    EditorDeCampeonatoService,
    BuscadorDeCampeonatosService,
    {
      provide: "RepositorioCampeonato",
      useClass: RepositorioORMCampeonato,
    },
  ],
})
export class CampeonatoModulo {}
