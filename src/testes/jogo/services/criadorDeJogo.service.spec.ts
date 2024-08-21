import { BadRequestException } from "@nestjs/common";
import { RepositorioEquipe } from "src/dominio/equipe/repositorioEquipe";
import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { CriarJogoDTO } from "src/dominio/jogo/dtos/criadorDeJogo.dto";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { SuspensorDeJogadorService } from "../../../dominio/jogador/services/suspensorDeJogador.service";
import { CriadorDeJogoService } from "../../../dominio/jogo/services/criadorDeJogo.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { EquipeBuilder } from "../../builders/equipeBuilder";
import { FaseBuilder } from "../../builders/faseBuilder";
import { GrupoBuilder } from "../../builders/grupoBuilder";
import { LocalBuilder } from "../../builders/localBuilder";

describe("criar jogo", () => {
  let repositorioJogo: RepositorioJogo;
  let repositorioEquipe: RepositorioEquipe;
  let repositorioFase: RepositorioFase;
  let repositorioLocal: RepositorioLocal;
  let criadorDeJogoService: CriadorDeJogoService;
  let suspensorDeJogadorService: SuspensorDeJogadorService;
  let equipe1;
  let equipe2;
  let fase;
  let grupo;
  let local;
  let jogoDto: CriarJogoDTO;

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
    grupo = GrupoBuilder.umGrupo()
      .comId(1)
      .comNome("nome do grupo")
      .comObservacao("observação")
      .comFase();
    equipe1 = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
      .comCategoria()
      .comGrupo(grupo);
    equipe2 = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
      .comCategoria()
      .comGrupo(grupo);
    local = LocalBuilder.umLocal()
      .comId(1)
      .comNome("nome local")
      .comEndereco("endereço local")
      .comCep("78465122")
      .comCampeonato();
    jogoDto = {
      numeroDoJogo: 1,
      numeroDaRodada: 1,
      dataHora: new Date(),
      faseId: 1,
      equipe1Id: 1,
      equipe2Id: 2,
      localId: 1,
    };
    repositorioFase = {
      salvar: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorId: jest.fn(),
    };
    repositorioLocal = {
      salvar: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
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
    repositorioJogo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorData: jest.fn(),
      buscarPorFaseId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    criadorDeJogoService = new CriadorDeJogoService(
      repositorioJogo,
      repositorioEquipe,
      repositorioFase,
      repositorioLocal,
      suspensorDeJogadorService,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe1.criar()),
    );
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );

    await criadorDeJogoService.criar(jogoDto);

    expect(repositorioJogo.salvar).toHaveBeenCalledWith({
      ...jogoDto,
      fase,
      equipe1,
      equipe2,
      local,
      realizado: false,
      wo: false,
      golsRegularEquipe1: 0,
      golsRegularEquipe2: 0,
      golsProrrogacaoEquipe1: 0,
      golsProrrogacaoEquipe2: 0,
      golsPenaltiEquipe1: 0,
      golsPenaltiEquipe2: 0,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma equipe existente", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() => Promise.resolve(undefined));
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );

    const criarJogo = async () => {
      await criadorDeJogoService.criar(jogoDto);
    };

    await expect(criarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogo com uma equipe inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma fase existente", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe1.criar()),
    );
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(undefined));
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );

    const criarJogo = async () => {
      await criadorDeJogoService.criar(jogoDto);
    };

    await expect(criarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogo com uma fase inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando não houver um local existente", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe1.criar()),
    );
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));
    repositorioLocal.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const criarJogo = async () => {
      await criadorDeJogoService.criar(jogoDto);
    };

    await expect(criarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogo com um local inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    const categoria = CategoriaBuilder.umaCategoria()
      .comCampeonato(campeonato)
      .criar();
    repositorioFase.buscarPorId = jest.fn(() =>
      Promise.resolve(fase.comCategoria(categoria).criar()),
    );
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe1.criar()),
    );
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );

    const criarJogo = async () => {
      await criadorDeJogoService.criar(jogoDto);
    };

    await expect(criarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogo com uma fase de um campeonato inativo.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando as equipes forem iguais", async () => {
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe1.criar()),
    );
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );
    jogoDto.equipe2Id = 1;

    const criarJogo = async () => {
      await criadorDeJogoService.criar(jogoDto);
    };

    await expect(criarJogo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogo com duas equipes iguais.",
      ),
    );
  });
});
