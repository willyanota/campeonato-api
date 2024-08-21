import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Local } from "../../../../dominio/entidades/local.entity";
import { RepositorioORMLocal } from "../../../../infra/typeOrm/repositorios/repositorioORMLocal";
import { LocalBuilder } from "../../../builders/localBuilder";

describe("local repositorio ORM", () => {
  let repositorioLocal: RepositorioORMLocal;
  let local;
  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(),
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    local = LocalBuilder.umLocal()
      .comId(1)
      .comNome("nome local")
      .comEndereco("endereço local")
      .comCep("78465122")
      .comCampeonato();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMLocal,
        {
          provide: getRepositoryToken(Local),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioLocal = modulo.get<RepositorioORMLocal>(RepositorioORMLocal);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar um local", () => {
    it("Deve salvar um local", async () => {
      typeOrmMock.save.mockReturnValue(local);

      await repositorioLocal.salvar(local);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, local);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao salvar local", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção de salvar um local."),
      );

      const criarLocal = async () => {
        await repositorioLocal.salvar(local);
      };

      await expect(criarLocal).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar local no banco de dados.",
        ),
      );
    });
  });

  describe("busca local pelo id", () => {
    it("Deve chamar o método uma vez", async () => {
      typeOrmMock.findOne.mockResolvedValue(local);

      await repositorioLocal.buscarPorId(local.id);

      expect(typeOrmMock.findOne).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar um local pelo id passado", async () => {
      typeOrmMock.findOne.mockResolvedValue(local);

      const resultado: Local = await repositorioLocal.buscarPorId(local.id);

      expect(resultado).toEqual(local);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca do local pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Teste de exceção de busca uma categoria."),
      );

      const buscarLocalPorId = async () => {
        await repositorioLocal.buscarPorId(local.id);
      };

      await expect(buscarLocalPorId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar o local no banco de dados.",
        ),
      );
    });
  });

  describe("Buscar todos locais", () => {
    it('Deve chamar o método "find" do typeOrm apenas uma vez', async () => {
      typeOrmMock.find.mockResolvedValue([local]);

      await repositorioLocal.buscarTodos();

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        relations: ["campeonato"],
      });
    });

    it('Deve chamar o método "find" do typeOrm e retornar um array de local', async () => {
      typeOrmMock.find.mockResolvedValue([local]);

      const resultado = await repositorioLocal.buscarTodos();

      expect(resultado).toEqual([local]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao buscar locais", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Erro ao buscar locais no banco de dados."),
      );

      await expect(repositorioLocal.buscarTodos()).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar locais no banco de dados.",
        ),
      );

      expect(typeOrmMock.find).toHaveBeenCalledWith({
        relations: ["campeonato"],
      });
    });
  });

  describe("busca locais pelo campeonato id", () => {
    it("Deve encontrar um local pelo campeonato id passado", async () => {
      typeOrmMock.find.mockResolvedValue([local]);

      await repositorioLocal.buscarPorCampeonatoId(local.campeonato.id);

      expect(typeOrmMock.find).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar um local pelo campeonato id passado", async () => {
      typeOrmMock.find.mockResolvedValue([local]);

      const resultado: Local[] = await repositorioLocal.buscarPorCampeonatoId(
        local.campeonato.id,
      );

      expect(resultado).toEqual([local]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca dos locais", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Teste de exceção de busca de locais."),
      );

      const buscarLocaisPeloCampeonatoId = async () => {
        await repositorioLocal.buscarPorCampeonatoId(local.campeonato.id);
      };

      await expect(buscarLocaisPeloCampeonatoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar os locais no banco de dados.",
        ),
      );
    });
  });
});
