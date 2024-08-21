import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class CriarCartaoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogo é obrigatório." })
  @IsNumber(undefined, {
    message: "Identificador do jogo está inválido.",
  })
  jogoId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumber(undefined, {
    message: "Identificador do jogador está inválido.",
  })
  jogadorId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo tipo é obrigatório" })
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo minuto é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo minuto deve ser um número inteiro." })
  @Min(0, { message: "Campo minuto deve ser maior ou igual que zero." })
  @Max(99, { message: "Campo minuto deve ter um valor máximo de 99." })
  minuto: number;

  @ApiProperty()
  @IsString({ message: "Campo período deve ser um texto." })
  @Length(1, 30, {
    message: "Campo período é obrigatório. (Máx. 30 caracteres)",
  })
  periodo: string;

  @ApiProperty()
  @IsString({ message: "Campo súmula deve ser um texto." })
  @Length(1, 200, {
    message: "Campo súmula é obrigatório. (Máx. 200 caracteres)",
  })
  sumula: string;
}
