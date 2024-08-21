import { Test, TestingModule } from "@nestjs/testing";
import { CategoriaController } from "../../dominio/categoria/categoria.controller";
import { BuscadorDeCategoriasService } from "../../dominio/categoria/services/buscadorDeCategorias.service";
import { CriadorDeCategoriaService } from "../../dominio/categoria/services/criadorDeCategoria.service";
import { EditorDeCategoriaService } from "../../dominio/categoria/services/editorDeCategoria.service";

describe("categoria controller", () => {
  let categoriaController: CategoriaController;
  const servicoMock = {
    criar: jest.fn(),
    editar: jest.fn(),
    buscar: jest.fn(),
    buscarPor: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriaController,
        {
          provide: CriadorDeCategoriaService,
          useValue: servicoMock,
        },
        {
          provide: EditorDeCategoriaService,
          useValue: servicoMock,
        },
        {
          provide: BuscadorDeCategoriasService,
          useValue: servicoMock,
        },
      ],
    }).compile();

    categoriaController = module.get<CategoriaController>(CategoriaController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("criar categoria", () => {
    it("Deve criar uma categoria sem erros", async () => {
      const criarCategoriaDto = {
        campeonatoId: 1,
        genero: "F",
        nome: "nome da categoria",
        idadeMinima: 18,
        idadeMaxima: 49,
        maxJogadoresAtivos: 20,
        maxJogadoresDependentes: 5,
        goleiroForaIdade: false,
        maxCartoesVermelhosPorJogo: 2,
        maxHorasInscricaoJogador: 48,
      };

      await categoriaController.criarCategoria(criarCategoriaDto);

      expect(servicoMock.criar).toHaveBeenNthCalledWith(1, criarCategoriaDto);
    });
  });

  describe("editar categoria", () => {
    it("Deve editar uma categoria sem erros", async () => {
      const editarCategoriaDto = {
        id: 1,
        genero: "F",
        nome: "nome da categoria",
        idadeMinima: 18,
        idadeMaxima: 49,
        maxJogadoresAtivos: 20,
        maxJogadoresDependentes: 5,
        goleiroForaIdade: false,
        maxCartoesVermelhosPorJogo: 2,
        maxHorasInscricaoJogador: 48,
      };

      await categoriaController.editarCategoria(editarCategoriaDto);

      expect(servicoMock.editar).toHaveBeenCalledTimes(1);
    });
  });

  describe("buscar categorias pelo campeonato id", () => {
    it("Deve buscar as categorias pelo campeonato id sem erros", async () => {
      const buscarCategoriasDto = { id: 1 };

      await categoriaController.buscarCategoriasPeloCampeonatoId(
        buscarCategoriasDto,
      );

      expect(servicoMock.buscarPor).toHaveBeenCalledTimes(1);
    });
  });
});
