import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositorioCartao } from "../../../dominio/cartao/repositorioCartao";
import { Cartao } from "../../../dominio/entidades/cartao.entity";

export class RepositorioORMCartao implements RepositorioCartao {
  private readonly logger = new Logger(RepositorioORMCartao.name);

  constructor(
    @InjectRepository(Cartao)
    private readonly repositorioCartao: Repository<Cartao>,
  ) {}

  public async salvar(cartao: Cartao): Promise<void> {
    try {
      await this.repositorioCartao.save(cartao);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar cartão no banco de dados.",
      );
    }
  }

  public async buscarPorJogoId(jogoId: number): Promise<Cartao[]> {
    try {
      return await this.repositorioCartao.find({
        where: { jogo: { id: jogoId } },
        relations: ["jogo", "jogador", "jogador.equipe"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar cartões no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Cartao> {
    try {
      return await this.repositorioCartao.findOne({
        where: { id: id },
        relations: ["jogo", "jogador", "jogador.equipe"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar cartão no banco de dados.",
      );
    }
  }

  public async excluir(id: number): Promise<void> {
    try {
      await this.repositorioCartao.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao excluir cartão no banco de dados.",
      );
    }
  }

  public async contarNumeroDeCartoesDoJogadorNoJogo(
    jogoId: number,
    jogadorId: number,
    tipo: string,
  ): Promise<number> {
    try {
      return await this.repositorioCartao.count({
        where: { jogo: { id: jogoId }, jogador: { id: jogadorId }, tipo: tipo },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro na contagem de cartões no jogo no banco de dados.",
      );
    }
  }
}
