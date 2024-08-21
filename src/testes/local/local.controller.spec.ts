import { Test, TestingModule } from "@nestjs/testing";
import { LocalController } from "../../dominio/local/local.controller";
import { BuscadorDeLocaisService } from "../../dominio/local/services/buscadorDeLocais.service";
import { CriadorDeLocalService } from "../../dominio/local/services/criadorDeLocal.service";
import { EditorDeLocalService } from "../../dominio/local/services/editorDeLocal.service";

describe("local controller", () => {
  let localController: LocalController;
  const servicoMock = {
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    editar: jest.fn(),
    buscarPor: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalController,
        {
          provide: CriadorDeLocalService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeLocalService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeLocaisService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    localController = module.get<LocalController>(LocalController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar local", () => {
    it("Deve criar uma categoria sem erros", async () => {
      const criarLocalDto = {
        campeonatoId: 1,
        nome: "nome do local",
        endereco: "endereco do local",
        cep: "cep do local",
      };

      await localController.criarLocal(criarLocalDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarLocalDto);
    });
  });

  describe("editar local", () => {
    it('deve chamar o método "editar" com êxito', async () => {
      const editarLocalDto = {
        id: 1,
        campeonatoId: 1,
        nome: "nome do local",
        endereco: "endereco do local",
        cep: "cep do local",
      };

      await localController.editarLocal(editarLocalDto);

      expect(servicoMock.editar).toHaveBeenNthCalledWith(1, editarLocalDto);
    });
  });

  describe("Buscar todos locais", () => {
    it('Deve chamar o método "buscarTodos" do serviço apenas uma vez', async () => {
      await localController.buscarTodosLocais();

      expect(servicoMock.buscarTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe("Buscar locais por campeonato id", () => {
    it('Deve chamar o método "buscarPor" do serviço apenas uma vez', async () => {
      const buscarLocais = { id: 1 };

      await localController.buscarLocaisPeloCampeonatoId(buscarLocais);

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });
});
