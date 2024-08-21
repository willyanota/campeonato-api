import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class ExcluirEquipeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo equipe é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da equipe está inválida.",
  })
  id: number;
}
