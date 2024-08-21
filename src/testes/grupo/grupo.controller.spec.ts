import { Test, TestingModule } from "@nestjs/testing";
import { GrupoController } from "../../dominio/grupo/grupo.controller";
import { BuscadorDeGruposService } from "../../dominio/grupo/services/buscadorDeGrupos.service";
import { CriadorDeGrupoService } from "../../dominio/grupo/services/criadorDeGrupo.service";
import { EditorDeGrupoService } from "../../dominio/grupo/services/editorDeGrupo.service";

describe("Grupo controller", () => {
  let grupoController: GrupoController;
  const servicoMock = {
    criar: jest.fn(),
    editar: jest.fn(),
    buscarPorCampeonatoId: jest.fn(),
    buscarTodos: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        GrupoController,
        {
          provide: CriadorDeGrupoService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeGrupoService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeGruposService,
          useValue: servicoMock,
        },
      ],
    }).compile();
    grupoController = modulo.get<GrupoController>(GrupoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar grupo", () => {
    it('deve chamar o método "criar" com êxito', async () => {
      const criarGrupoDto = {
        faseId: 1,
        nome: "nome do grupo",
        observacao: "nome do responsavel",
      };

      await grupoController.criarGrupo(criarGrupoDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarGrupoDto);
    });
  });

  describe("editar grupo", () => {
    it('deve chamar o método "editar" com êxito', async () => {
      const editarGrupoDto = {
        id: 1,
        nome: "nome do grupo",
        observacao: "nome do responsavel",
      };

      await grupoController.editarGrupo(editarGrupoDto);

      expect(servicoMock.editar).toHaveBeenNthCalledWith(1, editarGrupoDto);
    });
  });

  describe("buscar grupos por campeonato id", () => {
    it('deve chamar o método "buscarPor" com êxito', async () => {
      const buscarGruposDto = { id: 1 };

      await grupoController.buscarGruposPorCampeonatoId(buscarGruposDto);

      expect(servicoMock.buscarPorCampeonatoId).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar todos grupos", () => {
    it('Deve chamar o método "buscarTodos" do serviço apenas uma vez', async () => {
      await grupoController.buscarTodosGrupos();

      expect(servicoMock.buscarTodos).toHaveBeenCalledTimes(1);
    });
  });
});
