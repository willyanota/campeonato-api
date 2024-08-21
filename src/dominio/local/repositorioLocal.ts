import { Local } from "../entidades/local.entity";

export interface RepositorioLocal {
  salvar(local: Local): Promise<void>;
  buscarTodos(): Promise<Local[]>;
  buscarPorId(id: number): Promise<Local>;
  buscarPorCampeonatoId(campeonatoId: number): Promise<Local[]>;
}
