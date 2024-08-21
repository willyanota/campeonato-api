import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Equipe } from "../../entidades/equipe.entity";
import { RepositorioEquipe } from "../repositorioEquipe";

@Injectable()
export class ExcluidorDeEquipeService {
  constructor(
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
  ) {}

  public async excluir(id: number): Promise<void> {
    const equipe: Equipe = await this.repositorioEquipe.buscarPorId(id);

    if (!equipe) {
      throw new BadRequestException("Equipe não encontrada.");
    }

    await this.repositorioEquipe.excluir(id);
  }
}
