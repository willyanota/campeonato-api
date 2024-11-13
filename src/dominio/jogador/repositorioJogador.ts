import { Jogador } from "../entidades/jogador.entity";

export interface RepositorioJogador {
  salvar(jogador: Jogador): Promise<void>;
  buscarPorEquipeId(equipeId: number): Promise<Jogador[]>;
  buscarPorId(id: number): Promise<Jogador>;
  contarAtivosDaEquipe(equipeId: number): Promise<number>;
  buscarPorCategoriaId(categoriaId: number): Promise<Jogador[]>;
  buscarPorCpfNaEquipe(cpf: string, equipeId: number): Promise<Jogador>;
}
