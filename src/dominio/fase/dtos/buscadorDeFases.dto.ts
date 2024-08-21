import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarFasesPorCategoriaIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da categoria está inválido",
  })
  id: number;
}
