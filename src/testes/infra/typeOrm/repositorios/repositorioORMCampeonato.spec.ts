import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Campeonato } from "../../../../dominio/entidades/campeonato.entity";
import { RepositorioORMCampeonato } from "../../../../infra/typeOrm/repositorios/repositorioORMCampeonato";

describe("Campeonato repositório ORM", () => {
  let repositorioCampeonato: RepositorioORMCampeonato;
  let campeonato;

  const typeOrmMock = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    where: jest.fn(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    campeonato = {
      nome: "nome do campeonato",
      dataInicio: "2023-12-20T20:39:46.546Z",
      dataFim: new Date(),
      inscricaoDataInicio: "2023-12-20T20:39:46.546Z",
      inscricaoDataFim: new Date(),
      ativo: true,
    };
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMCampeonato,
        {
          provide: getRepositoryToken(Campeonato),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioCampeonato = modulo.get<RepositorioORMCampeonato>(
      RepositorioORMCampeonato,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar campeonato", () => {
    it('Deve chamar o método "save" do typeOrm apenas uma vez e salvar Campeonato', async () => {
      typeOrmMock.save.mockReturnValue(campeonato);

      await repositorioCampeonato.salvar(campeonato);

      expect(typeOrmMock.save).toHaveBeenCalledWith(campeonato);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao salvar Campeonato", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Erro ao salvar campeonato no banco de dados."),
      );

      const criarCampeonato = async () => {
        await repositorioCampeonato.salvar(campeonato);
      };

      await expect(criarCampeonato).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar campeonato no banco de dados.",
        ),
      );

      expect(typeOrmMock.save).toHaveBeenCalledWith(campeonato);
    });
  });

  describe("Buscar todos campeonatos", () => {
    it('Deve chamar o método "find" do typeOrm apenas uma vez', async () => {
      typeOrmMock.find.mockResolvedValue([campeonato]);

      await repositorioCampeonato.buscarTodos();

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        order: { dataCriacao: "DESC" },
      });
    });

    it("Deve retornar um array Campeonato", async () => {
      typeOrmMock.find.mockResolvedValue([campeonato]);

      const resultado = await repositorioCampeonato.buscarTodos();

      expect(resultado).toEqual([campeonato]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao buscar Campeonatos", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Ocorreu um erro ao buscar campeonatos no banco de dados."),
      );

      const buscarTodosCampeonatos = async () => {
        await repositorioCampeonato.buscarTodos();
      };

      await expect(buscarTodosCampeonatos).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar campeonatos no banco de dados.",
        ),
      );
    });
  });

  describe("Buscar campeonato pelo id", () => {
    it('Deve chamar o método "findOne" do typeOrm apenas uma vez', async () => {
      const id = 1;
      typeOrmMock.findOne.mockResolvedValue(campeonato);

      await repositorioCampeonato.buscarPorId(id);

      expect(typeOrmMock.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: id },
      });
    });

    it("Deve retornar Campeonato", async () => {
      const id = 1;
      typeOrmMock.findOne.mockResolvedValue(campeonato);

      const resultado = await repositorioCampeonato.buscarPorId(id);

      expect(resultado).toEqual(campeonato);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao buscar Campeonato pelo id", async () => {
      const id = 1;
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Erro ao buscar campeonato pelo id no banco de dados."),
      );

      const buscarCampeonatoPeloId = async () => {
        await repositorioCampeonato.buscarPorId(id);
      };

      await expect(buscarCampeonatoPeloId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar campeonato pelo id no banco de dados.",
        ),
      );
    });
  });

  describe("Buscar campeonatos ativos", () => {
    it("Deve encontrar os campeonatos ativos", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValueOnce([campeonato]),
      });

      const resultado = await repositorioCampeonato.buscarAtivos();

      expect(resultado).toEqual([campeonato]);
    });

    it("createQueryBuilder deve ser chamado com o campeonato", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValueOnce([campeonato]),
      });

      await repositorioCampeonato.buscarAtivos();

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("CAM");
    });

    it("where deve ser chamado com ativo = true", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValueOnce([campeonato]),
      });

      await repositorioCampeonato.buscarAtivos();

      expect(typeOrmMock.where).toHaveBeenCalledWith("CAM.ativo = :ativo", {
        ativo: true,
      });
    });

    it("getMany deve ser chamado uma vez", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValueOnce([campeonato]),
      });

      await repositorioCampeonato.buscarAtivos();

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca dos campeonatos ativos", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValue(
          new Error("Erro ao buscar campeonatos ativos no banco de dados."),
        ),
      });

      const buscarCampeonatosAtivos = async () => {
        await repositorioCampeonato.buscarAtivos();
      };

      await expect(buscarCampeonatosAtivos).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar campeonatos ativos no banco de dados.",
        ),
      );
    });
  });
});
