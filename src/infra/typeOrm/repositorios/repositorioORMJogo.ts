import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { Repository } from "typeorm";
import { Jogo } from "../../../dominio/entidades/jogo.entity";

export class RepositorioORMJogo implements RepositorioJogo {
  private readonly logger = new Logger(RepositorioORMJogo.name);

  constructor(
    @InjectRepository(Jogo)
    private readonly repositorioJogo: Repository<Jogo>,
  ) {}

  public async salvar(jogo: Jogo): Promise<void> {
    try {
      await this.repositorioJogo.save(jogo);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar jogo no banco de dados.",
      );
    }
  }

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Jogo[]> {
    try {
      return await this.repositorioJogo
        .createQueryBuilder("JOG")
        .leftJoinAndSelect("JOG.fase", "FAS")
        .leftJoinAndSelect("FAS.categoria", "CAT")
        .leftJoinAndSelect("CAT.campeonato", "CAM")
        .leftJoinAndSelect("JOG.equipe1", "EQ1")
        .leftJoinAndSelect("JOG.equipe2", "EQ2")
        .leftJoinAndSelect("JOG.local", "LOC")
        .where("CAM.id = :campeonatoId", { campeonatoId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogos pelo id do campeonato no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Jogo> {
    try {
      return await this.repositorioJogo.findOne({
        where: { id: id },
        relations: [
          "fase",
          "fase.categoria",
          "fase.categoria.campeonato",
          "equipe1",
          "equipe1.categoria",
          "equipe1.categoria.campeonato",
          "equipe2",
          "equipe2.categoria",
          "equipe2.categoria.campeonato",
          "local",
          "local.campeonato",
        ],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar o jogo no banco de dados.",
      );
    }
  }

  public async buscarTodos(): Promise<Jogo[]> {
    try {
      return await this.repositorioJogo.find({
        relations: [
          "fase",
          "fase.categoria",
          "fase.categoria.campeonato",
          "equipe1",
          "equipe1.categoria",
          "equipe1.categoria.campeonato",
          "equipe2",
          "equipe2.categoria",
          "equipe2.categoria.campeonato",
          "local",
          "local.campeonato",
        ],
        order: { dataHora: "DESC" },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogos no banco de dados.",
      );
    }
  }

  public async buscarPorData(data: string): Promise<Jogo[]> {
    try {
      return await this.repositorioJogo
        .createQueryBuilder("JOG")
        .leftJoinAndSelect("JOG.fase", "FAS")
        .leftJoinAndSelect("FAS.categoria", "CAT")
        .leftJoinAndSelect("CAT.campeonato", "CAM")
        .leftJoinAndSelect("JOG.equipe1", "EQ1")
        .leftJoinAndSelect("EQ1.categoria", "CAT1")
        .leftJoinAndSelect("CAT1.campeonato", "CAM1")
        .leftJoinAndSelect("JOG.equipe2", "EQ2")
        .leftJoinAndSelect("EQ2.categoria", "CAT2")
        .leftJoinAndSelect("CAT2.campeonato", "CAM2")
        .leftJoinAndSelect("JOG.local", "LOC")
        .leftJoinAndSelect("LOC.campeonato", "CAM3")
        .where(`TRUNC(JOG.dataHora) = TO_DATE(:data, 'DD-MM-YYYY')`, {
          data,
        })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar os jogos no banco de dados.",
      );
    }
  }

  public async buscarPorFaseId(faseId: number): Promise<Jogo[]> {
    try {
      return await this.repositorioJogo.find({
        where: { fase: { id: faseId } },
        relations: ["fase", "fase.categoria", "equipe1", "equipe2"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar os jogos pelo id da fase no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Jogo[]> {
    try {
      return await this.repositorioJogo
        .createQueryBuilder("JOG")
        .leftJoinAndSelect("JOG.fase", "FAS")
        .leftJoinAndSelect("FAS.categoria", "CAT")
        .leftJoinAndSelect("JOG.equipe1", "EQ1")
        .leftJoinAndSelect("JOG.equipe2", "EQ2")
        .where("CAT.id = :categoriaId", { categoriaId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar jogos pelo id da categoria no banco de dados.",
      );
    }
  }
}
