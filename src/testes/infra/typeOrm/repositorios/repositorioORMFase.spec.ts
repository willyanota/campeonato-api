import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Fase } from "../../../../dominio/entidades/fase.entity";
import { RepositorioORMFase } from "../../../../infra/typeOrm/repositorios/repositorioORMFase";
import { FaseBuilder } from "../../../builders/faseBuilder";

describe("Fase repositório ORM", () => {
  let repositorioFase: RepositorioORMFase;
  let fase;
  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    fase = FaseBuilder.umaFase()
      .comId(1)
      .comNome("nome da fase")
      .comEhGrupo(false)
      .comProrrogacao(false)
      .comPenalti(false)
      .estaDisponivelNoSite(false)
      .comQuantidadeClassificados(2)
      .comCategoria();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMFase,
        {
          provide: getRepositoryToken(Fase),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioFase = modulo.get<RepositorioORMFase>(RepositorioORMFase);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar Fase", () => {
    it('deve chamar o método "save" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(fase);

      await repositorioFase.salvar(fase);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, fase);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar fase", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Teste de exceção ao salvar fase."),
      );

      await expect(repositorioFase.salvar(fase)).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar fase no banco de dados.",
        ),
      );
    });
  });

  describe("buscarFasesPorCategoriaId", () => {
    it('deve chamar o método "find" do typeOrm com êxito', async () => {
      typeOrmMock.find.mockResolvedValue([fase]);

      await repositorioFase.buscarPorCategoriaId(fase.categoria.id);

      expect(typeOrmMock.find).toHaveBeenNthCalledWith(1, {
        where: { categoria: { id: 1 } },
        relations: ["categoria", "categoria.campeonato"],
      });
    });

    it("deve retornar um array de fase", async () => {
      typeOrmMock.find.mockResolvedValue([fase]);

      const resultado = await repositorioFase.buscarPorCategoriaId(
        fase.categoria.id,
      );

      expect(resultado).toEqual([fase]);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar fase pelo id da categoria", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error(
          "Erro ao buscar fases pelo id da categoria no banco de dados.",
        ),
      );

      const buscarFasesPorCategoriaId = async () => {
        await repositorioFase.buscarPorCategoriaId(fase.categoria.id);
      };

      await expect(buscarFasesPorCategoriaId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar fases pelo id da categoria no banco de dados.",
        ),
      );
    });
  });

  describe("buscarFasePorId", () => {
    it('deve chamar o método "findOne" do typeOrm com êxito', async () => {
      typeOrmMock.findOne.mockResolvedValue(fase);

      await repositorioFase.buscarPorId(fase.id);

      expect(typeOrmMock.findOne).toHaveBeenNthCalledWith(1, {
        where: { id: 1 },
        relations: ["categoria", "categoria.campeonato"],
      });
    });

    it("deve retornar uma fase", async () => {
      typeOrmMock.findOne.mockResolvedValue(fase);

      const resultado = await repositorioFase.buscarPorId(fase.id);

      expect(resultado).toEqual(fase);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao buscar fase pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Erro ao buscar a fase no banco de dados."),
      );

      const buscarFasePorId = async () => {
        await repositorioFase.buscarPorId(fase.id);
      };

      await expect(buscarFasePorId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar a fase no banco de dados.",
        ),
      );
    });
  });
});
