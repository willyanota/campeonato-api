import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Gol } from "../../../../dominio/entidades/gol.entity";
import { RepositorioORMGol } from "../../../../infra/typeOrm/repositorios/repositorioORMGol";
import { GolBuilder } from "../../../builders/golBuilder";

describe("gol repositorio ORM", () => {
  let repositorioGol: RepositorioORMGol;
  let gol;
  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    gol = GolBuilder.umGol()
      .comId(1)
      .comMinuto(42)
      .comPeriodo("Primeiro Tempo Regular")
      .ehGolContra(false)
      .comJogo()
      .comJogador();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMGol,
        {
          provide: getRepositoryToken(Gol),
          useValue: typeOrmMock,
        },
        {
          provide: DataSource,
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioGol = modulo.get<RepositorioORMGol>(RepositorioORMGol);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar gol", () => {
    it('deve chamar o método "save" do typeorm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(gol);

      await repositorioGol.salvar(gol);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, gol);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar gol", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Erro ao salvar gol no banco de dados."),
      );

      const criarGol = async () => {
        await repositorioGol.salvar(gol);
      };

      await expect(criarGol).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar gol no banco de dados.",
        ),
      );
    });
  });

  describe("busca gols por jogo id", () => {
    it("deve chamar o método find do typeOrm", async () => {
      typeOrmMock.find.mockResolvedValue([gol]);

      await repositorioGol.buscarPorJogoId(gol.jogo.id);

      expect(typeOrmMock.find).toHaveBeenCalledTimes(1);
    });

    it("deve encontrar gol pelo jogo id", async () => {
      typeOrmMock.find.mockResolvedValue([gol]);

      const resultado: Gol[] = await repositorioGol.buscarPorJogoId(
        gol.jogo.id,
      );

      expect(resultado).toEqual([gol]);
    });

    it("deve lançar uma exceção quando ocorrer erro na busca dos gols", async () => {
      typeOrmMock.find.mockRejectedValue(new Error("Erro ao buscar gols."));

      const buscarGolsPorJogoId = async () => {
        await repositorioGol.buscarPorJogoId(gol.jogo.id);
      };

      await expect(buscarGolsPorJogoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar gols no banco de dados.",
        ),
      );
    });
  });

  describe("buscarGolPorId", () => {
    it('deve chamar o método "findOne" do typeOrm com êxito', async () => {
      typeOrmMock.findOne.mockResolvedValue(gol);

      await repositorioGol.buscarPorId(gol.id);

      expect(typeOrmMock.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 1 },
        relations: ["jogo", "jogador", "jogador.equipe"],
      });
    });

    it("deve retornar um gol", async () => {
      typeOrmMock.findOne.mockResolvedValue(gol);

      const resultado = await repositorioGol.buscarPorId(gol.id);

      expect(resultado).toEqual(gol);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar gol pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Erro ao buscar gol no banco de dados."),
      );

      const buscarGolPorId = async () => {
        await repositorioGol.buscarPorId(gol.id);
      };

      await expect(buscarGolPorId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar o gol no banco de dados.",
        ),
      );
    });
  });

  describe("excluirGol", () => {
    it('deve chamar o método "delete" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockResolvedValue(gol);

      await repositorioGol.excluir(gol.id);

      expect(typeOrmMock.delete).toHaveBeenNthCalledWith(1, gol.id);
    });

    it("deve lançar uma exceção quando ocorrer um erro na exclusão do gol", async () => {
      typeOrmMock.delete.mockRejectedValue(
        new Error("Teste de exceção de excluir gol"),
      );

      await expect(repositorioGol.excluir(gol.id)).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao excluir gol no banco de dados.",
        ),
      );
    });
  });
});
