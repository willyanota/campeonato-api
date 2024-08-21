import { BadRequestException } from "@nestjs/common";
import { RepositorioCategoria } from "src/dominio/categoria/repositorioCategoria";
import { CriarFaseDTO } from "src/dominio/fase/dtos/criadorDeFase.dto";
import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { CriadorDeFaseService } from "../../../dominio/fase/services/criadorDeFase.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";

describe("criar fase", () => {
  let criadorDeFaseService: CriadorDeFaseService;
  let repositorioFase: RepositorioFase;
  let repositorioCategoria: RepositorioCategoria;
  let faseDto: CriarFaseDTO;
  let categoria;

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
    faseDto = {
      categoriaId: 1,
      nome: "nome da fase",
      ehGrupo: false,
      temProrrogacao: false,
      temPenalti: false,
      quantidadeClassificados: 2,
    };
    repositorioFase = {
      salvar: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorId: jest.fn(),
    };
    repositorioCategoria = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    criadorDeFaseService = new CriadorDeFaseService(
      repositorioFase,
      repositorioCategoria,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(categoria.criar()),
    );

    await criadorDeFaseService.criar(faseDto);

    expect(repositorioFase.salvar).toHaveBeenCalledWith({
      ...faseDto,
      categoria,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma categoria existente", async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(undefined),
    );

    const criarFase = async () => {
      await criadorDeFaseService.criar(faseDto);
    };

    await expect(criarFase).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma fase com uma categoria inexistente.",
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

    const criarFase = async () => {
      await criadorDeFaseService.criar(faseDto);
    };

    await expect(criarFase).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar uma fase com uma categoria de um campeonato inativo.",
      ),
    );
  });
});
