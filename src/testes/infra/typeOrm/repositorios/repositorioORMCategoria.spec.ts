import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Categoria } from "../../../../dominio/entidades/categoria.entity";
import { RepositorioORMCategoria } from "../../../../infra/typeOrm/repositorios/repositorioORMCategoria";
import { CategoriaBuilder } from "../../../builders/categoriaBuilder";

describe("categoria repositorio ORM", () => {
  let repositorioCategoria: RepositorioORMCategoria;
  let categoria;
  const typeOrmMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn(),
    getMany: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    categoria = CategoriaBuilder.umaCategoria()
      .comId(1)
      .comGenero("F")
      .comNome("nome da categoria")
      .comIdadeMinima(18)
      .comIdadeMaxima(49)
      .comMaxJogadoresAtivos(20)
      .comMaxJogadoresDependentes(5)
      .comMaxCartoesVermelhosPorJogo(2)
      .comMaxHorasInscricaoJogador(48)
      .comCampeonato();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMCategoria,
        {
          provide: getRepositoryToken(Categoria),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioCategoria = modulo.get<RepositorioORMCategoria>(
      RepositorioORMCategoria,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar uma categoria", () => {
    it("Deve salvar uma categoria", async () => {
      typeOrmMock.save.mockReturnValue(categoria);

      await repositorioCategoria.salvar(categoria);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, categoria);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao salvar categoria", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção de salvar categoria."),
      );

      const criarCategoria = async () => {
        await repositorioCategoria.salvar(categoria);
      };

      await expect(criarCategoria).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar categoria no banco de dados.",
        ),
      );
    });
  });

  describe("busca uma categoria pelo id", () => {
    it("Deve chamar o método uma vez", async () => {
      typeOrmMock.findOne.mockResolvedValue(categoria);

      await repositorioCategoria.buscarPorId(categoria.id);

      expect(typeOrmMock.findOne).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar uma categoria pelo id passado", async () => {
      typeOrmMock.findOne.mockResolvedValue(categoria);

      const resultado: Categoria = await repositorioCategoria.buscarPorId(
        categoria.id,
      );

      expect(resultado).toEqual(categoria);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca da categoria pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Teste de exceção de busca uma categoria."),
      );

      const buscarCategoriaPeloId = async () => {
        await repositorioCategoria.buscarPorId(categoria.id);
      };

      await expect(buscarCategoriaPeloId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar a categoria no banco de dados.",
        ),
      );
    });
  });

  describe("busca categorias pelo campeonato id", () => {
    it("Deve chamar o método find do typeOrm", async () => {
      typeOrmMock.find.mockResolvedValue([categoria]);

      await repositorioCategoria.buscarPorCampeonatoId(categoria.campeonato.id);

      expect(typeOrmMock.find).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar uma categoria pelo campeonato id passado", async () => {
      typeOrmMock.find.mockResolvedValue([categoria]);

      const resultado: Categoria[] =
        await repositorioCategoria.buscarPorCampeonatoId(
          categoria.campeonato.id,
        );

      expect(resultado).toEqual([categoria]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca das categorias", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Teste de exceção de busca categorias."),
      );

      const buscarCategoriasPeloCampeonatoId = async () => {
        await repositorioCategoria.buscarPorCampeonatoId(
          categoria.campeonato.id,
        );
      };

      await expect(buscarCategoriasPeloCampeonatoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar as categorias no banco de dados.",
        ),
      );
    });
  });
});
