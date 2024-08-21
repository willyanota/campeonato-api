import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositorioCampeonato } from "../../../dominio/campeonato/repositorioCampeonato";
import { Campeonato } from "../../../dominio/entidades/campeonato.entity";

export class RepositorioORMCampeonato implements RepositorioCampeonato {
  private readonly logger = new Logger(RepositorioORMCampeonato.name);

  constructor(
    @InjectRepository(Campeonato)
    private readonly repositorioCampeonato: Repository<Campeonato>,
  ) {}

  public async salvar(campeonato: Campeonato): Promise<void> {
    try {
      await this.repositorioCampeonato.save(campeonato);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar campeonato no banco de dados.",
      );
    }
  }

  public async buscarTodos(): Promise<Campeonato[]> {
    try {
      return await this.repositorioCampeonato.find({
        order: { dataCriacao: "DESC" },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar campeonatos no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Campeonato> {
    try {
      return await this.repositorioCampeonato.findOne({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar campeonato pelo id no banco de dados.",
      );
    }
  }

  public async buscarAtivos(): Promise<Campeonato[]> {
    try {
      return await this.repositorioCampeonato
        .createQueryBuilder("CAM")
        .where("CAM.ativo = :ativo", { ativo: true })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar campeonatos ativos no banco de dados.",
      );
    }
  }
}
