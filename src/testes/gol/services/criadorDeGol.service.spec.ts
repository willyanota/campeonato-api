import { BadRequestException } from "@nestjs/common";
import { CriarGolDTO } from "src/dominio/gol/dtos/criadorDeGol.dto";
import { RepositorioGol } from "src/dominio/gol/repositorioGol";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { CriadorDeGolService } from "../../../dominio/gol/services/criadorDeGol.service";
import { JogadorBuilder } from "../../builders/jogadorBuilder";
import { JogoBuilder } from "../../builders/jogoBuilder";

describe("criar gol", () => {
  let repositorioGol: RepositorioGol;
  let repositorioJogo: RepositorioJogo;
  let repositorioJogador: RepositorioJogador;
  let criadorDeGolService: CriadorDeGolService;
  let golDto: CriarGolDTO;
  let jogo;
  let jogador;

  beforeEach(async () => {
    golDto = {
      jogoId: 1,
      jogadorId: 1,
      minuto: 35,
      periodo: "Primeiro Tempo Prorrogação",
      golContra: false,
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
    repositorioGol = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    repositorioJogo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorData: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorFaseId: jest.fn(),
    };
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    criadorDeGolService = new CriadorDeGolService(
      repositorioGol,
      repositorioJogo,
      repositorioJogador,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(jogador.criar()),
    );

    await criadorDeGolService.criar(golDto);

    expect(repositorioGol.salvar).toHaveBeenCalledWith({
      ...golDto,
      jogo,
      jogador,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver um jogo existente", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(undefined));
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(jogador.criar()),
    );

    const criarGol = async () => {
      await criadorDeGolService.criar(golDto);
    };

    await expect(criarGol).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um gol com um jogo inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando não houver um jogador existente", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));
    repositorioJogador.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const criarGol = async () => {
      await criadorDeGolService.criar(golDto);
    };

    await expect(criarGol).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um gol com um jogador inexistente.",
      ),
    );
  });
});
