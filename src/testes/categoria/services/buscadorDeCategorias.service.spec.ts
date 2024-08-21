import { RepositorioCategoria } from "src/dominio/categoria/repositorioCategoria";
import { BuscadorDeCategoriasService } from "../../../dominio/categoria/services/buscadorDeCategorias.service";

describe("buscar categorias pelo campeonato id", () => {
  let buscadorDeCategorias: BuscadorDeCategoriasService;
  let repositorioCategoria: RepositorioCategoria;

  beforeEach(async () => {
    repositorioCategoria = {
      buscarPorId: jest.fn(),
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
    };
    buscadorDeCategorias = new BuscadorDeCategoriasService(
      repositorioCategoria,
    );
  });

  describe("buscar categorias por campeonato id", () => {
    it('Deve chamar o método "buscarCategoriasPeloCampeonatoId" com sucesso', async () => {
      const campeonatoId = 1;

      await buscadorDeCategorias.buscarPorCampeonatoId(campeonatoId);

      expect(repositorioCategoria.buscarPorCampeonatoId).toHaveBeenCalledWith(
        campeonatoId,
      );
    });
  });
});
