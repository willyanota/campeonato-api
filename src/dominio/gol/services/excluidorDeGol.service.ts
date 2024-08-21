import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Gol } from "../../entidades/gol.entity";
import { RepositorioGol } from "../repositorioGol";

@Injectable()
export class ExcluidorDeGolService {
  constructor(
    @Inject("RepositorioGol") private readonly repositorioGol: RepositorioGol,
  ) {}

  public async excluir(id: number): Promise<void> {
    const gol: Gol = await this.repositorioGol.buscarPorId(id);

    if (!gol) {
      throw new BadRequestException("Gol não encontrado.");
    }

    await this.repositorioGol.excluir(id);
  }
}
