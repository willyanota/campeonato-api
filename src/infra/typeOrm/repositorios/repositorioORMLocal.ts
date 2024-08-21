import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Local } from "../../../dominio/entidades/local.entity";
import { RepositorioLocal } from "../../../dominio/local/repositorioLocal";

export class RepositorioORMLocal implements RepositorioLocal {
  private readonly logger = new Logger(RepositorioORMLocal.name);

  constructor(
    @InjectRepository(Local)
    private readonly repositorioLocal: Repository<Local>,
  ) {}

  public async salvar(local: Local): Promise<void> {
    try {
      await this.repositorioLocal.save(local);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar local no banco de dados.",
      );
    }
  }

  public async buscarTodos(): Promise<Local[]> {
    try {
      return await this.repositorioLocal.find({
        relations: ["campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar locais no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Local> {
    try {
      return await this.repositorioLocal.findOne({
        where: { id: id },
        relations: ["campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar o local no banco de dados.",
      );
    }
  }

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Local[]> {
    try {
      return await this.repositorioLocal.find({
        where: { campeonato: { id: campeonatoId } },
        relations: ["campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar os locais no banco de dados.",
      );
    }
  }
}
