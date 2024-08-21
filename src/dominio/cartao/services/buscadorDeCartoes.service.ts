import { Inject, Injectable } from "@nestjs/common";
import { Cartao } from "../../entidades/cartao.entity";
import { RepositorioCartao } from "../repositorioCartao";

@Injectable()
export class BuscadorDeCartoesService {
  constructor(
    @Inject("RepositorioCartao")
    private readonly repositorioCartao: RepositorioCartao,
  ) {}

  public async buscarPorJogoId(jogoId: number): Promise<Cartao[]> {
    return await this.repositorioCartao.buscarPorJogoId(jogoId);
  }
}
