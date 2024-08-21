import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class ExcluirGolDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo gol é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do gol está inválida.",
  })
  id: number;
}
