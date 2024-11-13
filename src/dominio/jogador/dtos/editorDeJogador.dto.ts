import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumberString } from "class-validator";

export class EditarJogadorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do jogador está inválido.",
  })
  id: number;

  @ApiProperty()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  ehGoleiro: boolean;
}
