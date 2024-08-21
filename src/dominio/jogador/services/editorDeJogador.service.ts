import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Jogador } from "../../entidades/jogador.entity";
import { EnvioDeArquivoMinioService } from "../../minio-client/envioDeArquivoMinio.service";
import { EditarJogadorDTO } from "../dtos/editorDeJogador.dto";
import { RepositorioJogador } from "../repositorioJogador";

@Injectable()
export class EditorDeJogadorService {
  private readonly MAX_FILE_SIZE_MB = 2;

  constructor(
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
    private readonly envioDeArquivoMinio: EnvioDeArquivoMinioService,
  ) {}

  public async editar(
    jogadorDto: EditarJogadorDTO,
    image: Express.Multer.File,
  ): Promise<void> {
    const jogador: Jogador = await this.repositorioJogador.buscarPorId(
      jogadorDto.id,
    );

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    if (image) {
      if (
        !(
          image.mimetype.includes("jpeg") ||
          image.mimetype.includes("png") ||
          image.mimetype.includes("jpg")
        )
      ) {
        throw new BadRequestException("Tipo de arquivo não suportado.");
      }

      const fileSizeMB = image.size / (1024 * 1024); // Converter para MB
      if (fileSizeMB > this.MAX_FILE_SIZE_MB) {
        throw new BadRequestException(
          "O tamanho do arquivo excede o limite permitido.",
        );
      }

      const foto = await this.envioDeArquivoMinio.enviar(image);

      jogador.foto = foto.url;
    }

    const jogadorEditado: Jogador = new Jogador({
      ...jogador,
      ehGoleiro: jogadorDto.ehGoleiro ?? jogador.ehGoleiro,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogador.salvar(jogadorEditado);
  }
}
