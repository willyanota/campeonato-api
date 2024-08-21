import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class ExcluirCartaoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo cartão é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do cartão está inválida.",
  })
  id: number;
}
