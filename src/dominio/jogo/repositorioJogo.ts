import { Jogo } from "../entidades/jogo.entity";

export interface RepositorioJogo {
  salvar(jogo: Jogo): Promise<void>;
  buscarPorCampeonatoId(campeonatoId: number): Promise<Jogo[]>;
  buscarPorId(id: number): Promise<Jogo>;
  buscarTodos(): Promise<Jogo[]>;
  buscarPorData(data: string): Promise<Jogo[]>;
  buscarPorFaseId(faseId: number): Promise<Jogo[]>;
  buscarPorCategoriaId(categoriaId: number): Promise<Jogo[]>;
}
