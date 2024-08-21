import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Gol } from "../../../dominio/entidades/gol.entity";
import { RepositorioGol } from "../../../dominio/gol/repositorioGol";

export class RepositorioORMGol implements RepositorioGol {
  private readonly logger = new Logger(RepositorioORMGol.name);

  constructor(
    @InjectRepository(Gol) private readonly repositorioGol: Repository<Gol>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  public async salvar(gol: Gol): Promise<void> {
    try {
      await this.repositorioGol.save(gol);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar gol no banco de dados.",
      );
    }
  }

  public async buscarPorJogoId(jogoId: number): Promise<Gol[]> {
    try {
      return await this.repositorioGol.find({
        where: { jogo: { id: jogoId } },
        relations: ["jogo", "jogador", "jogador.equipe"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar gols no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Gol> {
    try {
      return await this.repositorioGol.findOne({
        where: { id: id },
        relations: ["jogo", "jogador", "jogador.equipe"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar o gol no banco de dados.",
      );
    }
  }

  public async excluir(id: number): Promise<void> {
    try {
      await this.repositorioGol.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao excluir gol no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Gol[]> {
    try {
      const golsPorJogador = await this.dataSource.query(
        `SELECT GOL.JGD_ID AS jogadorId, JGD.JGD_NOME AS jogadorNome, COUNT(*) AS numeroGols
        FROM PUBLIC.TB_GOL GOL
        LEFT JOIN PUBLIC.TB_JOGADOR JGD ON JGD.JGD_ID = GOL.JGD_ID
        LEFT JOIN PUBLIC.TB_JOGO JOG ON JOG.JOG_ID = GOL.JOG_ID
        LEFT JOIN PUBLIC.TB_FASE FAS ON FAS.FAS_ID = JOG.FAS_ID
        LEFT JOIN PUBLIC.TB_CATEGORIA CAT ON CAT.CAT_ID = FAS.CAT_ID
        WHERE CAT.CAT_ID = ${categoriaId} AND GOL.GOL_GOLCONTRA = 0
        GROUP BY GOL.JGD_ID, JGD.JGD_NOME
        ORDER BY numeroGols DESC`,
      );

      return golsPorJogador.map((gols) => ({
        jogadorId: gols.JOGADORID,
        jogadorNome: gols.JOGADORNOME,
        numeroGols: gols.NUMEROGOLS,
      }));
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar gols no banco de dados.",
      );
    }
  }
}
