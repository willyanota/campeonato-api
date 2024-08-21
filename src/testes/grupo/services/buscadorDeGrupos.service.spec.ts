import { RepositorioGrupo } from "src/dominio/grupo/repositorioGrupo";
import { BuscadorDeGruposService } from "../../../dominio/grupo/services/buscadorDeGrupos.service";

describe("Buscador de Grupos", () => {
  let buscadorDeGruposService: BuscadorDeGruposService;
  let repositorioGrupo: RepositorioGrupo;

  beforeEach(async () => {
    repositorioGrupo = {
      buscarPorCampeonatoId: jest.fn(),
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    buscadorDeGruposService = new BuscadorDeGruposService(repositorioGrupo);
  });

  it("deve chamar o repositorio de grupo com o campeonatoId que veio", async () => {
    const campeonatoId = 2;

    await buscadorDeGruposService.buscarPorCampeonatoId(campeonatoId);

    expect(repositorioGrupo.buscarPorCampeonatoId).toHaveBeenCalledWith(
      campeonatoId,
    );
  });

  it('deve chamar o método "buscarTodos" com sucesso', async () => {
    await buscadorDeGruposService.buscarTodos();

    expect(repositorioGrupo.buscarTodos).toHaveBeenCalledTimes(1);
  });
});
