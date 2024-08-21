import { BadRequestException } from "@nestjs/common";
import * as moment from "moment";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { EditorDeCampeonatoService } from "../../../dominio/campeonato/services/editorDeCampeonato.service";

describe("Editar campeonato", () => {
  let editorDeCampeonatoService: EditorDeCampeonatoService;
  let repositorioCampeonato: RepositorioCampeonato;
  let campeonato;

  beforeEach(async () => {
    campeonato = {
      id: 1,
      nome: "nome do campeonato",
      dataInicio: moment().subtract(1, "days").toDate(),
      dataFim: new Date(),
      inscricaoDataInicio: moment().subtract(1, "days").toDate(),
      inscricaoDataFim: new Date(),
      ativo: true,
      exibirNoSite: false,
      dataCriacao: moment().subtract(1, "days").toDate(),
    };
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    editorDeCampeonatoService = new EditorDeCampeonatoService(
      repositorioCampeonato,
    );
  });

  it("Deve editar apenas o campo ativo quando o mesmo for false", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );
    campeonato.ativo = false;

    await editorDeCampeonatoService.editar(campeonato);

    expect(repositorioCampeonato.salvar).toHaveBeenCalledWith({
      ...campeonato,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("Deve salvar o campeonato editado", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );

    await editorDeCampeonatoService.editar(campeonato);

    expect(repositorioCampeonato.salvar).toHaveBeenCalledWith({
      ...campeonato,
      dataAtualizacao: expect.any(Date),
    });
  });

  it("Não deve editar um campeonato por não encontrar campeonato", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(undefined),
    );

    const editarCampeonato = async () => {
      await editorDeCampeonatoService.editar(campeonato);
    };

    await expect(editarCampeonato).rejects.toThrow(
      new BadRequestException("Campeonato não encontrado."),
    );
  });

  it("Não deve editar um campeonato por estar recebendo como parâmetro data inicial superior a data final", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() => campeonato);
    campeonato.dataInicio = moment().add(1, "days").toDate();

    const editarCampeonato = async () => {
      await editorDeCampeonatoService.editar(campeonato);
    };

    await expect(editarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });

  it("Não deve editar um campeonato por estar recebendo como parâmetro data de inscrição inicial superior a data final", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() => campeonato);
    campeonato.inscricaoDataInicio = moment().add(1, "days").toDate();

    const editarCampeonato = async () => {
      await editorDeCampeonatoService.editar(campeonato);
    };

    await expect(editarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });
});
