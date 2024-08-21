import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { BuscadorDeCampeonatosService } from "../../../dominio/campeonato/services/buscadorDeCampeonatos.service";

describe("Buscador de campeonatos", () => {
  let buscadorDeCampeonatos: BuscadorDeCampeonatosService;
  let repositorioCampeonato: RepositorioCampeonato;

  beforeEach(async () => {
    repositorioCampeonato = {
      buscarPorId: jest.fn(),
      buscarAtivos: jest.fn(),
      buscarTodos: jest.fn(),
      salvar: jest.fn(),
    };
    buscadorDeCampeonatos = new BuscadorDeCampeonatosService(
      repositorioCampeonato,
    );
  });

  describe("buscar campeonato", () => {
    it('Deve chamar o método "buscar" com sucesso', async () => {
      const id = 2;

      await buscadorDeCampeonatos.buscar(id);

      expect(repositorioCampeonato.buscarPorId).toHaveBeenCalledWith(id);
    });
  });

  describe("buscar campeonatos ativos", () => {
    it('Deve chamar o método "buscarAtivos" com sucesso', async () => {
      await buscadorDeCampeonatos.buscarAtivos();

      expect(repositorioCampeonato.buscarAtivos).toHaveBeenCalled();
    });
  });

  describe("buscar todos os campeonatos", () => {
    it('Deve chamar o método "buscarTodosCampeonatos" com sucesso', async () => {
      await buscadorDeCampeonatos.buscarTodos();

      expect(repositorioCampeonato.buscarTodos).toHaveBeenCalled();
    });
  });
});
