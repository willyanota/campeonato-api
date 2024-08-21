import { BadRequestException } from "@nestjs/common";
import { RepositorioGrupo } from "src/dominio/grupo/repositorioGrupo";
import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";
import { EditorDeEquipeService } from "../../../dominio/equipe/services/editorDeEquipe.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { EquipeBuilder } from "../../builders/equipeBuilder";

describe("editar equipe", () => {
  let repositorioEquipe: RepositorioEquipe;
  let repositorioGrupo: RepositorioGrupo;
  let editorEquipeService: EditorDeEquipeService;
  let equipe: EquipeBuilder;

  beforeEach(async () => {
    equipe = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
      .comPontos(0)
      .comCategoria();
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
    repositorioGrupo = {
      buscarPorCampeonatoId: jest.fn(),
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    editorEquipeService = new EditorDeEquipeService(
      repositorioEquipe,
      repositorioGrupo,
    );
  });

  it('deve chamar o método "editarEquipe" com êxito', async () => {
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe.criar()),
    );

    await editorEquipeService.editar(equipe.criar());

    expect(repositorioEquipe.salvar).toHaveBeenCalledWith({
      ...equipe,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar uma Equipe", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarEquipe = async () => {
      await editorEquipeService.editar(equipe.criar());
    };

    await expect(editarEquipe).rejects.toThrow(
      new BadRequestException("Equipe não encontrada."),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    const categoria = CategoriaBuilder.umaCategoria()
      .comCampeonato(campeonato)
      .criar();
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe.comCategoria(categoria).criar()),
    );

    const editarEquipe = async () => {
      await editorEquipeService.editar(equipe.criar());
    };

    await expect(editarEquipe).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar uma equipe de um campeonato inativo.",
      ),
    );
  });
});
