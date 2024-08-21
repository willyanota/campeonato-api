import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarCategoriasPeloCampeonatoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo campeonato é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do campeonato está inválido.",
  })
  id: number;
}
