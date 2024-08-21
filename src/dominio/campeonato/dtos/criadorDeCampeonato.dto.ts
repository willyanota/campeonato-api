import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class CriarCampeonatoDTO {
  @ApiProperty()
  @Length(1, 60, { message: "Campo nome é obrigatório. (Máx. 60 caracteres)" })
  @IsString({ message: "Campo nome deve ser um texto." })
  nome: string;

  @ApiProperty()
  @IsDateString(undefined, {
    message: "Campo início do campeonato deve ser uma data.",
  })
  @IsNotEmpty({ message: "Campo início do campeonato é obrigatório." })
  dataInicio: Date;

  @ApiProperty()
  @IsDateString(undefined, {
    message: "Campo fim do campeonato deve ser uma data.",
  })
  @IsNotEmpty({ message: "Campo fim do campeonato é obrigatório." })
  dataFim: Date;

  @ApiProperty()
  @IsDateString(undefined, {
    message: "Campo início das inscrições deve ser uma data.",
  })
  @IsNotEmpty({ message: "Campo início das inscrições é obrigatório." })
  inscricaoDataInicio: Date;

  @ApiProperty()
  @IsDateString(undefined, {
    message: "Campo fim das inscrições deve ser uma data.",
  })
  @IsNotEmpty({ message: "Campo fim das inscrições é obrigatório." })
  inscricaoDataFim: Date;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo ativo é obrigatório." })
  ativo: boolean;
}
