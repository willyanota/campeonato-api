import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCampeonato } from "../../campeonato/repositorioCampeonato";
import { validaIntervalo } from "../../comum/validaIntervalo";
import { Campeonato } from "../../entidades/campeonato.entity";
import { Categoria } from "../../entidades/categoria.entity";
import { CriarCategoriaDTO } from "../dtos/criadorDeCategoria.dto";
import { RepositorioCategoria } from "../repositorioCategoria";

@Injectable()
export class CriadorDeCategoriaService {
  constructor(
    @Inject("RepositorioCategoria")
    private readonly repositorioCategoria: RepositorioCategoria,
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async criar(categoriaDto: CriarCategoriaDTO): Promise<void> {
    validaIntervalo(
      categoriaDto.idadeMinima,
      categoriaDto.idadeMaxima,
      "Intervalo de idades inválido.",
    );

    const campeonato: Campeonato = await this.repositorioCampeonato.buscarPorId(
      categoriaDto.campeonatoId,
    );

    if (!campeonato) {
      throw new BadRequestException(
        "Não é possível adicionar uma categoria sem um campeonato existente.",
      );
    }

    if (!campeonato.estaAtivo) {
      throw new BadRequestException(
        "Não é possível adicionar uma categoria em um campeonato inativo.",
      );
    }

    const categoriaCriada: Categoria = new Categoria({
      ...categoriaDto,
      campeonato: campeonato,
    });

    await this.repositorioCategoria.salvar(categoriaCriada);
  }
}
