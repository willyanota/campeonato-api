import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCategoria } from "../../categoria/repositorioCategoria";
import { Categoria } from "../../entidades/categoria.entity";
import { Equipe } from "../../entidades/equipe.entity";
import { CriarEquipeDTO } from "../dtos/criadorDeEquipe.dto";
import { RepositorioEquipe } from "../repositorioEquipe";

@Injectable()
export class CriadorDeEquipeService {
  constructor(
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
    @Inject("RepositorioCategoria")
    private readonly repositorioCategoria: RepositorioCategoria,
  ) {}

  public async criar(equipeDto: CriarEquipeDTO): Promise<void> {
    const categoria: Categoria = await this.repositorioCategoria.buscarPorId(
      equipeDto.categoriaId,
    );

    if (!categoria) {
      throw new BadRequestException(
        "Não é possível adicionar uma equipe com uma categoria inexistente.",
      );
    }

    if (!categoria.possuiCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível adicionar uma equipe com uma categoria de um campeonato inativo.",
      );
    }

    let pontos = 0;

    if (equipeDto.abertura) {
      pontos += 2;
    }

    const equipeCriada: Equipe = new Equipe({
      ...equipeDto,
      categoria: categoria,
      pontos: pontos,
      contadorDeVitorias: 0,
      contadorDeEmpates: 0,
      contadorDeDerrotas: 0,
      golsPro: 0,
      golsContra: 0,
      saldoDeGols: 0,
    });

    await this.repositorioEquipe.salvar(equipeCriada);
  }
}
