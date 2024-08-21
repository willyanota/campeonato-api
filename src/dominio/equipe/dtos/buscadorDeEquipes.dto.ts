import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class BuscarEquipesPorCampeonatoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo campeonato é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do campeonato está inválido.",
  })
  id: number;
}

export class BuscarEquipesPorCategoriaIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da categoria está inválido.",
  })
  id: number;
}

export class BuscarEquipesPorGrupoIdDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo grupo é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do grupo está inválido.",
  })
  id: number;
}
