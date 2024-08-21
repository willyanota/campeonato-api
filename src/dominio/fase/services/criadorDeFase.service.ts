import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCategoria } from "../../categoria/repositorioCategoria";
import { Categoria } from "../../entidades/categoria.entity";
import { Fase } from "../../entidades/fase.entity";
import { CriarFaseDTO } from "../dtos/criadorDeFase.dto";
import { RepositorioFase } from "../repositorioFase";

@Injectable()
export class CriadorDeFaseService {
  constructor(
    @Inject("RepositorioFase")
    private readonly repositorioFase: RepositorioFase,
    @Inject("RepositorioCategoria")
    private readonly repositorioCategoria: RepositorioCategoria,
  ) {}

  public async criar(faseDto: CriarFaseDTO): Promise<void> {
    const categoria: Categoria = await this.repositorioCategoria.buscarPorId(
      faseDto.categoriaId,
    );

    if (!categoria) {
      throw new BadRequestException(
        "Não é possível adicionar uma fase com uma categoria inexistente.",
      );
    }

    if (!categoria.possuiCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível adicionar uma fase com uma categoria de um campeonato inativo.",
      );
    }

    const faseCriada: Fase = new Fase({ ...faseDto, categoria: categoria });

    await this.repositorioFase.salvar(faseCriada);
  }
}
