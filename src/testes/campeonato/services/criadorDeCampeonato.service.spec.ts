import { BadRequestException } from "@nestjs/common";
import * as moment from "moment";
import { CriarCampeonatoDTO } from "src/dominio/campeonato/dtos/criadorDeCampeonato.dto";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { CriadorDeCampeonatoService } from "../../../dominio/campeonato/services/criadorDeCampeonato.service";

describe("Criar campeonato", () => {
  let criadorDeCampeonatoService: CriadorDeCampeonatoService;
  let repositorioCampeonato: RepositorioCampeonato;
  let campeonatoDto: CriarCampeonatoDTO;

  beforeEach(async () => {
    campeonatoDto = {
      nome: "nome do campeonato",
      dataInicio: moment().subtract(1, "days").toDate(),
      dataFim: new Date(),
      inscricaoDataInicio: moment().subtract(1, "days").toDate(),
      inscricaoDataFim: new Date(),
      ativo: true,
      exibirNoSite: false,
    };
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    criadorDeCampeonatoService = new CriadorDeCampeonatoService(
      repositorioCampeonato,
    );
  });

  it('Deve chamar o método "salvar" com sucesso', async () => {
    await criadorDeCampeonatoService.criar(campeonatoDto);

    expect(repositorioCampeonato.salvar).toHaveBeenCalledWith(campeonatoDto);
  });

  it("Não deve criar um campeonato por estar recebendo como parâmetro data inicial superior a data final", async () => {
    campeonatoDto.dataInicio = moment().add(1, "days").toDate();

    const criarCampeonato = async () => {
      await criadorDeCampeonatoService.criar(campeonatoDto);
    };

    await expect(criarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });

  it("Não deve criar um campeonato por estar recebendo como parâmetro data de inscrição inicial superior a data final", async () => {
    campeonatoDto.inscricaoDataInicio = moment().add(1, "days").toDate();

    const criarCampeonato = async () => {
      await criadorDeCampeonatoService.criar(campeonatoDto);
    };

    await expect(criarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });

  it("Não deve criar um campeonato por estar recebendo como parâmetro data inicial igual a data final", async () => {
    campeonatoDto.dataInicio = new Date();

    const criarCampeonato = async () => {
      await criadorDeCampeonatoService.criar(campeonatoDto);
    };

    await expect(criarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });

  it("Não deve criar um campeonato por estar recebendo como parâmetro data de inscrição inicial igual a data final", async () => {
    campeonatoDto.inscricaoDataInicio = new Date();

    const criarCampeonato = async () => {
      await criadorDeCampeonatoService.criar(campeonatoDto);
    };

    await expect(criarCampeonato).rejects.toThrow(
      new BadRequestException(
        "A data de início não pode ser maior ou igual à data de fim.",
      ),
    );
  });
});
