import { BadRequestException } from "@nestjs/common";
import * as moment from "moment";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { CriarCategoriaDTO } from "src/dominio/categoria/dtos/criadorDeCategoria.dto";
import { RepositorioCategoria } from "src/dominio/categoria/repositorioCategoria";
import { CriadorDeCategoriaService } from "../../../dominio/categoria/services/criadorDeCategoria.service";
import { Campeonato } from "../../../dominio/entidades/campeonato.entity";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";

describe("criar nova categoria", () => {
  let criadorDeCategoriaService: CriadorDeCategoriaService;
  let repositorioCategoria: RepositorioCategoria;
  let repositorioCampeonato: RepositorioCampeonato;
  let categoriaDto: CriarCategoriaDTO;
  let campeonato: Campeonato;

  beforeEach(async () => {
    categoriaDto = {
      campeonatoId: 1,
      genero: "F",
      nome: "nome da categoria",
      idadeMinima: 18,
      idadeMaxima: 49,
      maxJogadoresAtivos: 12,
      maxJogadoresDependentes: 3,
      goleiroForaIdade: false,
      maxCartoesVermelhosPorJogo: 2,
      maxHorasInscricaoJogador: 24,
    };
    campeonato = CampeonatoBuilder.umCampeonato()
      .comId(1)
      .comNome("nome do campeonato")
      .comDataInicio(moment().subtract(1, "days").toDate())
      .comDataFim(new Date())
      .cominscricaoDataInicio(moment().subtract(1, "days").toDate())
      .cominscricaoDataFim(new Date())
      .estaAtivo(true)
      .criar();
    repositorioCategoria = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    criadorDeCategoriaService = new CriadorDeCategoriaService(
      repositorioCategoria,
      repositorioCampeonato,
    );
  });

  it("Deve criar uma categoria", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );

    await criadorDeCategoriaService.criar(categoriaDto);

    expect(repositorioCategoria.salvar).toHaveBeenCalledWith({
      ...categoriaDto,
      campeonato,
    });
  });

  it("Deve lançar uma exceção BadRequestException quando não houver um campeonato existente", async () => {
    categoriaDto.campeonatoId = null;

    const criarCategoria = async () => {
      await criadorDeCategoriaService.criar(categoriaDto);
    };

    await expect(criarCategoria).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma categoria sem um campeonato existente.",
      ),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando o campeonato estiver inativo", async () => {
    campeonato.ativo = false;
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );

    const criarCategoria = async () => {
      await criadorDeCategoriaService.criar(categoriaDto);
    };

    await expect(criarCategoria).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma categoria em um campeonato inativo.",
      ),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando parâmetro de idades estiverem incorretos", async () => {
    categoriaDto.idadeMinima = 50;
    categoriaDto.idadeMaxima = 20;

    const criarCategoria = async () => {
      await criadorDeCategoriaService.criar(categoriaDto);
    };

    await expect(criarCategoria).rejects.toThrow(
      new BadRequestException("Intervalo de idades inválido."),
    );
  });
});
