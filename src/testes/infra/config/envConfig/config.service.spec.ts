import { Test, TestingModule } from "@nestjs/testing";
import { EnvConfigService } from "../../../../infra/config/envConfig/config.service";

describe("ConfigService", () => {
  let service: EnvConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EnvConfigService,
        {
          provide: String,
          useValue: "src/testes/infra/config/envConfig/.env.test",
        },
      ],
    }).compile();

    service = moduleRef.get<EnvConfigService>(EnvConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("get method", () => {
    it("should return a string value of ambient variable", () => {
      const response = service.get("TEST_PROPERTY1");

      expect(response).toBe("any_value");
    });

    it("should return a undefined when key does not exist in dotenv file", () => {
      const response = service.get("INVALID_KEY");

      expect(response).toBeUndefined();
    });
  });

  describe("getBooleanValue method", () => {
    it('should return true when key value is equals a "true"', () => {
      const response = service.getBooleanValue("TEST_PROPERTY2");

      expect(response).toBe(true);
    });

    it('should return false when key value is equals a "false"', () => {
      const response = service.getBooleanValue("TEST_PROPERTY3");

      expect(response).toBe(false);
    });

    it("should return undefined when key value is null or undefined", () => {
      const response = service.getBooleanValue("INVALID_KEY");

      expect(response).toBe(undefined);
    });
  });
});
