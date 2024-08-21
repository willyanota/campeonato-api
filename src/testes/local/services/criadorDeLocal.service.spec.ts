import { BadRequestException } from "@nestjs/common";
import * as moment from "moment";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { CriarLocalDTO } from "src/dominio/local/dtos/criadorDeLocal.dto";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { Campeonato } from "../../../dominio/entidades/campeonato.entity";
import { CriadorDeLocalService } from "../../../dominio/local/services/criadorDeLocal.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";

describe("criar local", () => {
  let criadorDeLocalService: CriadorDeLocalService;
  let repositorioLocal: RepositorioLocal;
  let repositorioCampeonato: RepositorioCampeonato;
  let localDto: CriarLocalDTO;
  let campeonato: Campeonato;

  beforeEach(async () => {
    localDto = {
      campeonatoId: 1,
      nome: "nome do local",
      endereco: "endereco do local",
      cep: "cep do local",
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
    repositorioLocal = {
      salvar: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    criadorDeLocalService = new CriadorDeLocalService(
      repositorioLocal,
      repositorioCampeonato,
    );
  });

  it("deve criar um local", async () => {
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );

    await criadorDeLocalService.criar(localDto);

    expect(repositorioLocal.salvar).toHaveBeenCalledWith({
      ...localDto,
      campeonato,
    });
  });

  it("Deve lançar uma exceção BadRequestException quando não houver um campeonato existente", async () => {
    localDto.campeonatoId = null;

    const criarLocal = async () => {
      await criadorDeLocalService.criar(localDto);
    };

    await expect(criarLocal).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um local sem um campeonato existente.",
      ),
    );
  });

  it("Deve lançar uma exceção BadRequestException quando o campeonato estiver inativo", async () => {
    campeonato.ativo = false;
    repositorioCampeonato.buscarPorId = jest.fn(() =>
      Promise.resolve(campeonato),
    );

    const criarLocal = async () => {
      await criadorDeLocalService.criar(localDto);
    };

    await expect(criarLocal).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um local em um campeonato inativo.",
      ),
    );
  });
});
