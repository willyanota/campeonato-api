import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "../../../../infra/config/envConfig/config.service";
import { TypeOrmConfigService } from "../../../../infra/config/typeormConfig/typeormConfig.service";

describe("TypeormConfigService", () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        {
          provide: ConfigService,
          useFactory: () => {},
        },
      ],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
