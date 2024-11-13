import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { Repository } from "typeorm";
import { Jogador } from "../../../dominio/entidades/jogador.entity";

export class RepositorioORMJogador implements RepositorioJogador {
  private readonly logger = new Logger(RepositorioORMJogador.name);

  constructor(
    @InjectRepository(Jogador)
    private readonly repositorioJogador: Repository<Jogador>,
  ) {}

  public async salvar(jogador: Jogador): Promise<void> {
    try {
      await this.repositorioJogador.save(jogador);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar jogador no banco de dados.",
      );
    }
  }

  public async buscarPorEquipeId(equipeId: number): Promise<Jogador[]> {
    try {
      return await this.repositorioJogador.find({
        where: { equipe: { id: equipeId } },
        relations: [
          "equipe",
          "equipe.categoria",
          "equipe.categoria.campeonato",
        ],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogadores pelo id da equipe no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Jogador> {
    try {
      return await this.repositorioJogador.findOne({
        where: { id: id },
        relations: [
          "equipe",
          "equipe.categoria",
          "equipe.categoria.campeonato",
        ],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar o jogador no banco de dados.",
      );
    }
  }

  public async contarAtivosDaEquipe(equipeId: number): Promise<number> {
    try {
      return await this.repositorioJogador.count({
        where: { equipe: { id: equipeId }, ativo: true },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro na contagem de jogadores ativos no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Jogador[]> {
    try {
      return await this.repositorioJogador
        .createQueryBuilder("JGD")
        .leftJoinAndSelect("JGD.equipe", "EQU")
        .leftJoinAndSelect("EQU.categoria", "CAT")
        .where("CAT.id = :categoriaId", { categoriaId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogadores pelo id da categoria no banco de dados.",
      );
    }
  }

  public async buscarPorCpfNaEquipe(
    cpf: string,
    equipeId: number,
  ): Promise<Jogador> {
    try {
      return await this.repositorioJogador.findOne({
        where: { cpf: cpf, equipe: { id: equipeId } },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogador na equipe no banco de dados.",
      );
    }
  }
}
