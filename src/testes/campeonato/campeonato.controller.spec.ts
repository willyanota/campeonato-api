import { Test, TestingModule } from "@nestjs/testing";
import * as moment from "moment";
import { CampeonatoController } from "../../dominio/campeonato/campeonato.controller";
import { BuscadorDeCampeonatosService } from "../../dominio/campeonato/services/buscadorDeCampeonatos.service";
import { CriadorDeCampeonatoService } from "../../dominio/campeonato/services/criadorDeCampeonato.service";
import { EditorDeCampeonatoService } from "../../dominio/campeonato/services/editorDeCampeonato.service";

describe("Campeonato controller", () => {
  let campeonatoController: CampeonatoController;
  const servicoMock = {
    criar: jest.fn(),
    editar: jest.fn(),
    buscar: jest.fn(),
    buscarAtivos: jest.fn(),
    buscarTodos: jest.fn(),
  };

  beforeEach(async () => {
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        CampeonatoController,
        {
          provide: CriadorDeCampeonatoService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeCampeonatosService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeCampeonatoService,
          useValue: servicoMock,
        },
      ],
    }).compile();
    campeonatoController =
      modulo.get<CampeonatoController>(CampeonatoController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Criar campeonato", () => {
    it('Deve chamar o método "criar" do serviço apenas uma vez', async () => {
      const criarCampeonatoDto = {
        nome: "nome do campeonato",
        dataInicio: moment().subtract(1, "days").toDate(),
        dataFim: new Date(),
        inscricaoDataInicio: moment().subtract(1, "days").toDate(),
        inscricaoDataFim: new Date(),
        ativo: true,
        exibirNoSite: false,
      };

      await campeonatoController.criarCampeonato(criarCampeonatoDto);

      expect(servicoMock.criar).toHaveBeenCalledTimes(1);
    });
  });

  describe("Editar campeonato", () => {
    it('Deve chamar o método "editar" do serviço apenas uma vez', async () => {
      const editarCampeonatoDto = {
        id: 1,
        nome: "nome do campeonato",
        dataInicio: moment().subtract(1, "days").toDate(),
        dataFim: new Date(),
        inscricaoDataInicio: moment().subtract(1, "days").toDate(),
        inscricaoDataFim: new Date(),
        ativo: true,
        exibirNoSite: false,
      };

      await campeonatoController.editarCampeonato(editarCampeonatoDto);

      expect(servicoMock.editar).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar todos campeonatos", () => {
    it('Deve chamar o método "buscarTodos" do serviço apenas uma vez', async () => {
      await campeonatoController.buscarTodosCampeonatos();

      expect(servicoMock.buscarTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar campeonato pelo id", () => {
    it('Deve chamar o método "buscar" do serviço apenas uma vez', async () => {
      const buscadorDeCampeonatosDto = { id: 1 };

      await campeonatoController.buscarCampeonatoPeloId(
        buscadorDeCampeonatosDto,
      );

      expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar campeonatos ativos", () => {
    it('Deve chamar o método "buscarAtivos" do serviço apenas uma vez', async () => {
      await campeonatoController.buscarCampeonatosAtivos();

      expect(servicoMock.buscarAtivos).toHaveBeenCalledTimes(1);
    });
  });
});
