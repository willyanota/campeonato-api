import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { validaIntervalo } from "../../comum/validaIntervalo";
import { Categoria } from "../../entidades/categoria.entity";
import { EditarCategoriaDTO } from "../dtos/editorDeCategoria.dto";
import { RepositorioCategoria } from "../repositorioCategoria";

@Injectable()
export class EditorDeCategoriaService {
  constructor(
    @Inject("RepositorioCategoria")
    private readonly repositorioCategoria: RepositorioCategoria,
  ) {}

  public async editar(categoriaDto: EditarCategoriaDTO): Promise<void> {
    validaIntervalo(
      categoriaDto.idadeMinima,
      categoriaDto.idadeMaxima,
      "Intervalo de idades inválido.",
    );

    const categoria: Categoria = await this.repositorioCategoria.buscarPorId(
      categoriaDto.id,
    );

    if (!categoria) {
      throw new BadRequestException("Categoria não encontrada.");
    }

    if (!categoria.possuiCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar uma categoria de um campeonato inativo.",
      );
    }

    const categoriaEditada: Categoria = new Categoria({
      ...categoria,
      genero: categoriaDto.genero || categoria.genero,
      nome: categoriaDto.nome || categoria.nome,
      idadeMinima: categoriaDto.idadeMinima || categoria.idadeMinima,
      idadeMaxima: categoriaDto.idadeMaxima || categoria.idadeMaxima,
      maxJogadoresAtivos:
        categoriaDto.maxJogadoresAtivos || categoria.maxJogadoresAtivos,
      maxJogadoresDependentes:
        categoriaDto.maxJogadoresDependentes ||
        categoria.maxJogadoresDependentes,
      goleiroForaIdade:
        categoriaDto.goleiroForaIdade ?? categoria.goleiroForaIdade,
      maxCartoesVermelhosPorJogo:
        categoriaDto.maxCartoesVermelhosPorJogo ||
        categoria.maxCartoesVermelhosPorJogo,
      maxHorasInscricaoJogador:
        categoriaDto.maxHorasInscricaoJogador ||
        categoria.maxHorasInscricaoJogador,
      dataAtualizacao: new Date(),
    });

    await this.repositorioCategoria.salvar(categoriaEditada);
  }
}
