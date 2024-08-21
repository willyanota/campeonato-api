import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fase } from "../../../dominio/entidades/fase.entity";
import { RepositorioFase } from "../../../dominio/fase/repositorioFase";

export class RepositorioORMFase implements RepositorioFase {
  private readonly logger = new Logger(RepositorioORMFase.name);

  constructor(
    @InjectRepository(Fase)
    private readonly repositorioFase: Repository<Fase>,
  ) {}

  public async salvar(fase: Fase): Promise<void> {
    try {
      await this.repositorioFase.save(fase);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar fase no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Fase[]> {
    try {
      return await this.repositorioFase.find({
        where: { categoria: { id: categoriaId } },
        relations: ["categoria", "categoria.campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar fases pelo id da categoria no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Fase> {
    try {
      return await this.repositorioFase.findOne({
        where: { id: id },
        relations: ["categoria", "categoria.campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar a fase no banco de dados.",
      );
    }
  }
}
