import { Campeonato } from "../entidades/campeonato.entity";

export interface RepositorioCampeonato {
  salvar(campeonato: Campeonato): Promise<void>;
  buscarTodos(): Promise<Campeonato[]>;
  buscarPorId(id: number): Promise<Campeonato>;
  buscarAtivos(): Promise<Campeonato[]>;
}
