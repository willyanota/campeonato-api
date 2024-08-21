import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
} from "class-validator";

export class CriarFaseDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da categoria está inválido." })
  categoriaId: number;

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
  @IsNotEmpty({ message: "Campo tem prorrogação é obrigatório." })
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
  @Min(0, {
    message:
      "Campo quantidade de classificados deve ser maior ou igual que zero.",
  })
  quantidadeClassificados: number;
}
