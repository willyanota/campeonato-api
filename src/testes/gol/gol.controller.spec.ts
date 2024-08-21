import { Test, TestingModule } from "@nestjs/testing";
import { GolController } from "../../dominio/gol/gol.controller";
import { BuscadorDeGolsService } from "../../dominio/gol/services/buscadorDeGols.service";
import { CriadorDeGolService } from "../../dominio/gol/services/criadorDeGol.service";
import { ExcluidorDeGolService } from "../../dominio/gol/services/excluidorDeGol.service";

describe("gol controller", () => {
  let golController: GolController;
  const servicoMock = {
    criar: jest.fn(),
    buscarPor: jest.fn(),
    excluir: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GolController,
        {
          provide: CriadorDeGolService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeGolsService,
          useValue: servicoMock,
        },
        {
          provide: ExcluidorDeGolService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    golController = module.get<GolController>(GolController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar gol", () => {
    it("deve criar um gol", async () => {
      const criarGolDto = {
        jogoId: 1,
        jogadorId: 1,
        minuto: 35,
        periodo: "Primeiro Tempo Prorrogação",
        golContra: false,
      };

      await golController.criarGol(criarGolDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarGolDto);
    });
  });

  describe("buscar gols pelo jogo id", () => {
    it("Deve buscar as categorias pelo campeonato id sem erros", async () => {
      const buscarGolsPorJogoIdDto = { id: 1 };

      await golController.buscarGolsPorJogoId(buscarGolsPorJogoIdDto);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });

  describe("excluir gol", () => {
    it('deve chamar o método "excluir" com êxito', async () => {
      const excluirGolDto = { id: 1 };

      await golController.excluirGol(excluirGolDto);

      expect(servicoMock.excluir).toHaveBeenCalledTimes(1);
    });
  });
});
