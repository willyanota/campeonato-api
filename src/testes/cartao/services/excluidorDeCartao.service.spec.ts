import { RepositorioCartao } from "../../../dominio/cartao/repositorioCartao";
import { ExcluidorDeCartaoService } from "../../../dominio/cartao/services/excluidorDeCartao.service";
import { RepositorioJogador } from "../../../dominio/jogador/repositorioJogador";
import { SuspensorDeJogadorService } from "../../../dominio/jogador/services/suspensorDeJogador.service";
import { RepositorioJogo } from "../../../dominio/jogo/repositorioJogo";
import { CartaoBuilder } from "../../builders/cartaoBuilder";

describe("excluir cartao", () => {
  let repositorioCartao: RepositorioCartao;
  let repositorioJogo: RepositorioJogo;
  let repositorioJogador: RepositorioJogador;
  let suspensorDeJogador: SuspensorDeJogadorService;
  let excluidorDeCartao: ExcluidorDeCartaoService;
  let cartao;

  beforeEach(async () => {
    cartao = CartaoBuilder.umCartao()
      .comId(1)
      .comTipo("Amarelo")
      .comMinuto(35)
      .comPeriodo("Primeiro Tempo Regular")
      .comJogo()
      .comJogador();
    repositorioCartao = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      contarNumeroDeCartoesDoJogadorNoJogo: jest.fn(),
    };
    repositorioJogo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorFaseId: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorData: jest.fn(),
    };
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
    };
    suspensorDeJogador = new SuspensorDeJogadorService(
      repositorioJogador,
      repositorioJogo,
      repositorioCartao,
    );
    excluidorDeCartao = new ExcluidorDeCartaoService(
      repositorioCartao,
      suspensorDeJogador,
    );
  });

  it('deve chamar o método "excluirCartao" com êxito', async () => {
    repositorioCartao.buscarPorId = jest.fn(() =>
      Promise.resolve(cartao.criar()),
    );
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(cartao.comJogador().criar()),
    );

    await excluidorDeCartao.excluir(cartao.id);
    await suspensorDeJogador.decrementarContadorDeCartoes(cartao);
    await suspensorDeJogador.removerSuspensaoExclusaoDeCartao(
      cartao.jogo.id,
      cartao.jogador.id,
    );

    expect(repositorioCartao.excluir).toHaveBeenCalledWith(cartao.id);
  });
});
