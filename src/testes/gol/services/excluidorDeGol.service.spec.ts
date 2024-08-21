import { BadRequestException } from "@nestjs/common";
import { RepositorioGol } from "../../../dominio/gol/repositorioGol";
import { ExcluidorDeGolService } from "../../../dominio/gol/services/excluidorDeGol.service";
import { GolBuilder } from "../../builders/golBuilder";

describe("excluir gol", () => {
  let repositorioGol: RepositorioGol;
  let excluidorDeGolService: ExcluidorDeGolService;
  let gol;

  beforeEach(async () => {
    gol = GolBuilder.umGol()
      .comId(1)
      .comMinuto(42)
      .comPeriodo("Primeiro Tempo Regular")
      .ehGolContra(false)
      .comJogo()
      .comJogador();
    repositorioGol = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    excluidorDeGolService = new ExcluidorDeGolService(repositorioGol);
  });

  it('deve chamar o método "excluirGol" com êxito', async () => {
    repositorioGol.buscarPorId = jest.fn(() => Promise.resolve(gol.criar()));

    await excluidorDeGolService.excluir(gol.id);

    expect(repositorioGol.excluir).toHaveBeenCalledWith(gol.id);
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar um gol", async () => {
    repositorioGol.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const excluirGol = async () => {
      await excluidorDeGolService.excluir(gol.id);
    };

    await expect(excluirGol).rejects.toThrow(
      new BadRequestException("Gol não encontrado."),
    );
  });
});
