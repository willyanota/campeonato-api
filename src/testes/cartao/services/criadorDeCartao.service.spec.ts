import { BadRequestException } from "@nestjs/common";
import { CriarCartaoDTO } from "src/dominio/cartao/dtos/criadorDeCartao.dto";
import { RepositorioCartao } from "src/dominio/cartao/repositorioCartao";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { CriadorDeCartaoService } from "../../../dominio/cartao/services/criadorDeCartao.service";
import { SuspensorDeJogadorService } from "../../../dominio/jogador/services/suspensorDeJogador.service";
import { JogadorBuilder } from "../../builders/jogadorBuilder";
import { JogoBuilder } from "../../builders/jogoBuilder";

describe("criar cartao", () => {
  let repositorioCartao: RepositorioCartao;
  let repositorioJogo: RepositorioJogo;
  let repositorioJogador: RepositorioJogador;
  let criadorDeCartaoService: CriadorDeCartaoService;
  let suspensorDeJogador: SuspensorDeJogadorService;
  let cartaoDto: CriarCartaoDTO;
  let jogo;
  let jogador;

  beforeEach(async () => {
    cartaoDto = {
      jogoId: 1,
      jogadorId: 1,
      tipo: "Amarelo",
      minuto: 35,
      periodo: "Primeiro Tempo Prorrogação",
      sumula: "observação sumula",
    };
    jogo = JogoBuilder.umJogo()
      .comId(1)
      .comNumeroDoJogo(1)
      .comNumeroDaRodada(1)
      .comDataHora(new Date())
      .comFase()
      .comEquipe1()
      .comEquipe2()
      .comLocal();
    jogador = JogadorBuilder.umJogador()
      .comId(1)
      .comFoto("fotourl")
      .comNome("nomejogador")
      .comIdade(20)
      .comCpf("99977788855")
      .comEhGoleiro(false)
      .estaAtivo(true)
      .comEquipe();
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
    criadorDeCartaoService = new CriadorDeCartaoService(
      repositorioCartao,
      repositorioJogo,
      repositorioJogador,
      suspensorDeJogador,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(jogador.criar()),
    );

    await criadorDeCartaoService.criar(cartaoDto);
    await suspensorDeJogador.incrementarContadorDeCartoes(
      cartaoDto.jogadorId,
      cartaoDto.tipo,
    );
    await suspensorDeJogador.suspenderJogador(
      cartaoDto.jogoId,
      cartaoDto.jogadorId,
    );

    expect(repositorioCartao.salvar).toHaveBeenCalledWith({
      ...cartaoDto,
      jogo,
      jogador,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver um jogo existente", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(undefined));
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(jogador.criar()),
    );

    const criarCartao = async () => {
      await criadorDeCartaoService.criar(cartaoDto);
    };

    await expect(criarCartao).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um cartão com um jogo inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando não houver um jogador existente", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));
    repositorioJogador.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const criarCartao = async () => {
      await criadorDeCartaoService.criar(cartaoDto);
    };

    await expect(criarCartao).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um cartão com um jogador inexistente.",
      ),
    );
  });
});
