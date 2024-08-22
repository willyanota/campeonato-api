import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { BuscadorDeJogadoresService } from "../../../dominio/jogador/services/buscadorDeJogadores.service";

describe("Buscador de jogadores", () => {
  let buscadorDeJogadoresService: BuscadorDeJogadoresService;
  let repositorioJogador: RepositorioJogador;

  beforeEach(async () => {
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    buscadorDeJogadoresService = new BuscadorDeJogadoresService(
      repositorioJogador,
    );
  });

  describe("buscar jogadores por equipe id", () => {
    it('deve chamar o método "buscarJogadoresPorEquipeId" com sucesso', async () => {
      const equipeId = 1;

      await buscadorDeJogadoresService.buscarPorEquipeId(equipeId);

      expect(repositorioJogador.buscarPorEquipeId).toHaveBeenCalledWith(
        equipeId,
      );
    });
  });

  describe("buscar jogadores por categoria id", () => {
    it('deve chamar o método "buscarJogadoresPorCategoriaId" com sucesso', async () => {
      const categoriaId = 1;

      await buscadorDeJogadoresService.buscarPorCategoriaId(categoriaId);

      expect(repositorioJogador.buscarPorCategoriaId).toHaveBeenCalledWith(
        categoriaId,
      );
    });
  });
});
