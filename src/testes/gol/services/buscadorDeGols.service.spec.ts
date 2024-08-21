import { RepositorioGol } from "../../../dominio/gol/repositorioGol";
import { BuscadorDeGolsService } from "../../../dominio/gol/services/buscadorDeGols.service";

describe("buscador de gols", () => {
  let buscadorDeGols: BuscadorDeGolsService;
  let repositorioGol: RepositorioGol;

  beforeEach(async () => {
    repositorioGol = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    buscadorDeGols = new BuscadorDeGolsService(repositorioGol);
  });

  describe("buscar gols por jogo id", () => {
    it('deve chamar o método "buscarPor" com êxito', async () => {
      const jogoId = 1;

      await buscadorDeGols.buscarPorJogoId(jogoId);

      expect(repositorioGol.buscarPorJogoId).toHaveBeenCalledWith(jogoId);
    });
  });
});
