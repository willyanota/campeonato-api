import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMGol } from "../../infra/typeOrm/repositorios/repositorioORMGol";
import { RepositorioORMJogador } from "../../infra/typeOrm/repositorios/repositorioORMJogador";
import { RepositorioORMJogo } from "../../infra/typeOrm/repositorios/repositorioORMJogo";
import { Gol } from "../entidades/gol.entity";
import { Jogador } from "../entidades/jogador.entity";
import { Jogo } from "../entidades/jogo.entity";
import { GolController } from "./gol.controller";
import { BuscadorDeGolsService } from "./services/buscadorDeGols.service";
import { CriadorDeGolService } from "./services/criadorDeGol.service";
import { ExcluidorDeGolService } from "./services/excluidorDeGol.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Gol, Jogo, Jogador])],
  controllers: [GolController],
  providers: [
    JwtService,
    CriadorDeGolService,
    BuscadorDeGolsService,
    ExcluidorDeGolService,
    {
      provide: "RepositorioGol",
      useClass: RepositorioORMGol,
    },
    {
      provide: "RepositorioJogo",
      useClass: RepositorioORMJogo,
    },
    {
      provide: "RepositorioJogador",
      useClass: RepositorioORMJogador,
    },
  ],
})
export class GolModulo {}
