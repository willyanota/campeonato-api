import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNotEmpty, IsNumberString } from "class-validator";

export class EditarJogadorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do jogador está inválido.",
  })
  id: number;

  @ApiProperty()
  @IsBooleanString()
  ehGoleiro: boolean;
}
