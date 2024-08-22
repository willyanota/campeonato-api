import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { CampeonatoModulo } from "./dominio/campeonato/campeonato.module";
import { CartaoModulo } from "./dominio/cartao/cartao.module";
import { CategoriaModulo } from "./dominio/categoria/categoria.module";
import { EquipeModulo } from "./dominio/equipe/equipe.module";
import { FaseModulo } from "./dominio/fase/fase.module";
import { GolModulo } from "./dominio/gol/gol.module";
import { GrupoModulo } from "./dominio/grupo/grupo.module";
import { JogadorModulo } from "./dominio/jogador/jogador.module";
import { JogoModulo } from "./dominio/jogo/jogo.module";
import { LocalModulo } from "./dominio/local/local.module";
import { MinioClientModulo } from "./dominio/minio-client/minio-client.module";
import { TypeOrmConfigService } from "./infra/typeOrm/config/typeormConfig.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/.env.${process.env.NODE_ENV || "local"}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    CampeonatoModulo,
    CategoriaModulo,
    FaseModulo,
    GrupoModulo,
    EquipeModulo,
    JogadorModulo,
    LocalModulo,
    JogoModulo,
    GolModulo,
    CartaoModulo,
    MinioClientModulo,
    JwtModule,
  ],
  controllers: [AppController],
  exports: [TypeOrmModule],
  providers: [],
})
export class AppModule {}
