import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class EditarFaseDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo fase é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da fase está inválido." })
  id: number;

  @ApiProperty()
  @IsString({ message: "Campo nome deve ser um texto." })
  @Length(1, 30, { message: "Campo nome é obrigatório. (Máx. 30 caracteres)" })
  nome: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo grupo é obrigatório." })
  ehGrupo: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo tem prorrogacao é obrigatório." })
  temProrrogacao: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo tem penalti é obrigatório." })
  temPenalti: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo exibir no site é obrigatório." })
  exibirNoSite: boolean;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo quantidade de classificados é obrigatório." })
  @Type(() => Number)
  @IsInt({
    message: "Campo quantidade de classificados deve ser um número inteiro.",
  })
  quantidadeClassificados: number;
}
