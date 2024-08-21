import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarGolsPorJogoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogo é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do jogo está inválido.",
  })
  id: number;
}

export class BuscarGolsPorCategoriaIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da categoria está inválido.",
  })
  id: number;
}
