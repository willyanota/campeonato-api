import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Equipe } from "../../../../dominio/entidades/equipe.entity";
import { RepositorioORMEquipe } from "../../../../infra/typeOrm/repositorios/repositorioORMEquipe";
import { EquipeBuilder } from "../../../builders/equipeBuilder";

describe("Equipe repositorio ORM", () => {
  let repositorioEquipe: RepositorioORMEquipe;
  let equipe;
  const typeOrmMock = {
    save: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn(),
    getMany: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    query: jest.fn(),
  };

  beforeEach(async () => {
    equipe = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
      .comPontos(0)
      .comCategoria();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMEquipe,
        {
          provide: getRepositoryToken(Equipe),
          useValue: typeOrmMock,
        },
        {
          provide: DataSource,
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioEquipe = modulo.get<RepositorioORMEquipe>(RepositorioORMEquipe);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar Equipe", () => {
    it('deve chamar o método "save" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(equipe);

      await repositorioEquipe.salvar(equipe);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, equipe);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar equipe", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção ao salvar equipe."),
      );

      const criarEquipe = async () => {
        await repositorioEquipe.salvar(equipe);
      };

      await expect(criarEquipe).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar equipe no banco de dados.",
        ),
      );
    });

    describe("buscarEquipePorId", () => {
      it('deve chamar o método "findOne" do typeOrm com êxito', async () => {
        typeOrmMock.findOne.mockResolvedValue(equipe);

        await repositorioEquipe.buscarPorId(equipe.id);

        expect(typeOrmMock.findOne).toHaveBeenNthCalledWith(1, {
          where: { id: 1 },
          relations: ["categoria", "categoria.campeonato"],
        });
      });

      it("deve retornar uma equipe", async () => {
        typeOrmMock.findOne.mockResolvedValue(equipe);

        const resultado = await repositorioEquipe.buscarPorId(equipe.id);

        expect(resultado).toEqual(equipe);
      });

      it("deve lançar uma exceção quando ocorrer um erro ao buscar equipe pelo id", async () => {
        typeOrmMock.findOne.mockRejectedValue(
          new Error("Erro ao buscar equipe no banco de dados."),
        );

        const buscarEquipePorId = async () => {
          await repositorioEquipe.buscarPorId(equipe.id);
        };

        await expect(buscarEquipePorId).rejects.toThrow(
          new InternalServerErrorException(
            "Erro ao buscar a equipe no banco de dados.",
          ),
        );
      });
    });

    describe("excluirEquipe", () => {
      it('deve chamar o método "delete" do typeOrm com êxito', async () => {
        typeOrmMock.save.mockResolvedValue(equipe);

        await repositorioEquipe.excluir(equipe.id);

        expect(typeOrmMock.delete).toHaveBeenNthCalledWith(1, equipe.id);
      });

      it("deve lançar uma exceção quando ocorrer um erro na exclusão da equipe", async () => {
        typeOrmMock.delete.mockRejectedValue(
          new Error("Teste de exceção de excluir equipe"),
        );

        await expect(repositorioEquipe.excluir(equipe.id)).rejects.toThrow(
          new InternalServerErrorException(
            "Erro ao excluir equipe no banco de dados.",
          ),
        );
      });
    });

    describe("busca equipes dos campeonatos ativos", () => {
      it("createQueryBuilder deve ser chamado com a categoria", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValueOnce([equipe]),
        });

        await repositorioEquipe.buscarDosCampeonatosAtivos();

        expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("EQU");
      });

      it("leftJoinAndSelect deve ser chamado com o campeonato", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValueOnce([equipe]),
        });

        await repositorioEquipe.buscarDosCampeonatosAtivos();

        expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
          "EQU.categoria",
          "CAT",
        );
      });

      it("where deve ser chamado com ativo = true", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValueOnce([equipe]),
        });

        await repositorioEquipe.buscarDosCampeonatosAtivos();

        expect(typeOrmMock.where).toHaveBeenCalledWith("CAM.ativo = :ativo", {
          ativo: true,
        });
      });

      it("getMany deve ser chamado uma vez", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValueOnce([equipe]),
        });

        await repositorioEquipe.buscarDosCampeonatosAtivos();

        expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
      });

      it("Deve lançar uma exceção quando ocorrer um erro na busca das equipes dos campeonatos ativos", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockRejectedValueOnce(
            new Error("Erro ao buscar as equipes no banco de dados."),
          ),
        });

        const buscarEquipesDosCampeonatosAtivos = async () => {
          await repositorioEquipe.buscarDosCampeonatosAtivos();
        };

        await expect(buscarEquipesDosCampeonatosAtivos).rejects.toThrow(
          new InternalServerErrorException(
            "Erro ao buscar as equipes no banco de dados.",
          ),
        );
      });
    });

    describe("buscarEquipesPorCategoriaId", () => {
      it('deve chamar o método "find" do typeOrm com êxito', async () => {
        typeOrmMock.find.mockResolvedValue([equipe]);

        await repositorioEquipe.buscarPorCategoriaId(equipe.categoria.id);

        expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
          where: { categoria: { id: 1 } },
          relations: ["categoria", "categoria.campeonato"],
        });
      });

      it("deve retornar um array de equipes", async () => {
        typeOrmMock.find.mockResolvedValue([equipe]);

        const resultado = await repositorioEquipe.buscarPorCategoriaId(
          equipe.categoria.id,
        );

        expect(resultado).toEqual([equipe]);
      });

      it("deve lançar uma exceção quando ocorrer um erro ao buscar equipes pelo id da categoria", async () => {
        typeOrmMock.find.mockRejectedValue(
          new Error("Erro ao buscar as equipes no banco de dados."),
        );

        const buscarEquipesPorCategoriaId = async () => {
          await repositorioEquipe.buscarPorCategoriaId(equipe.categoria.id);
        };

        await expect(buscarEquipesPorCategoriaId).rejects.toThrow(
          new InternalServerErrorException(
            "Erro ao buscar as equipes pelo id da categoria no banco de dados.",
          ),
        );
      });
    });

    describe("buscarEquipesPorCampeonatoId", () => {
      it("Deve buscar as equipes por campeonatoId com êxito", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        const resultado = await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(resultado).toEqual([equipe]);
      });

      it("createQueryBuilder deve ser chamado com equipe", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("EQU");
      });

      it("leftJoinAndSelect deve ser chamado com categoria", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
          "EQU.categoria",
          "CAT",
        );
      });

      it("leftJoinAndSelect deve ser chamado com campeonato", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
          "CAT.campeonato",
          "CAM",
        );
      });

      it("where deve ser chamado com campeonatoId", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(typeOrmMock.where).toHaveBeenCalledWith(
          "CAM.id = :campeonatoId",
          {
            campeonatoId: equipe.categoria.campeonato.id,
          },
        );
      });

      it("getMany deve ser chamado uma vez", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockResolvedValue([equipe]),
        });

        await repositorioEquipe.buscarPorCampeonatoId(
          equipe.categoria.campeonato.id,
        );

        expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
      });

      it("deve lançar uma exceção quando ocorrer um erro ao buscar equipes pelo id do campeonato", async () => {
        jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
          leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
          where: typeOrmMock.where.mockReturnThis(),
          getMany: typeOrmMock.getMany.mockRejectedValueOnce(
            new Error(
              "Erro ao buscar equipes pelo id do campeonato no banco de dados.",
            ),
          ),
        });

        const buscarEquipesPorCampeonatoId = async () => {
          await repositorioEquipe.buscarPorCampeonatoId(
            equipe.categoria.campeonato.id,
          );
        };

        await expect(buscarEquipesPorCampeonatoId).rejects.toThrow(
          new InternalServerErrorException(
            "Erro ao buscar equipes pelo id do campeonato no banco de dados.",
          ),
        );
      });
    });
  });
});
