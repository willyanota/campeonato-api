import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { DataSource } from "typeorm";
import { AppModule } from "./app.module";

const logger = new Logger("Main");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: "*" });
  const configService = app.get(ConfigService);

  try {
    const dataSource = new DataSource({
      type: "postgres",
      host: configService.get("DB_HOST"),
      port: parseInt(configService.get("DB_PORT")),
      username: configService.get("DB_USERNAME"),
      password: configService.get("DB_PASSWORD"),
      database: configService.get("DB_DATABASE"),
      schema: configService.get("DB_SCHEMA"),
    });

    await dataSource.initialize();
    logger.log("Data Source inicializado.");
  } catch (error) {
    logger.error("Erro na inicialização do Data Source.", error);
    throw error;
  }

  if (configService.get<boolean>("SWAGGER_PUBLISH")) {
    const config = new DocumentBuilder().setTitle("Campeonato Api").build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
  }

  const port = configService.get("APPLICATION_PORT");
  await app.listen(port, () => {
    logger.log(`Servidor rodando na porta: ${port}`);
  });
}
bootstrap();
