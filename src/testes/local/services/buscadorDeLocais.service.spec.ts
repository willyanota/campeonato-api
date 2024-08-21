import { RepositorioLocal } from "../../../dominio/local/repositorioLocal";
import { BuscadorDeLocaisService } from "../../../dominio/local/services/buscadorDeLocais.service";

describe("Buscador de campeonatos", () => {
  let buscadorDeLocais: BuscadorDeLocaisService;
  let repositorioLocal: RepositorioLocal;

  beforeEach(async () => {
    repositorioLocal = {
      salvar: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    buscadorDeLocais = new BuscadorDeLocaisService(repositorioLocal);
  });

  describe("buscar todos os locais", () => {
    it('Deve chamar o método "buscarTodos" com sucesso', async () => {
      await buscadorDeLocais.buscarTodos();

      expect(repositorioLocal.buscarTodos).toHaveBeenCalled();
    });
  });

  describe("buscar locais pelo id do campeonato", () => {
    it('Deve chamar o método "buscarTodos" com sucesso', async () => {
      const campeonatoId = 1;

      await buscadorDeLocais.buscarPorCampeonatoId(campeonatoId);

      expect(repositorioLocal.buscarPorCampeonatoId).toHaveBeenCalled();
    });
  });
});
