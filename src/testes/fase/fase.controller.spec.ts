import { Test, TestingModule } from "@nestjs/testing";
import { FaseController } from "../../dominio/fase/fase.controller";
import { BuscadorDeFasesService } from "../../dominio/fase/services/buscadorDeFases.service";
import { CriadorDeFaseService } from "../../dominio/fase/services/criadorDeFase.service";
import { EditorDeFaseService } from "../../dominio/fase/services/editorDeFase.service";

describe("Fase controller", () => {
  let faseController: FaseController;
  const servicoMock = {
    criar: jest.fn(),
    editar: jest.fn(),
    buscarPorCategoriaId: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        FaseController,
        {
          provide: CriadorDeFaseService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeFaseService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeFasesService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    faseController = modulo.get<FaseController>(FaseController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar fase", () => {
    it('deve chamar o método "criar" com êxito', async () => {
      const criarFaseDto = {
        categoriaId: 1,
        nome: "nome da fase",
        ehGrupo: false,
        temProrrogacao: false,
        temPenalti: false,
        exibirNoSite: false,
        quantidadeClassificados: 2,
      };

      await faseController.criarFase(criarFaseDto);

      expect(servicoMock.criar).toHaveBeenCalledTimes(1);
    });
  });

  describe("editar fase", () => {
    it('deve chamar o método "editar" com êxito', async () => {
      const editarFaseDto = {
        id: 1,
        nome: "nome da fase",
        ehGrupo: false,
        temProrrogacao: false,
        temPenalti: false,
        exibirNoSite: false,
        quantidadeClassificados: 2,
      };

      await faseController.editarFase(editarFaseDto);

      expect(servicoMock.editar).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar fases por id da categoria", () => {
    it('deve chamar o método "buscarPor" com êxito', async () => {
      const buscadorDeFasesDto = { id: 1 };

      await faseController.buscarFasesPorCategoriaId(buscadorDeFasesDto);

      expect(servicoMock.buscarPorCategoriaId).toHaveBeenCalledTimes(1);
    });
  });
});
