import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarJogadoresPorEquipeIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo equipe é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da equipe está inválido.",
  })
  id: number;
}

export class BuscarJogadoresPorCategoriaIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da categoria está inválido.",
  })
  id: number;
}
