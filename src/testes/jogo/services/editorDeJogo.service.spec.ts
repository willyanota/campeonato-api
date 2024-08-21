import { BadRequestException } from "@nestjs/common";
import { RepositorioCartao } from "src/dominio/cartao/repositorioCartao";
import { RepositorioEquipe } from "src/dominio/equipe/repositorioEquipe";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { PontuadorDeEquipesService } from "../../../dominio/equipe/services/pontuadorDeEquipes.service";
import { SuspensorDeJogadorService } from "../../../dominio/jogador/services/suspensorDeJogador.service";
import { EditorDeJogoService } from "../../../dominio/jogo/services/editorDeJogo.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { FaseBuilder } from "../../builders/faseBuilder";
import { JogoBuilder } from "../../builders/jogoBuilder";

describe("editar jogo", () => {
  let repositorioJogo: RepositorioJogo;
  let repositorioLocal: RepositorioLocal;
  let repositorioCartao: RepositorioCartao;
  let repositorioJogador: RepositorioJogador;
  let repositorioEquipe: RepositorioEquipe;
  let editorJogoService: EditorDeJogoService;
  let suspensorDeJogador: SuspensorDeJogadorService;
  let pontuadorDeEquipes: PontuadorDeEquipesService;
  let jogo;

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
    repositorioJogo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorData: jest.fn(),
      buscarPorFaseId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    repositorioLocal = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    repositorioCartao = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      contarNumeroDeCartoesDoJogadorNoJogo: jest.fn(),
    };
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    repositorioEquipe = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      excluir: jest.fn(),
      buscarDosCampeonatosAtivos: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorGrupoId: jest.fn(),
      buscarDoGrupo: jest.fn(),
    };
    suspensorDeJogador = new SuspensorDeJogadorService(
      repositorioJogador,
      repositorioJogo,
      repositorioCartao,
    );
    pontuadorDeEquipes = new PontuadorDeEquipesService(
      repositorioEquipe,
      repositorioJogo,
    );
    editorJogoService = new EditorDeJogoService(
      repositorioJogo,
      repositorioLocal,
      suspensorDeJogador,
      pontuadorDeEquipes,
    );
  });

  it('deve chamar o método "editarJogo" com êxito', async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));

    await editorJogoService.editar(jogo.criar());

    expect(repositorioJogo.salvar).toHaveBeenCalledWith({
      ...jogo,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar um jogo", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarJogo = async () => {
      await editorJogoService.editar(jogo.criar());
    };

    await expect(editarJogo).rejects.toThrow(
      new BadRequestException("Jogo não encontrado."),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    const categoria = CategoriaBuilder.umaCategoria()
      .comCampeonato(campeonato)
      .criar();
    const fase = FaseBuilder.umaFase().comCategoria(categoria).criar();
    repositorioJogo.buscarPorId = jest.fn(() =>
      Promise.resolve(jogo.comFase(fase).criar()),
    );

    const editarJogo = async () => {
      await editorJogoService.editar(jogo.criar());
    };

    await expect(editarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar um jogo com uma fase de um campeonato inativo.",
      ),
    );
  });

  it('deve chamar o método "cadastrarResultado" com êxito', async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(jogo.criar()));

    await editorJogoService.cadastrarResultado(jogo.criar());
    await pontuadorDeEquipes.pontuar(jogo.equipe1.id, jogo.equipe2.id, jogo.id);
    await suspensorDeJogador.removerSuspensaoParaEquipes(jogo.criar());

    expect(repositorioJogo.salvar).toHaveBeenCalledWith(jogo.criar());
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar um jogo", async () => {
    repositorioJogo.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const cadastrarResultado = async () => {
      await editorJogoService.cadastrarResultado(jogo.criar());
    };

    await expect(cadastrarResultado).rejects.toThrow(
      new BadRequestException("Jogo não encontrado."),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    const categoria = CategoriaBuilder.umaCategoria()
      .comCampeonato(campeonato)
      .criar();
    const fase = FaseBuilder.umaFase().comCategoria(categoria).criar();
    repositorioJogo.buscarPorId = jest.fn(() =>
      Promise.resolve(jogo.comFase(fase).criar()),
    );

    const cadastrarResultado = async () => {
      await editorJogoService.cadastrarResultado(jogo.criar());
    };

    await expect(cadastrarResultado).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar um jogo com uma fase de um campeonato inativo.",
      ),
    );
  });
});
