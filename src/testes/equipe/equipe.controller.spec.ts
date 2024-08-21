import { Test, TestingModule } from "@nestjs/testing";
import { EquipeController } from "../../dominio/equipe/equipe.controller";
import { BuscadorDeEquipesService } from "../../dominio/equipe/services/buscadorDeEquipes.service";
import { CriadorDeEquipeService } from "../../dominio/equipe/services/criadorDeEquipe.service";
import { EditorDeEquipeService } from "../../dominio/equipe/services/editorDeEquipe.service";
import { ExcluidorDeEquipeService } from "../../dominio/equipe/services/excluidorDeEquipe.service";

describe("Equipe controller", () => {
  let equipeController: EquipeController;
  const servicoMock = {
    criar: jest.fn(),
    buscarPor: jest.fn(),
    editar: jest.fn(),
    excluir: jest.fn(),
    buscarEquipesDosCampeonatosAtivos: jest.fn(),
    buscarPorCategoriaId: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        EquipeController,
        {
          provide: CriadorDeEquipeService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeEquipesService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeEquipeService,
          useValue: servicoMock,
        },
        {
          provide: ExcluidorDeEquipeService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    equipeController = modulo.get<EquipeController>(EquipeController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar equipe", () => {
    it('deve chamar o método "criarEquipe" com êxito', async () => {
      const criarEquipeDTO = {
        categoriaId: 1,
        nome: "nomeEquipe",
        responsavel: "nomeResponsavel",
        ehConvidada: true,
        abertura: true,
      };

      await equipeController.criarEquipe(criarEquipeDTO);

      expect(servicoMock.criar).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar equipes por id do campeonato", () => {
    it('deve chamar o método "buscarEquipesPeloCampeonatoId" com êxito', async () => {
      const buscarEquipesDto = { id: 1 };

      await equipeController.buscarEquipesPeloCampeonatoId(buscarEquipesDto);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });

  describe("editar equipe", () => {
    it('deve chamar o método "editar" com êxito', async () => {
      const editarEquipeDTO = {
        id: 1,
        nome: "nomeEquipe",
        responsavel: "nomeResponsavel",
        ehConvidada: true,
        abertura: true,
      };

      await equipeController.editarEquipe(editarEquipeDTO);

      expect(servicoMock.editar).toHaveBeenCalledTimes(1);
    });
  });

  describe("excluir equipe", () => {
    it('deve chamar o método "excluir" com êxito', async () => {
      const excluirEquipeDTO = { id: 1 };

      await equipeController.excluirEquipe(excluirEquipeDTO);

      expect(servicoMock.excluir).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar equipes dos campeonatos ativos", () => {
    it('deve chamar o método "buscarEquipesDosCampeonatosAtivos" com êxito', async () => {
      await equipeController.buscarEquipesDosCampeonatosAtivos();

      expect(
        servicoMock.buscarEquipesDosCampeonatosAtivos,
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar equipes por id da categoria", () => {
    it('deve chamar o método "buscarEquipesPorCategoriaId" com êxito', async () => {
      const buscarEquipesDto = { id: 1 };

      await equipeController.buscarEquipesPorCategoriaId(buscarEquipesDto);

      expect(servicoMock.buscarPorCategoriaId).toHaveBeenCalledTimes(1);
    });
  });
});
