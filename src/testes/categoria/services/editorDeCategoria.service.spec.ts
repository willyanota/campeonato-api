import { BadRequestException } from "@nestjs/common";
import { RepositorioCategoria } from "src/dominio/categoria/repositorioCategoria";
import { EditorDeCategoriaService } from "../../../dominio/categoria/services/editorDeCategoria.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";

describe("editar categoria", () => {
  let editorDeCategoriaService: EditorDeCategoriaService;
  let repositorioCategoria: RepositorioCategoria;
  let categoria: CategoriaBuilder;

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
    repositorioCategoria = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    editorDeCategoriaService = new EditorDeCategoriaService(
      repositorioCategoria,
    );
  });

  it("Deve editar uma categoria", async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(categoria.criar()),
    );

    await editorDeCategoriaService.editar(categoria.criar());

    expect(repositorioCategoria.salvar).toHaveBeenCalledWith({
      ...categoria,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("Deve lançar uma exceção BadRequestException quando não encontrar uma categoria", async () => {
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(undefined),
    );

    const editarCategoria = async () => {
      await editorDeCategoriaService.editar(categoria.criar());
    };

    await expect(editarCategoria).rejects.toThrow(
      new BadRequestException("Categoria não encontrada."),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    repositorioCategoria.buscarPorId = jest.fn(() =>
      Promise.resolve(categoria.comCampeonato(campeonato).criar()),
    );

    const editarCategoria = async () => {
      await editorDeCategoriaService.editar(categoria.criar());
    };

    await expect(editarCategoria).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar uma categoria de um campeonato inativo.",
      ),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando parâmetro de idades estiverem incorretos", async () => {
    categoria.comIdadeMinima(50);
    categoria.comIdadeMaxima(20);

    const editarCategoria = async () => {
      await editorDeCategoriaService.editar(categoria.criar());
    };

    await expect(editarCategoria).rejects.toThrow(
      new BadRequestException("Intervalo de idades inválido."),
    );
  });
});
