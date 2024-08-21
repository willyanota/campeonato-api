import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCartao } from "../../infra/typeOrm/repositorios/repositorioORMCartao";
import { RepositorioORMJogador } from "../../infra/typeOrm/repositorios/repositorioORMJogador";
import { RepositorioORMJogo } from "../../infra/typeOrm/repositorios/repositorioORMJogo";
import { Cartao } from "../entidades/cartao.entity";
import { Jogador } from "../entidades/jogador.entity";
import { Jogo } from "../entidades/jogo.entity";
import { SuspensorDeJogadorService } from "../jogador/services/suspensorDeJogador.service";
import { CartaoController } from "./cartao.controller";
import { BuscadorDeCartoesService } from "./services/buscadorDeCartoes.service";
import { CriadorDeCartaoService } from "./services/criadorDeCartao.service";
import { ExcluidorDeCartaoService } from "./services/excluidorDeCartao.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Cartao, Jogo, Jogador])],
  controllers: [CartaoController],
  providers: [
    JwtService,
    CriadorDeCartaoService,
    BuscadorDeCartoesService,
    ExcluidorDeCartaoService,
    SuspensorDeJogadorService,
    {
      provide: "RepositorioCartao",
      useClass: RepositorioORMCartao,
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
export class CartaoModulo {}
