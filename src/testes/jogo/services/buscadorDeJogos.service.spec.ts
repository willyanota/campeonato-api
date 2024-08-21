import { RepositorioJogo } from "../../../dominio/jogo/repositorioJogo";
import { BuscadorDeJogosService } from "../../../dominio/jogo/services/buscadorDeJogos.service";

describe("buscar um jogo pelo seu Id", () => {
  let buscadorDeJogos: BuscadorDeJogosService;
  let repositorioJogo: RepositorioJogo;

  beforeEach(async () => {
    repositorioJogo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorData: jest.fn(),
      buscarPorFaseId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    buscadorDeJogos = new BuscadorDeJogosService(repositorioJogo);
  });

  describe("buscar jogos por campeonato id", () => {
    it('Deve chamar o método "buscarJogosPeloCampeonatoId" com sucesso', async () => {
      const campeonatoId = 1;

      await buscadorDeJogos.buscarPorCampeonatoId(campeonatoId);

      expect(repositorioJogo.buscarPorCampeonatoId).toHaveBeenCalledWith(
        campeonatoId,
      );
    });
  });

  it('deve chamar o método "buscarTodos" com sucesso', async () => {
    await buscadorDeJogos.buscarTodos();

    expect(repositorioJogo.buscarTodos).toHaveBeenCalledTimes(1);
  });

  it("deve chamar buscar jogos por data", async () => {
    const data = "21-02-2024";

    await buscadorDeJogos.buscarPorData(data);

    expect(repositorioJogo.buscarPorData).toHaveBeenCalledWith(data);
  });

  describe("buscar jogos por fase id", () => {
    it('Deve chamar o método "buscarJogosPorFaseId" com sucesso', async () => {
      const faseId = 1;

      await buscadorDeJogos.buscarPorFaseId(faseId);

      expect(repositorioJogo.buscarPorFaseId).toHaveBeenCalledWith(faseId);
    });
  });

  describe("buscar jogos por categoria id", () => {
    it('Deve chamar o método "buscarJogosPorCategoriaId" com sucesso', async () => {
      const categoriaId = 1;

      await buscadorDeJogos.buscarPorCategoriaId(categoriaId);

      expect(repositorioJogo.buscarPorCategoriaId).toHaveBeenCalledWith(
        categoriaId,
      );
    });
  });
});
