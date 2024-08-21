import { BadRequestException } from "@nestjs/common";
import { RepositorioGrupo } from "src/dominio/grupo/repositorioGrupo";
import { EditorDeGrupoService } from "../../../dominio/grupo/services/editorDeGrupo.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { FaseBuilder } from "../../builders/faseBuilder";
import { GrupoBuilder } from "../../builders/grupoBuilder";

describe("editar grupo", () => {
  let repositorioGrupo: RepositorioGrupo;
  let editorGrupoService: EditorDeGrupoService;
  let grupo;

  beforeEach(async () => {
    grupo = GrupoBuilder.umGrupo()
      .comId(1)
      .comNome("nome do grupo")
      .comObservacao("observação")
      .comFase();
    repositorioGrupo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    editorGrupoService = new EditorDeGrupoService(repositorioGrupo);
  });

  it('deve chamar o método "editarGrupo" com êxito', async () => {
    repositorioGrupo.buscarPorId = jest.fn(() =>
      Promise.resolve(grupo.criar()),
    );

    await editorGrupoService.editar(grupo.criar());

    expect(repositorioGrupo.salvar).toHaveBeenCalledWith({
      ...grupo,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar um Grupo", async () => {
    repositorioGrupo.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarGrupo = async () => {
      await editorGrupoService.editar(grupo.criar());
    };

    await expect(editarGrupo).rejects.toThrow(
      new BadRequestException("Grupo não encontrado."),
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
    repositorioGrupo.buscarPorId = jest.fn(() =>
      Promise.resolve(grupo.comFase(fase).criar()),
    );

    const editarGrupo = async () => {
      await editorGrupoService.editar(grupo.criar());
    };

    await expect(editarGrupo).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar um grupo com uma fase de um campeonato inativo.",
      ),
    );
  });
});
