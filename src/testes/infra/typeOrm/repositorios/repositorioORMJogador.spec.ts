import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Jogador } from "../../../../dominio/entidades/jogador.entity";
import { RepositorioORMJogador } from "../../../../infra/typeOrm/repositorios/repositorioORMJogador";
import { JogadorBuilder } from "../../../builders/jogadorBuilder";

describe("Jogador repositório ORM", () => {
  let repositorioJogador: RepositorioORMJogador;
  let jogador;

  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    jogador = JogadorBuilder.umJogador()
      .comId(1)
      .comFoto("fotourl")
      .comNome("nomejogador")
      .comIdade(20)
      .comCpf("99977788855")
      .comEhGoleiro(false)
      .estaAtivo(true)
      .estaSuspenso(false)
      .comContadorDeRodadasSuspenso(0)
      .comContadorDeCartoesAmarelos(0)
      .comContadorDeCartoesVermelhos(0)
      .comEquipe();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMJogador,
        {
          provide: getRepositoryToken(Jogador),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioJogador = modulo.get<RepositorioORMJogador>(
      RepositorioORMJogador,
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar jogador", () => {
    it('deve chamar o método "save" do typeorm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(jogador);

      await repositorioJogador.salvar(jogador);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, jogador);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar jogador", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Erro ao salvar jogador no banco de dados."),
      );

      const criarJogador = async () => {
        await repositorioJogador.salvar(jogador);
      };

      await expect(criarJogador).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar jogador no banco de dados.",
        ),
      );
    });
  });

  describe("buscar jogadores por equipe id", () => {
    it('deve chamar o método "find" do typeorm apenas uma vez', async () => {
      typeOrmMock.find.mockResolvedValue([jogador]);

      await repositorioJogador.buscarPorEquipeId(jogador.equipe.id);

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        where: { equipe: { id: 1 } },
        relations: [
          "equipe",
          "equipe.categoria",
          "equipe.categoria.campeonato",
        ],
      });
    });

    it('Deve chamar o método "find" do typeOrm e retornar um array de jogador', async () => {
      typeOrmMock.find.mockResolvedValue([jogador]);

      const resultado = await repositorioJogador.buscarPorEquipeId(
        jogador.equipe.id,
      );

      expect(resultado).toEqual([jogador]);
    });

    it("deve lançar uma exceção quando ocorrer erro ao buscar jogadores", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Erro ao buscar jogadores no banco de dados."),
      );

      await expect(
        repositorioJogador.buscarPorEquipeId(jogador.equipe.id),
      ).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar jogadores pelo id da equipe no banco de dados.",
        ),
      );
    });
  });

  describe("buscarJogadorPorId", () => {
    it('deve chamar o método "findOne" do typeorm com êxito', async () => {
      typeOrmMock.findOne.mockResolvedValue(jogador);

      await repositorioJogador.buscarPorId(jogador.id);

      expect(typeOrmMock.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 1 },
        relations: [
          "equipe",
          "equipe.categoria",
          "equipe.categoria.campeonato",
        ],
      });
    });

    it("deve retornar um jogador", async () => {
      typeOrmMock.findOne.mockResolvedValue(jogador);

      const resultado = await repositorioJogador.buscarPorId(jogador.id);

      expect(resultado).toEqual(jogador);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar jogador pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Erro ao buscar o jogador no banco de dados."),
      );

      const buscarJogadorPorId = async () => {
        await repositorioJogador.buscarPorId(jogador.id);
      };

      await expect(buscarJogadorPorId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar o jogador no banco de dados.",
        ),
      );
    });
  });

  describe("contar número de jogadores ativos", () => {
    it('deve chamar o método "count" do typeorm apenas uma vez', async () => {
      typeOrmMock.count.mockResolvedValue([jogador]);

      await repositorioJogador.contarAtivosDaEquipe(jogador.equipe.id);

      expect(typeOrmMock.count).toHaveBeenNthCalledWith(1, {
        where: { equipe: { id: jogador.equipe.id }, ativo: true },
      });
    });

    it('Deve chamar o método "count" e retornar o número de jogadores ativos', async () => {
      typeOrmMock.count.mockResolvedValue([jogador]);

      const resultado = await repositorioJogador.contarAtivosDaEquipe(
        jogador.equipe.id,
      );

      expect(resultado).toEqual([jogador]);
    });

    it("deve lançar uma exceção quando ocorrer erro ao buscar jogadores", async () => {
      typeOrmMock.count.mockRejectedValue(
        new Error("Erro na contagem de jogadores ativos no banco de dados."),
      );

      await expect(
        repositorioJogador.contarAtivosDaEquipe(jogador.equipe.id),
      ).rejects.toThrow(
        new InternalServerErrorException(
          "Erro na contagem de jogadores ativos no banco de dados.",
        ),
      );
    });
  });

  describe("buscarJogadoresPorCategoriaId", () => {
    it("Deve buscar os jogadores por categoriaId com êxito", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      const resultado = await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(resultado).toEqual([jogador]);
    });

    it("createQueryBuilder deve ser chamado com jogador", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("JGD");
    });

    it("leftJoinAndSelect deve ser chamado com equipe", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "JGD.equipe",
        "EQU",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "EQU.categoria",
        "CAT",
      );
    });

    it("where deve ser chamado com categoriaId", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(typeOrmMock.where).toHaveBeenCalledWith("CAT.id = :categoriaId", {
        categoriaId: jogador.equipe.categoria.id,
      });
    });

    it("getMany deve ser chamado uma vez", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([jogador]),
      });

      await repositorioJogador.buscarPorCategoriaId(
        jogador.equipe.categoria.id,
      );

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar jogadores pelo id da categoria", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValueOnce(
          new Error(
            "Erro ao buscar jogadores pelo id da categoria no banco de dados.",
          ),
        ),
      });

      const buscarGruposPorCampeonatoId = async () => {
        await repositorioJogador.buscarPorCategoriaId(
          jogador.equipe.categoria.id,
        );
      };

      await expect(buscarGruposPorCampeonatoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar jogadores pelo id da categoria no banco de dados.",
        ),
      );
    });
  });
});
