import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class EditarGrupoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo grupo é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do grupo está inválido." })
  id: number;

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
