import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";
import { IsDataString } from "../../comum/customClassValidator/dataString.validator";

export class BuscarJogosPeloCampeonatoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo campeonato é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do campeonato está inválido.",
  })
  id: number;
}

export class BuscarJogosPorDataDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo data é obrigatório." })
  @IsDataString({ message: "Data inválida." })
  data: string;
}

export class BuscarJogosPorFaseIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo fase é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da fase está inválido.",
  })
  id: number;
}

export class BuscarJogosPorCategoriaIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da categoria está inválido.",
  })
  id: number;
}
