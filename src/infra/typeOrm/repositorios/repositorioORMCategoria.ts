import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositorioCategoria } from "../../../dominio/categoria/repositorioCategoria";
import { Categoria } from "../../../dominio/entidades/categoria.entity";

export class RepositorioORMCategoria implements RepositorioCategoria {
  private readonly logger = new Logger(RepositorioORMCategoria.name);

  constructor(
    @InjectRepository(Categoria)
    private readonly repositorioCategoria: Repository<Categoria>,
  ) {}

  public async salvar(categoria: Categoria): Promise<void> {
    try {
      await this.repositorioCategoria.save(categoria);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar categoria no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Categoria> {
    try {
      return await this.repositorioCategoria.findOne({
        where: { id: id },
        relations: ["campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar a categoria no banco de dados.",
      );
    }
  }

  public async buscarPorCampeonatoId(
    campeonatoId: number,
  ): Promise<Categoria[]> {
    try {
      return await this.repositorioCategoria.find({
        where: { campeonato: { id: campeonatoId } },
        relations: ["campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar as categorias no banco de dados.",
      );
    }
  }
}
