import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
} from "class-validator";

export class CriarJogoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo número do jogo é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo número do jogo deve ser um número inteiro." })
  @Min(1, { message: "Campo número do jogo deve ser maior que zero." })
  numeroDoJogo: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo número da rodada é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo número da rodada deve ser um número inteiro." })
  @Min(1, { message: "Campo número da rodada deve ser maior que zero." })
  numeroDaRodada: number;

  @ApiProperty()
  @IsDateString(undefined, { message: "Campo data e hora deve ser uma data." })
  @IsNotEmpty({ message: "Campo data e hora é obrigatório." })
  dataHora: Date;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo fase é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da fase está inválido." })
  faseId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo equipe 1 é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da equipe está inválido." })
  equipe1Id: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo equipe 2 é obrigatório." })
  @IsNumber(undefined, { message: "Identificador da equipe está inválido." })
  equipe2Id: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo local é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do local está inválido." })
  localId: number;
}
