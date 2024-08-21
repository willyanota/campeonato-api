import { Cartao } from "../entidades/cartao.entity";

export interface RepositorioCartao {
  salvar(cartao: Cartao): Promise<void>;
  buscarPorJogoId(jogoId: number): Promise<Cartao[]>;
  buscarPorId(id: number): Promise<Cartao>;
  excluir(id: number): Promise<void>;
  contarNumeroDeCartoesDoJogadorNoJogo(
    jogoId: number,
    jogadorId: number,
    tipo: string,
  ): Promise<number>;
}
