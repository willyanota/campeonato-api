import { Test, TestingModule } from "@nestjs/testing";
import { JogadorController } from "../../dominio/jogador/jogador.controller";
import { BuscadorDeJogadoresService } from "../../dominio/jogador/services/buscadorDeJogadores.service";
import { CriadorDeJogadorService } from "../../dominio/jogador/services/criadorDeJogador.service";
import { EditorDeJogadorService } from "../../dominio/jogador/services/editorDeJogador.service";

describe("Jogador controller", () => {
  let jogadorController: JogadorController;
  let imagem: Express.Multer.File;
  const servicoMock = {
    criar: jest.fn(),
    editar: jest.fn(),
    deferirSolicitacao: jest.fn(),
    indeferirSolicitacao: jest.fn(),
    buscarSolicitacoes: jest.fn(),
    buscarPor: jest.fn(),
    ativar: jest.fn(),
    solicitarInativacao: jest.fn(),
    buscarPorCategoriaId: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        JogadorController,
        {
          provide: CriadorDeJogadorService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeJogadorService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeJogadoresService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    jogadorController = modulo.get<JogadorController>(JogadorController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar jogador", () => {
    it('deve chamar o método "criarJogador" com êxito', async () => {
      const criarJogadorDto = {
        equipeId: 1,
        cpf: "12345678900",
        ehGoleiro: true,
      };

      await jogadorController.criarJogador(criarJogadorDto, imagem);

      expect(servicoMock.criar).toHaveBeenCalledTimes(1);
    });
  });

  describe("editar jogador", () => {
    it('deve chamar o método "editarJogador" com êxito', async () => {
      const editarJogadorDTO = { id: 1 };

      await jogadorController.editarJogador(editarJogadorDTO, imagem);

      expect(servicoMock.editar).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar jogadores", () => {
    it('deve chamar o método "buscarPor" do serviço apenas uma vez', async () => {
      const buscarJogadoresDto = { id: 1 };

      await jogadorController.buscarJogadoresPorEquipeId(buscarJogadoresDto);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });

    it('deve chamar o método "buscarPorCategoriaId" do serviço apenas uma vez', async () => {
      const buscarJogadoresDto = { id: 1 };

      await jogadorController.buscarJogadoresPorCategoriaId(buscarJogadoresDto);

      expect(servicoMock.buscarPorCategoriaId).toHaveBeenCalledTimes(1);
    });
  });
});
