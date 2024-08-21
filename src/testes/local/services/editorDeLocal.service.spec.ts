import { BadRequestException } from "@nestjs/common";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { EditorDeLocalService } from "../../../dominio/local/services/editorDeLocal.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { LocalBuilder } from "../../builders/localBuilder";

describe("editar local", () => {
  let editorDeLocalService: EditorDeLocalService;
  let repositorioLocal: RepositorioLocal;
  let repositorioCampeonato: RepositorioCampeonato;
  let local: LocalBuilder;

  beforeEach(async () => {
    local = LocalBuilder.umLocal()
      .comId(1)
      .comNome("nome local")
      .comEndereco("endereço local")
      .comCep("78465122")
      .comCampeonato();
    repositorioLocal = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    editorDeLocalService = new EditorDeLocalService(
      repositorioLocal,
      repositorioCampeonato,
    );
  });

  it("Deve editar um local", async () => {
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.criar()),
    );

    await editorDeLocalService.editar(local.criar());

    expect(repositorioLocal.salvar).toHaveBeenCalledWith({
      ...local,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("Deve lançar uma exceção BadRequestException quando não encontrar um local", async () => {
    repositorioLocal.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarLocal = async () => {
      await editorDeLocalService.editar(local.criar());
    };

    await expect(editarLocal).rejects.toThrow(
      new BadRequestException("Local não encontrado."),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    repositorioLocal.buscarPorId = jest.fn(() =>
      Promise.resolve(local.comCampeonato(campeonato).criar()),
    );

    const editarLocal = async () => {
      await editorDeLocalService.editar(local.criar());
    };

    await expect(editarLocal).rejects.toThrow(
      new BadRequestException(
        "Não é possível alterar um local de um campeonato inativo.",
      ),
    );
  });
});
