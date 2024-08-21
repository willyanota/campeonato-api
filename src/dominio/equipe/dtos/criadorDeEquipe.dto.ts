import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class CriarEquipeDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo categoria é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da categoria está inválido." })
  categoriaId: number;

  @ApiProperty()
  @IsString({ message: "Campo nome deve ser um texto." })
  @Length(1, 60, { message: "Campo nome é obrigatório. (Máx. 60 caracteres)" })
  nome: string;

  @ApiProperty()
  @IsString({ message: "Campo responsável deve ser um texto." })
  @Length(1, 60, {
    message: "Campo responsável é obrigatório. (Máx. 60 caracteres)",
  })
  responsavel: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo convidada é obrigatório." })
  ehConvidada: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo abertura é obrigatório." })
  abertura: boolean;
}
