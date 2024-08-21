import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Cartao } from "../../../../dominio/entidades/cartao.entity";
import { RepositorioORMCartao } from "../../../../infra/typeOrm/repositorios/repositorioORMCartao";
import { CartaoBuilder } from "../../../builders/cartaoBuilder";

describe("cartao repositorio ORM", () => {
  let repositorioCartao: RepositorioORMCartao;
  let cartao;
  const typeOrmMock = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    cartao = CartaoBuilder.umCartao()
      .comId(1)
      .comTipo("Amarelo")
      .comMinuto(35)
      .comPeriodo("Primeiro Tempo Regular")
      .comSumula("observação")
      .comJogo()
      .comJogador();
    const modulo: TestingModule = await Test.createTestingModule({
      providers: [
        RepositorioORMCartao,
        {
          provide: getRepositoryToken(Cartao),
          useValue: typeOrmMock,
        },
      ],
    }).compile();

    repositorioCartao = modulo.get<RepositorioORMCartao>(RepositorioORMCartao);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("salvar cartao", () => {
    it('deve chamar o método "save" do typeorm com êxito', async () => {
      typeOrmMock.save.mockReturnValue(cartao);

      await repositorioCartao.salvar(cartao);

      expect(typeOrmMock.save).toHaveBeenNthCalledWith(1, cartao);
    });

    it("deve lançar uma exceção quando ocorrer um erro ao salvar cartão", async () => {
      typeOrmMock.save.mockRejectedValue(
        new Error("Erro ao salvar cartão no banco de dados."),
      );

      const criarCartao = async () => {
        await repositorioCartao.salvar(cartao);
      };

      await expect(criarCartao).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao salvar cartão no banco de dados.",
        ),
      );
    });
  });

  describe("busca cartões pelo jogo id", () => {
    it("Deve chamar o método find do typeOrm", async () => {
      typeOrmMock.find.mockResolvedValue([cartao]);

      await repositorioCartao.buscarPorJogoId(cartao.jogo.id);

      expect(typeOrmMock.find).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar um cartão pelo jogo id passado", async () => {
      typeOrmMock.find.mockResolvedValue([cartao]);

      const resultado = await repositorioCartao.buscarPorJogoId(cartao.jogo.id);

      expect(resultado).toEqual([cartao]);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca dos cartões", async () => {
      typeOrmMock.find.mockRejectedValue(
        new Error("Teste de exceção de busca."),
      );

      const buscarCartoesPorJogoId = async () => {
        await repositorioCartao.buscarPorJogoId(cartao.jogo.id);
      };

      await expect(buscarCartoesPorJogoId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar cartões no banco de dados.",
        ),
      );
    });
  });

  describe("busca um cartão pelo id", () => {
    it("Deve chamar o método uma vez", async () => {
      typeOrmMock.findOne.mockResolvedValue(cartao);

      await repositorioCartao.buscarPorId(cartao.id);

      expect(typeOrmMock.findOne).toHaveBeenCalledTimes(1);
    });

    it("Deve encontrar um cartão pelo id passado", async () => {
      typeOrmMock.findOne.mockResolvedValue(cartao);

      const resultado = await repositorioCartao.buscarPorId(cartao.id);

      expect(resultado).toEqual(cartao);
    });

    it("Deve lançar uma exceção quando ocorrer um erro na busca do cartão pelo id", async () => {
      typeOrmMock.findOne.mockRejectedValue(
        new Error("Teste de exceção de busca."),
      );

      const buscarCartaoPorId = async () => {
        await repositorioCartao.buscarPorId(cartao.id);
      };

      await expect(buscarCartaoPorId).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao buscar cartão no banco de dados.",
        ),
      );
    });
  });

  describe("excluir cartão", () => {
    it('deve chamar o método "delete" do typeOrm com êxito', async () => {
      typeOrmMock.save.mockResolvedValue(cartao);

      await repositorioCartao.excluir(cartao.id);

      expect(typeOrmMock.delete).toHaveBeenNthCalledWith(1, cartao.id);
    });

    it("deve lançar uma exceção quando ocorrer um erro na exclusão do cartão", async () => {
      typeOrmMock.delete.mockRejectedValue(
        new Error("Teste de exceção de exclusão."),
      );

      await expect(repositorioCartao.excluir(cartao.id)).rejects.toThrow(
        new InternalServerErrorException(
          "Erro ao excluir cartão no banco de dados.",
        ),
      );
    });
  });

  describe("contar número de cartões no jogo", () => {
    it('deve chamar o método "count" do typeorm apenas uma vez', async () => {
      typeOrmMock.count.mockResolvedValue([cartao]);

      await repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
        cartao.jogo.id,
        cartao.jogador.id,
        cartao.tipo,
      );

      expect(typeOrmMock.count).toHaveBeenNthCalledWith(1, {
        where: {
          jogo: { id: cartao.jogo.id },
          jogador: { id: cartao.jogador.id },
          tipo: cartao.tipo,
        },
      });
    });

    it('Deve chamar o método "count" e retornar o número de cartões', async () => {
      typeOrmMock.count.mockResolvedValue([cartao]);

      const resultado =
        await repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
          cartao.jogo.id,
          cartao.jogador.id,
          cartao.tipo,
        );

      expect(resultado).toEqual([cartao]);
    });

    it("deve lançar uma exceção quando ocorrer erro ao buscar jogadores", async () => {
      typeOrmMock.count.mockRejectedValue(
        new Error("Erro na contagem de cartões no banco de dados."),
      );

      await expect(
        repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
          cartao.jogo.id,
          cartao.jogador.id,
          cartao.tipo,
        ),
      ).rejects.toThrow(
        new InternalServerErrorException(
          "Erro na contagem de cartões no jogo no banco de dados.",
        ),
      );
    });
  });
});
