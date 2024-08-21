import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { environments } from "./infra/config/envConfig/environments";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: "*" });

  if (environments.getBooleanValue("SWAGGER_PUBLISH")) {
    const config = new DocumentBuilder()
      .setTitle("Campeonato")
      .setDescription(
        "API que concentrará as regras de negócio associadas ao Campeonato.",
      )
      .setVersion("1.0")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  await app.listen(environments.get("APPLICATION_PORT"), () => {
    logger.log(
      `Servidor rodando na porta: ${environments.get("APPLICATION_PORT")}`,
    );
  });
}
bootstrap();
