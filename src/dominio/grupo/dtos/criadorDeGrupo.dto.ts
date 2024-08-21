import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CriarGrupoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo fase é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da fase está inválido." })
  faseId: number;

  @ApiProperty()
  @IsString({ message: "Campo nome deve ser um texto." })
  @Length(1, 30, { message: "Campo nome é obrigatório. (Máx. 30 caracteres)" })
  nome: string;

  @ApiProperty()
  @IsString({ message: "Campo observação deve ser um texto." })
  @Length(1, 1000, {
    message: "Campo observação é obrigatório. (Máx. 1000 caracteres)",
  })
  observacao: string;
}
