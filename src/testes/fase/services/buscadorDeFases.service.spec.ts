import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { BuscadorDeFasesService } from "../../../dominio/fase/services/buscadorDeFases.service";

describe("buscar fases por id da categoria", () => {
  let buscadorDeFasesService: BuscadorDeFasesService;
  let repositorioFase: RepositorioFase;

  beforeEach(async () => {
    repositorioFase = {
      buscarPorCategoriaId: jest.fn(),
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
    };
    buscadorDeFasesService = new BuscadorDeFasesService(repositorioFase);
  });

  it('deve chamar o método "buscarFasesPorCategoriaId" com êxito', async () => {
    const categoriaId = 1;

    await buscadorDeFasesService.buscarPorCategoriaId(categoriaId);

    expect(repositorioFase.buscarPorCategoriaId).toHaveBeenCalledWith(
      categoriaId,
    );
  });
});
