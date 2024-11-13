import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioEquipe } from "src/dominio/equipe/repositorioEquipe";
import { Equipe } from "../../entidades/equipe.entity";
import { Jogador } from "../../entidades/jogador.entity";
import { EnvioDeArquivoMinioService } from "../../minio-client/envioDeArquivoMinio.service";
import { CriarJogadorDTO } from "../dtos/criadorDeJogador.dto";
import { RepositorioJogador } from "../repositorioJogador";

@Injectable()
export class CriadorDeJogadorService {
  private readonly MAX_FILE_SIZE_MB = 2;

  constructor(
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
    private readonly envioDeFotoMinio: EnvioDeArquivoMinioService,
  ) {}

  public async criar(
    jogadorDto: CriarJogadorDTO,
    image: Express.Multer.File,
  ): Promise<void> {
    const equipe: Equipe = await this.repositorioEquipe.buscarPorId(
      jogadorDto.equipeId,
    );

    const jogadoresAtivos: number =
      await this.repositorioJogador.contarAtivosDaEquipe(jogadorDto.equipeId);

    if (jogadoresAtivos >= 20) {
      throw new BadRequestException(
        "O limite máximo de jogadores ativos foi atingido. (Máx. 20 jogadores ativos)",
      );
    }

    if (!equipe) {
      throw new BadRequestException(
        "Não é possível adicionar um jogador sem equipe existente.",
      );
    }

    const jogador: Jogador = await this.repositorioJogador.buscarPorCpfNaEquipe(
      jogadorDto.cpf,
      jogadorDto.equipeId,
    );

    if (jogador) {
      throw new BadRequestException("Jogador já cadastrado na equipe.");
    }

    if (
      !(
        image.mimetype.includes("jpeg") ||
        image.mimetype.includes("png") ||
        image.mimetype.includes("jpg")
      )
    ) {
      throw new BadRequestException("Tipo de arquivo não suportado.");
    }

    if (
      (jogadorDto.ehGoleiro &&
        !equipe.categoria.goleiroForaIdade &&
        (jogadorDto.idade < equipe.categoria.idadeMinima ||
          jogadorDto.idade > equipe.categoria.idadeMaxima)) ||
      (!jogadorDto.ehGoleiro &&
        (jogadorDto.idade < equipe.categoria.idadeMinima ||
          jogadorDto.idade > equipe.categoria.idadeMaxima))
    ) {
      throw new BadRequestException(
        `Jogador fora do intervalo de idades da categoria. Permitido: ${equipe.categoria.idadeMinima} a ${equipe.categoria.idadeMaxima} anos.`,
      );
    }

    const fileSizeMB = image.size / (1024 * 1024); // Converter para MB
    if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
      throw new BadRequestException(
        "O tamanho do arquivo excede o limite permitido.",
      );
    }

    const foto = await this.envioDeFotoMinio.enviar(image);

    const jogadorCriado: Jogador = new Jogador({
      ...jogadorDto,
      equipe: equipe,
      foto: foto.url,
      ativo: true,
      suspenso: false,
      rodadaSuspenso: null,
      contadorDeRodadasSuspenso: 0,
      contadorDeCartoesAmarelos: 0,
      contadorDeCartoesVermelhos: 0,
    });

    await this.repositorioJogador.salvar(jogadorCriado);
  }
}
