import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grupo } from "../../../dominio/entidades/grupo.entity";
import { RepositorioGrupo } from "../../../dominio/grupo/repositorioGrupo";

export class RepositorioORMGrupo implements RepositorioGrupo {
  private readonly logger = new Logger(RepositorioORMGrupo.name);

  constructor(
    @InjectRepository(Grupo)
    private readonly repositorioGrupo: Repository<Grupo>,
  ) {}

  public async salvar(grupo: Grupo): Promise<void> {
    try {
      await this.repositorioGrupo.save(grupo);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar grupo no banco de dados.",
      );
    }
  }

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Grupo[]> {
    try {
      return await this.repositorioGrupo
        .createQueryBuilder("GRU")
        .leftJoinAndSelect("GRU.fase", "FAS")
        .leftJoinAndSelect("FAS.categoria", "CAT")
        .leftJoinAndSelect("CAT.campeonato", "CAM")
        .where("CAM.id = :campeonatoId", { campeonatoId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar grupos pelo id do campeonato no banco de dados.",
      );
    }
  }

  public async buscarTodos(): Promise<Grupo[]> {
    try {
      return await this.repositorioGrupo.find({
        relations: ["fase", "fase.categoria", "fase.categoria.campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar grupos no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Grupo> {
    try {
      return await this.repositorioGrupo.findOne({
        where: { id: id },
        relations: ["fase", "fase.categoria", "fase.categoria.campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar grupo no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Grupo[]> {
    try {
      return await this.repositorioGrupo
        .createQueryBuilder("GRU")
        .leftJoinAndSelect("GRU.fase", "FAS")
        .leftJoinAndSelect("FAS.categoria", "CAT")
        .where("CAT.id = :categoriaId", { categoriaId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar grupos pelo id da categoria no banco de dados.",
      );
    }
  }
}
