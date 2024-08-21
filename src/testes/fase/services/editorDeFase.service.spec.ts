import { BadRequestException } from "@nestjs/common";
import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { EditorDeFaseService } from "../../../dominio/fase/services/editorDeFase.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { FaseBuilder } from "../../builders/faseBuilder";

describe("editar fase", () => {
  let editorDeFaseService: EditorDeFaseService;
  let repositorioFase: RepositorioFase;
  let fase;

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
    repositorioFase = {
      salvar: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorId: jest.fn(),
    };
    editorDeFaseService = new EditorDeFaseService(repositorioFase);
  });

  it('deve chamar o método "salvar" com êxito', async () => {
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));

    await editorDeFaseService.editar(fase.criar());

    expect(repositorioFase.salvar).toHaveBeenCalledWith({
      ...fase,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar uma Fase", async () => {
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarFase = async () => {
      await editorDeFaseService.editar(fase.criar());
    };

    await expect(editarFase).rejects.toThrow(
      new BadRequestException("Fase não encontrada."),
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

    const editarFase = async () => {
      await editorDeFaseService.editar(fase.criar());
    };

    await expect(editarFase).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar uma fase com uma categoria de um campeonato inativo.",
      ),
    );
  });
});
