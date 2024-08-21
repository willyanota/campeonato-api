import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Jogo } from "../../../../dominio/entidades/jogo.entity";
import { RepositorioORMJogo } from "../../../../infra/typeOrm/repositorios/repositorioORMJogo";
import { JogoBuilder } from "../../../builders/jogoBuilder";

describe("repositorio jogo ORM", () => {
  let repositorioJogo: RepositorioORMJogo;
  let jogo;
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
    jogo = JogoBuilder.umJogo()
      .comId(1)
      .comNumeroDoJogo(1)
      .comNumeroDaRodada(1)
      .comDataHora(new Date())
      .comFase()
      .comEquipe1()
      .comEquipe2()
      .comLocal()
      .foiRealizado(false)
      .foiWO(false);
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMJogo,
        {
          provide: getRepositoryToken(Jogo),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioJogo = modulo.get<RepositorioORMJogo>(RepositorioORMJogo);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar Jogo", () => {
    it('deve chamar o método "save" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(jogo);

      await repositorioJogo.salvar(jogo);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, jogo);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar jogo", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção ao salvar jogo."),
      );

      await expect(repositorioJogo.salvar(jogo)).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar jogo no banco de dados.",
        ),
      );
    });
  });

  describe("buscarJogosPeloCampeonatoId", () => {
    it("Deve buscar os jogos por campeonatoId com êxito", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      const resultado = await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(resultado).toEqual([jogo]);
    });

    it("createQueryBuilder deve ser chamado com jogo", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("JOG");
    });

    it("leftJoinAndSelect deve ser chamado com fase", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.fase",
        "FAS",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "FAS.categoria",
        "CAT",
      );
    });

    it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "CAT.campeonato",
        "CAM",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe1", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe1",
        "EQ1",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe1", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe2",
        "EQ2",
      );
    });

    it("where deve ser chamado com campeonatoId", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.where).toHaveBeenCalledWith("CAM.id = :campeonatoId", {
        campeonatoId: jogo.fase.categoria.campeonato.id,
      });
    });

    it("getMany deve ser chamado uma vez", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCampeonatoId(
        jogo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar Grupos pelo id do campeonato", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValueOnce(
          new Error(
            "Erro ao buscar jogos pelo id do campeonato no banco de dados.",
          ),
        ),
      });

      const buscarJogosPorCampeonatoId = async () => {
        await repositorioJogo.buscarPorCampeonatoId(
          jogo.fase.categoria.campeonato.id,
        );
      };

      await expect(buscarJogosPorCampeonatoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar jogos pelo id do campeonato no banco de dados.",
        ),
      );
    });
  });

  describe("busca um jogo pelo id", () => {
    it("Deve chamar o método uma vez", async () => {
      typeOrmMock.findOne.mockResolvedValue(jogo);

      await repositorioJogo.buscarPorId(jogo.id);

      expect(typeOrmMock.findOne).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar um jogo pelo id passado", async () => {
      typeOrmMock.findOne.mockResolvedValue(jogo);

      const resultado: Jogo = await repositorioJogo.buscarPorId(jogo.id);

      expect(resultado).toEqual(jogo);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca do jogo pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Teste de exceção de busca um jogo."),
      );

      const buscarJogoPeloId = async () => {
        await repositorioJogo.buscarPorId(jogo.id);
      };

      await expect(buscarJogoPeloId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar o jogo no banco de dados.",
        ),
      );
    });
  });

  describe("Buscar todos jogos", () => {
    it('Deve chamar o método "find" do typeOrm apenas uma vez', async () => {
      typeOrmMock.find.mockResolvedValue([jogo]);

      await repositorioJogo.buscarTodos();

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        relations: [
          "fase",
          "fase.categoria",
          "fase.categoria.campeonato",
          "equipe1",
          "equipe1.categoria",
          "equipe1.categoria.campeonato",
          "equipe2",
          "equipe2.categoria",
          "equipe2.categoria.campeonato",
          "local",
          "local.campeonato",
        ],
        order: {
          dataHora: "DESC",
        },
      });
    });

    it('Deve chamar o método "find" do typeOrm e retornar um array de jogo', async () => {
      typeOrmMock.find.mockResolvedValue([jogo]);

      const resultado = await repositorioJogo.buscarTodos();

      expect(resultado).toEqual([jogo]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao buscar Jogos", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Erro ao buscar jogos no banco de dados."),
      );

      await expect(repositorioJogo.buscarTodos()).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar jogos no banco de dados.",
        ),
      );

      expect(typeOrmMock.find).toHaveBeenCalledWith({
        relations: [
          "fase",
          "fase.categoria",
          "fase.categoria.campeonato",
          "equipe1",
          "equipe1.categoria",
          "equipe1.categoria.campeonato",
          "equipe2",
          "equipe2.categoria",
          "equipe2.categoria.campeonato",
          "local",
          "local.campeonato",
        ],
        order: {
          dataHora: "DESC",
        },
      });
    });
  });

  describe("buscarJogosPorData", () => {
    it("Deve buscar os jogos por data com êxito", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      const resultado = await repositorioJogo.buscarPorData(data);

      expect(resultado).toEqual([jogo]);
    });

    it("createQueryBuilder deve ser chamado com jogo", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("JOG");
    });

    it("leftJoinAndSelect deve ser chamado com fase", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.fase",
        "FAS",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "FAS.categoria",
        "CAT",
      );
    });

    it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "CAT.campeonato",
        "CAM",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe1", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe1",
        "EQ1",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "EQ1.categoria",
        "CAT1",
      );
    });

    it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "CAT1.campeonato",
        "CAM1",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe2", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe2",
        "EQ2",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "EQ2.categoria",
        "CAT2",
      );
    });

    it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "CAT2.campeonato",
        "CAM2",
      );
    });

    it("leftJoinAndSelect deve ser chamado com local", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.local",
        "LOC",
      );
    });

    it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "LOC.campeonato",
        "CAM3",
      );
    });

    it("where deve ser chamado com data", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.where).toHaveBeenCalledWith(
        `TRUNC(JOG.dataHora) = TO_DATE(:data, 'DD-MM-YYYY')`,
        { data },
      );
    });

    it("getMany deve ser chamado uma vez", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorData(data);

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar Grupos pelo id do campeonato", async () => {
      const data = "21-02-2024";
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValueOnce(
          new Error("Erro ao buscar jogos no banco de dados."),
        ),
      });

      const buscarJogosPorData = async () => {
        await repositorioJogo.buscarPorData(data);
      };

      await expect(buscarJogosPorData).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar os jogos no banco de dados.",
        ),
      );
    });
  });

  describe("busca jogos por fase id", () => {
    it("Deve chamar o método find do typeOrm", async () => {
      typeOrmMock.find.mockResolvedValue([jogo]);

      await repositorioJogo.buscarPorFaseId(jogo.fase.id);

      expect(typeOrmMock.find).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar jogos pelo fase id passado", async () => {
      typeOrmMock.find.mockResolvedValue([jogo]);

      const resultado = await repositorioJogo.buscarPorFaseId(jogo.fase.id);

      expect(resultado).toEqual([jogo]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca dos jogos", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Teste de exceção de busca de jogos."),
      );

      const buscarJogosPorFaseId = async () => {
        await repositorioJogo.buscarPorFaseId(jogo.fase.id);
      };

      await expect(buscarJogosPorFaseId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar os jogos pelo id da fase no banco de dados.",
        ),
      );
    });
  });

  describe("buscar jogos por categoria id", () => {
    it("Deve buscar os jogos por categoriaId com êxito", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      const resultado = await repositorioJogo.buscarPorCategoriaId(
        jogo.fase.categoria.id,
      );

      expect(resultado).toEqual([jogo]);
    });

    it("createQueryBuilder deve ser chamado com jogo", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("JOG");
    });

    it("leftJoinAndSelect deve ser chamado com fase", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.fase",
        "FAS",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "FAS.categoria",
        "CAT",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe1", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe1",
        "EQ1",
      );
    });

    it("leftJoinAndSelect deve ser chamado com equipe2", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JOG.equipe2",
        "EQ2",
      );
    });

    it("where deve ser chamado com categoriaId", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.where).toHaveBeenCalledWith("CAT.id = :categoriaId", {
        categoriaId: jogo.fase.categoria.id,
      });
    });

    it("getMany deve ser chamado uma vez", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogo]),
      });

      await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar jogos por categoriaId", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValueOnce(
          new Error(
            "Erro ao buscar jogos pelo id da categoria no banco de dados.",
          ),
        ),
      });

      const buscarJogosPorCategoriaId = async () => {
        await repositorioJogo.buscarPorCategoriaId(jogo.fase.categoria.id);
      };

      await expect(buscarJogosPorCategoriaId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar jogos pelo id da categoria no banco de dados.",
        ),
      );
    });
  });
});
