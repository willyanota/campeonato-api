import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Grupo } from "../../../../dominio/entidades/grupo.entity";
import { RepositorioORMGrupo } from "../../../../infra/typeOrm/repositorios/repositorioORMGrupo";
import { GrupoBuilder } from "../../../builders/grupoBuilder";

describe("Grupo repositório ORM", () => {
  let repositorioGrupo: RepositorioORMGrupo;
  let grupo;
  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(),
    leftJoinAndSelect: jest.fn(),
    where: jest.fn(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    grupo = GrupoBuilder.umGrupo()
      .comId(1)
      .comNome("nome do grupo")
      .comObservacao("observação")
      .comFase();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMGrupo,
        {
          provide: getRepositoryToken(Grupo),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioGrupo = modulo.get<RepositorioORMGrupo>(RepositorioORMGrupo);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar Grupo", () => {
    it('deve chamar o método "save" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(grupo);

      await repositorioGrupo.salvar(grupo);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, grupo);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar grupo", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção ao salvar grupo"),
      );

      const criarGrupo = async () => {
        await repositorioGrupo.salvar(grupo);
      };

      await expect(criarGrupo).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar grupo no banco de dados.",
        ),
      );
    });
  });

  describe("buscarGruposPorCampeonatoId", () => {
    it("Deve buscar os grupos por campeonatoId com êxito", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      const resultado = await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
      );

      expect(resultado).toEqual([grupo]);
    });

    it("createQueryBuilder deve ser chamado com grupo", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.createQueryBuilder).toHaveBeenCalledWith("GRU");
    });

    it("leftJoinAndSelect deve ser chamado com fase", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.leftJoinAndSelect).toHaveBeenCalledWith(
        "GRU.fase",
        "FAS",
      );
    });

    it("leftJoinAndSelect deve ser chamado com categoria", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
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
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
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
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.where).toHaveBeenCalledWith("CAM.id = :campeonatoId", {
        campeonatoId: grupo.fase.categoria.campeonato.id,
      });
    });

    it("getMany deve ser chamado uma vez", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockResolvedValue([grupo]),
      });

      await repositorioGrupo.buscarPorCampeonatoId(
        grupo.fase.categoria.campeonato.id,
      );

      expect(typeOrmMock.getMany).toHaveBeenCalledTimes(1);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar Grupos pelo id do campeonato", async () => {
      jest.spyOn(typeOrmMock, "createQueryBuilder").mockReturnValueOnce({
        leftJoinAndSelect: typeOrmMock.leftJoinAndSelect.mockReturnThis(),
        where: typeOrmMock.where.mockReturnThis(),
        getMany: typeOrmMock.getMany.mockRejectedValueOnce(
          new Error(
            "Erro ao buscar grupos pelo id do campeonato no banco de dados.",
          ),
        ),
      });

      const buscarGruposPorCampeonatoId = async () => {
        await repositorioGrupo.buscarPorCampeonatoId(
          grupo.fase.categoria.campeonato.id,
        );
      };

      await expect(buscarGruposPorCampeonatoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar grupos pelo id do campeonato no banco de dados.",
        ),
      );
    });
  });

  describe("Buscar todos grupos", () => {
    it('Deve chamar o método "find" do typeOrm apenas uma vez e retornar um array Grupo', async () => {
      typeOrmMock.find.mockResolvedValue([grupo]);

      await repositorioGrupo.buscarTodos();

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        relations: ["fase", "fase.categoria", "fase.categoria.campeonato"],
      });
    });

    it('Deve chamar o método "find" do typeOrm e retornar um array Grupo', async () => {
      typeOrmMock.find.mockResolvedValue([grupo]);

      const resultado = await repositorioGrupo.buscarTodos();

      expect(resultado).toEqual([grupo]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro ao buscar Grupos", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Erro ao buscar grupos no banco de dados."),
      );

      await expect(repositorioGrupo.buscarTodos()).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar grupos no banco de dados.",
        ),
      );

      expect(typeOrmMock.find).toHaveBeenCalledWith({
        relations: ["fase", "fase.categoria", "fase.categoria.campeonato"],
      });
    });
  });
});
