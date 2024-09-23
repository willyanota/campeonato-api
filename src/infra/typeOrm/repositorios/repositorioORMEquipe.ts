import { InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Equipe } from "../../../dominio/entidades/equipe.entity";
import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";

export class RepositorioORMEquipe implements RepositorioEquipe {
  private readonly logger = new Logger(RepositorioORMEquipe.name);

  constructor(
    @InjectRepository(Equipe)
    private readonly repositorioEquipe: Repository<Equipe>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  public async salvar(equipe: Equipe): Promise<void> {
    try {
      await this.repositorioEquipe.save(equipe);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao salvar equipe no banco de dados.",
      );
    }
  }

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Equipe[]> {
    try {
      return await this.repositorioEquipe
        .createQueryBuilder("EQU")
        .leftJoinAndSelect("EQU.categoria", "CAT")
        .leftJoinAndSelect("CAT.campeonato", "CAM")
        .where("CAM.id = :campeonatoId", { campeonatoId })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar equipes pelo id do campeonato no banco de dados.",
      );
    }
  }

  public async buscarPorId(id: number): Promise<Equipe> {
    try {
      return await this.repositorioEquipe.findOne({
        where: { id: id },
        relations: ["categoria", "categoria.campeonato", "grupo"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar a equipe no banco de dados.",
      );
    }
  }

  public async excluir(id: number): Promise<void> {
    try {
      await this.repositorioEquipe.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao excluir equipe no banco de dados.",
      );
    }
  }

  public async buscarDosCampeonatosAtivos(): Promise<Equipe[]> {
    try {
      return await this.repositorioEquipe
        .createQueryBuilder("EQU")
        .leftJoinAndSelect("EQU.categoria", "CAT")
        .leftJoinAndSelect("CAT.campeonato", "CAM")
        .where("CAM.ativo = :ativo", { ativo: true })
        .getMany();
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar as equipes no banco de dados.",
      );
    }
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Equipe[]> {
    try {
      return await this.repositorioEquipe.find({
        where: { categoria: { id: categoriaId } },
        relations: ["categoria", "categoria.campeonato"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar as equipes pelo id da categoria no banco de dados.",
      );
    }
  }

  public async buscarPorGrupoId(grupoId: number): Promise<Equipe[]> {
    try {
      const equipes = await this.dataSource.query(
        `SELECT 
        sub.equipeId,
        sub.nome,
        sub.abertura,
        sub.pontos,
        sub.vitorias,
        sub.empates,
        sub.derrotas,
        sub.golsPro,
        sub.golsContra,
        sub.saldoGols,
        LISTAGG(sub.resultado, ', ') WITHIN GROUP (ORDER BY sub.jogoDataHora DESC) AS resultados
        FROM (
          SELECT 
          eq.EQU_ID AS equipeId,
          eq.EQU_NOME AS nome,
          jg.JOG_DATAHORA AS jogoDataHora,
          eq.EQU_ABERTURA AS abertura,
          eq.EQU_PONTOS AS pontos,
          eq.EQU_CONTADORVITORIAS AS vitorias,
          eq.EQU_CONTADOREMPATES AS empates,
          eq.EQU_CONTADORDERROTAS AS derrotas,
          eq.EQU_GOLSPRO AS golsPro,
          eq.EQU_GOLSCONTRA AS golsContra,
          eq.EQU_SALDOGOLS AS saldoGols,
          CASE
            WHEN eq.EQU_ID = jg.EQ1_ID THEN
              CASE
                WHEN (jg.JOG_GOLSREGULAREQ1 + jg.JOG_GOLSPRORROGACAOEQ1 + jg.JOG_GOLSPENALTIEQ1) > 
                    (jg.JOG_GOLSREGULAREQ2 + jg.JOG_GOLSPRORROGACAOEQ2 + jg.JOG_GOLSPENALTIEQ2) THEN 'Vitória'
                WHEN (jg.JOG_GOLSREGULAREQ1 + jg.JOG_GOLSPRORROGACAOEQ1 + jg.JOG_GOLSPENALTIEQ1) = 
                    (jg.JOG_GOLSREGULAREQ2 + jg.JOG_GOLSPRORROGACAOEQ2 + jg.JOG_GOLSPENALTIEQ2) THEN 'Empate'
                ELSE 'Derrota'
              END
            WHEN eq.EQU_ID = jg.EQ2_ID THEN
              CASE
                WHEN (jg.JOG_GOLSREGULAREQ2 + jg.JOG_GOLSPRORROGACAOEQ2 + jg.JOG_GOLSPENALTIEQ2) > 
                    (jg.JOG_GOLSREGULAREQ1 + jg.JOG_GOLSPRORROGACAOEQ1 + jg.JOG_GOLSPENALTIEQ1) THEN 'Vitória'
                WHEN (jg.JOG_GOLSREGULAREQ2 + jg.JOG_GOLSPRORROGACAOEQ2 + jg.JOG_GOLSPENALTIEQ2) = 
                    (jg.JOG_GOLSREGULAREQ1 + jg.JOG_GOLSPRORROGACAOEQ1 + jg.JOG_GOLSPENALTIEQ1) THEN 'Empate'
                ELSE 'Derrota'
              END
          END AS resultado,
          ROW_NUMBER() OVER (PARTITION BY eq.EQU_ID ORDER BY jg.JOG_DATAHORA DESC) AS rn
          FROM PUBLIC.TB_EQUIPE eq
          LEFT JOIN PUBLIC.TB_JOGO jg ON jg.EQ1_ID = eq.EQU_ID OR jg.EQ2_ID = eq.EQU_ID
          WHERE eq.GRU_ID = ${grupoId}
        ) sub
        WHERE sub.rn <= 3
        GROUP BY sub.equipeId, 
        sub.nome, 
        sub.abertura,
        sub.pontos,
        sub.vitorias,
        sub.empates,
        sub.derrotas,
        sub.golsPro,
        sub.golsContra,
        sub.saldoGols
        `,
      );

      return equipes.map((equipe) => ({
        id: equipe.EQUIPEID,
        nome: equipe.NOME,
        abertura: equipe.ABERTURA === 1,
        pontos: equipe.PONTOS,
        contadorDeVitorias: equipe.VITORIAS,
        contadorDeEmpates: equipe.EMPATES,
        contadorDeDerrotas: equipe.DERROTAS,
        golsPro: equipe.GOLSPRO,
        golsContra: equipe.GOLSCONTRA,
        saldoDeGols: equipe.SALDOGOLS,
        resultados: equipe.RESULTADOS,
      }));
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar as equipes pelo id do grupo no banco de dados.",
      );
    }
  }

  public async buscarDoGrupo(grupoId: number): Promise<Equipe[]> {
    try {
      return await this.repositorioEquipe.find({
        where: { grupo: { id: grupoId } },
        relations: ["grupo", "categoria"],
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        "Erro ao buscar as equipes do grupo no banco de dados.",
      );
    }
  }
}
