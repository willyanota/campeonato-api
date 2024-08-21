import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarCartoesPorJogoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogo é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do jogo está inválido.",
  })
  id: number;
}
