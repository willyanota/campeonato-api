import { Test, TestingModule } from "@nestjs/testing";
import { JogoController } from "../../dominio/jogo/jogo.controller";
import { BuscadorDeJogosService } from "../../dominio/jogo/services/buscadorDeJogos.service";
import { CriadorDeJogoService } from "../../dominio/jogo/services/criadorDeJogo.service";
import { EditorDeJogoService } from "../../dominio/jogo/services/editorDeJogo.service";

describe("jogo controller", () => {
  let jogoController: JogoController;
  const servicoMock = {
    criar: jest.fn(),
    buscarPor: jest.fn(),
    editar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarPorData: jest.fn(),
    cadastrarResultado: jest.fn(),
    buscarPorFaseId: jest.fn(),
    buscarPorCategoriaId: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        JogoController,
        {
          provide: CriadorDeJogoService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeJogosService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeJogoService,
          useValue: servicoMock,
        },
      ],
    }).compile();
    jogoController = modulo.get<JogoController>(JogoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar jogo", () => {
    it('deve chamar o método "criar" com êxito', async () => {
      const criarJogoDto = {
        numeroDoJogo: 1,
        numeroDaRodada: 1,
        dataHora: new Date(),
        faseId: 1,
        equipe1Id: 1,
        equipe2Id: 2,
        localId: 1,
      };

      await jogoController.criarJogo(criarJogoDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarJogoDto);
    });
  });

  describe("buscar jogos por campeonato id", () => {
    it('deve chamar o método "buscarPor" com êxito', async () => {
      const buscarJogosDto = { id: 1 };

      await jogoController.buscarJogosPeloCampeonatoId(buscarJogosDto);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });

  describe("editar jogo", () => {
    it('deve chamar o método "editar" com êxito', async () => {
      const editarJogoDto = {
        id: 1,
        numeroDoJogo: 1,
        dataHora: new Date(),
        localId: 1,
      };

      await jogoController.editarJogo(editarJogoDto);

      expect(servicoMock.editar).toHaveBeenNthCalledWith(1, editarJogoDto);
    });
  });

  describe("Buscar todos jogos", () => {
    it('Deve chamar o método "buscarTodos" do serviço apenas uma vez', async () => {
      await jogoController.buscarTodosJogos();

      expect(servicoMock.buscarTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar jogos por data", () => {
    it('Deve chamar o método "buscarPorData" do serviço apenas uma vez', async () => {
      const buscarPorDataDto = { data: "21-02-2024" };

      await jogoController.buscarJogosPorData(buscarPorDataDto);

      expect(servicoMock.buscarPorData).toHaveBeenCalledTimes(1);
    });
  });

  describe("cadastrar resultado do jogo", () => {
    it('deve chamar o método "cadastrarResultado" com êxito', async () => {
      const cadastrarResultadoDto = {
        id: 1,
        realizado: true,
        wo: false,
        golsRegularEquipe1: 2,
        golsRegularEquipe2: 1,
        golsProrrogacaoEquipe1: 0,
        golsProrrogacaoEquipe2: 0,
        golsPenaltiEquipe1: 0,
        golsPenaltiEquipe2: 0,
      };

      await jogoController.cadastrarResultado(cadastrarResultadoDto);

      expect(servicoMock.cadastrarResultado).toHaveBeenNthCalledWith(
        1,
        cadastrarResultadoDto,
      );
    });
  });

  describe("buscar jogos por fase id", () => {
    it('deve chamar o método "buscarPorFaseId" com êxito', async () => {
      const buscarJogosDto = { id: 1 };

      await jogoController.buscarJogosPorFaseId(buscarJogosDto);

      expect(servicoMock.buscarPorFaseId).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar jogos por categoria id", () => {
    it('deve chamar o método "buscarPorCategoriaId" com êxito', async () => {
      const buscarJogosDto = { id: 1 };

      await jogoController.buscarJogosPorCategoriaId(buscarJogosDto);

      expect(servicoMock.buscarPorCategoriaId).toHaveBeenCalledTimes(1);
    });
  });
});
