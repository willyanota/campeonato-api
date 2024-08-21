import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { Gol } from "../../entidades/gol.entity";
import { Jogador } from "../../entidades/jogador.entity";
import { Jogo } from "../../entidades/jogo.entity";
import { CriarGolDTO } from "../dtos/criadorDeGol.dto";
import { RepositorioGol } from "../repositorioGol";

@Injectable()
export class CriadorDeGolService {
  constructor(
    @Inject("RepositorioGol") private readonly repositorioGol: RepositorioGol,
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
  ) {}

  public async criar(golDto: CriarGolDTO): Promise<void> {
    const jogo: Jogo = await this.repositorioJogo.buscarPorId(golDto.jogoId);

    if (!jogo) {
      throw new BadRequestException(
        "Não é possível adicionar um gol com um jogo inexistente.",
      );
    }

    const jogador: Jogador = await this.repositorioJogador.buscarPorId(
      golDto.jogadorId,
    );

    if (!jogador) {
      throw new BadRequestException(
        "Não é possível adicionar um gol com um jogador inexistente.",
      );
    }

    const golCriado: Gol = new Gol({
      ...golDto,
      jogo: jogo,
      jogador: jogador,
    });

    await this.repositorioGol.salvar(golCriado);
  }
}
