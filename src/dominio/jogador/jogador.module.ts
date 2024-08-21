import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMEquipe } from "../../infra/typeOrm/repositorios/repositorioORMEquipe";
import { RepositorioORMJogador } from "../../infra/typeOrm/repositorios/repositorioORMJogador";
import { Equipe } from "../entidades/equipe.entity";
import { Jogador } from "../entidades/jogador.entity";
import { EnvioDeArquivoMinioService } from "../minio-client/envioDeArquivoMinio.service";
import { MinioClientModulo } from "../minio-client/minio-client.module";
import { JogadorController } from "./jogador.controller";
import { BuscadorDeJogadoresService } from "./services/buscadorDeJogadores.service";
import { CriadorDeJogadorService } from "./services/criadorDeJogador.service";
import { EditorDeJogadorService } from "./services/editorDeJogador.service";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Jogador, Equipe]), MinioClientModulo],
  controllers: [JogadorController],
  providers: [
    JwtService,
    CriadorDeJogadorService,
    EditorDeJogadorService,
    BuscadorDeJogadoresService,
    EnvioDeArquivoMinioService,
    {
      provide: "RepositorioJogador",
      useClass: RepositorioORMJogador,
    },
    {
      provide: "RepositorioEquipe",
      useClass: RepositorioORMEquipe,
    },
  ],
})
export class JogadorModulo {}
