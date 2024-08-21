import { BadRequestException } from "@nestjs/common";
import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";
import { ExcluidorDeEquipeService } from "../../../dominio/equipe/services/excluidorDeEquipe.service";
import { EquipeBuilder } from "../../builders/equipeBuilder";

describe("excluir equipe", () => {
  let repositorioEquipe: RepositorioEquipe;
  let excluidorDeEquipeService: ExcluidorDeEquipeService;
  let equipe;

  beforeEach(async () => {
    equipe = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
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
    excluidorDeEquipeService = new ExcluidorDeEquipeService(repositorioEquipe);
  });

  it('deve chamar o método "excluirEquipe" com êxito', async () => {
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe.criar()),
    );

    await excluidorDeEquipeService.excluir(equipe.id);

    expect(repositorioEquipe.excluir).toHaveBeenCalledWith(equipe.id);
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar uma Equipe", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const excluirEquipe = async () => {
      await excluidorDeEquipeService.excluir(equipe.id);
    };

    await expect(excluirEquipe).rejects.toThrow(
      new BadRequestException("Equipe não encontrada."),
    );
  });
});
