import { BadRequestException } from "@nestjs/common";
import { CriarEquipeDTO } from "src/dominio/equipe/dtos/criadorDeEquipe.dto";
import { RepositorioCategoria } from "../../../dominio/categoria/repositorioCategoria";
import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";
import { CriadorDeEquipeService } from "../../../dominio/equipe/services/criadorDeEquipe.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";

describe("criar equipe", () => {
  let repositorioEquipe: RepositorioEquipe;
  let repositorioCategoria: RepositorioCategoria;
  let criadorDeEquipeService: CriadorDeEquipeService;
  let categoria;
  let equipeDto: CriarEquipeDTO;

  beforeEach(async () => {
    categoria = CategoriaBuilder.umaCategoria()
      .comId(1)
      .comGenero("F")
      .comNome("nome da categoria")
      .comIdadeMinima(18)
      .comIdadeMaxima(49)
      .comMaxJogadoresAtivos(20)
      .comMaxJogadoresDependentes(5)
      .comMaxCartoesVermelhosPorJogo(2)
      .comMaxHorasInscricaoJogador(48)
      .comCampeonato();
    equipeDto = {
      categoriaId: 1,
      nome: "nome da equipe",
      responsavel: "nome do responsavel",
      ehConvidada: true,
      abertura: true,
    };
    repositorioCategoria = {
      salvar: jest.fn(),
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
    criadorDeEquipeService = new CriadorDeEquipeService(
      repositorioEquipe,
      repositorioCategoria,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(categoria.criar()),
    );

    await criadorDeEquipeService.criar(equipeDto);

    expect(repositorioEquipe.salvar).toHaveBeenCalledWith({
      ...equipeDto,
      categoria,
      pontos: 2,
      contadorDeVitorias: 0,
      contadorDeEmpates: 0,
      contadorDeDerrotas: 0,
      golsPro: 0,
      golsContra: 0,
      saldoDeGols: 0,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma categoria existente", async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(undefined),
    );

    const criarEquipe = async () => {
      await criadorDeEquipeService.criar(equipeDto);
    };

    await expect(criarEquipe).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma equipe com uma categoria inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(categoria.comCampeonato(campeonato).criar()),
    );

    const criarEquipe = async () => {
      await criadorDeEquipeService.criar(equipeDto);
    };

    await expect(criarEquipe).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma equipe com uma categoria de um campeonato inativo.",
      ),
    );
  });
});
