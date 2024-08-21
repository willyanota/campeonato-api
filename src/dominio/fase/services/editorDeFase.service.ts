import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Fase } from "../../entidades/fase.entity";
import { EditarFaseDTO } from "../dtos/editorDeFase.dto";
import { RepositorioFase } from "../repositorioFase";

@Injectable()
export class EditorDeFaseService {
  constructor(
    @Inject("RepositorioFase")
    private readonly repositorioFase: RepositorioFase,
  ) {}

  public async editar(faseDto: EditarFaseDTO): Promise<void> {
    const fase: Fase = await this.repositorioFase.buscarPorId(faseDto.id);

    if (!fase) {
      throw new BadRequestException("Fase não encontrada.");
    }

    if (!fase.possuiCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar uma fase com uma categoria de um campeonato inativo.",
      );
    }

    const faseEditada: Fase = new Fase({
      ...fase,
      nome: faseDto.nome || fase.nome,
      ehGrupo: faseDto.ehGrupo ?? fase.ehGrupo,
      temProrrogacao: faseDto.temProrrogacao ?? fase.temProrrogacao,
      temPenalti: faseDto.temPenalti ?? fase.temPenalti,
      quantidadeClassificados:
        faseDto.quantidadeClassificados || fase.quantidadeClassificados,
      dataAtualizacao: new Date(),
    });

    await this.repositorioFase.salvar(faseEditada);
  }
}
