import { Test, TestingModule } from "@nestjs/testing";
import { CartaoController } from "../../dominio/cartao/cartao.controller";
import { BuscadorDeCartoesService } from "../../dominio/cartao/services/buscadorDeCartoes.service";
import { CriadorDeCartaoService } from "../../dominio/cartao/services/criadorDeCartao.service";
import { ExcluidorDeCartaoService } from "../../dominio/cartao/services/excluidorDeCartao.service";

describe("cartão controller", () => {
  let cartaoController: CartaoController;
  const servicoMock = {
    criar: jest.fn(),
    buscarPor: jest.fn(),
    excluir: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartaoController,
        {
          provide: CriadorDeCartaoService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeCartoesService,
          useValue: servicoMock,
        },
        {
          provide: ExcluidorDeCartaoService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    cartaoController = module.get<CartaoController>(CartaoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar cartao", () => {
    it("deve criar um cartao", async () => {
      const criarCartaoDto = {
        jogoId: 1,
        jogadorId: 1,
        tipo: "Amarelo",
        minuto: 35,
        periodo: "Primeiro Tempo Prorrogação",
        sumula: "observação súmula",
      };

      await cartaoController.criarCartao(criarCartaoDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarCartaoDto);
    });
  });

  describe("buscar cartoes por jogo id", () => {
    it("Deve buscar os cartoes pelo jogo id sem erros", async () => {
      const buscarCartoesDto = { id: 1 };

      await cartaoController.buscarCartoesPorJogoId(buscarCartoesDto);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });

  describe("excluir cartao", () => {
    it('deve chamar o método "excluir" com êxito', async () => {
      const excluirCartaoDTO = { id: 1 };

      await cartaoController.excluirCartao(excluirCartaoDTO);

      expect(servicoMock.excluir).toHaveBeenCalledTimes(1);
    });
  });
});
