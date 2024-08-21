import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";
import { BuscadorDeEquipesService } from "../../../dominio/equipe/services/buscadorDeEquipes.service";

describe("Busca de equipes por campeonatoId", () => {
  let repositorioEquipe: RepositorioEquipe;
  let buscadorDeEquipes: BuscadorDeEquipesService;

  beforeEach(async () => {
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
    buscadorDeEquipes = new BuscadorDeEquipesService(repositorioEquipe);
  });

  it('deve chamar o método "buscarPorCampeonatoId" com êxito', async () => {
    const campeonatoId = 1;

    await buscadorDeEquipes.buscarPorCampeonatoId(campeonatoId);

    expect(repositorioEquipe.buscarPorCampeonatoId).toHaveBeenCalledWith(
      campeonatoId,
    );
  });

  it('deve chamar o método "buscarEquipesDosCampeonatosAtivos" com êxito', async () => {
    await buscadorDeEquipes.buscarEquipesDosCampeonatosAtivos();

    expect(repositorioEquipe.buscarDosCampeonatosAtivos).toHaveBeenCalled();
  });

  it('deve chamar o método "buscarPorCategoriaId" com êxito', async () => {
    const categoriaId = 1;

    await buscadorDeEquipes.buscarPorCategoriaId(categoriaId);

    expect(repositorioEquipe.buscarPorCategoriaId).toHaveBeenCalledWith(
      categoriaId,
    );
  });
});
