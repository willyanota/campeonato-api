import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class EditarJogoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogo é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do jogo está inválido." })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo número do jogo é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo número do jogo deve ser um número inteiro." })
  @Min(1, { message: "Campo número do jogo deve ser maior que zero." })
  numeroDoJogo: number;

  @ApiProperty()
  @IsDateString(undefined, { message: "Campo data e hora deve ser uma data." })
  @IsNotEmpty({ message: "Campo data e hora é obrigatório." })
  dataHora: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber(undefined, { message: "Identificador do local está inválido." })
  localId?: number;
}

export class CadastrarResultadoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogo é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do jogo está inválido." })
  id: number;

  @IsNotEmpty({ message: "Campo realizado é obrigatório." })
  @IsBoolean()
  realizado: boolean;

  @IsNotEmpty({ message: "Campo WO é obrigatório." })
  @IsBoolean()
  wo: boolean;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols regular deve ser um número inteiro." })
  @Max(99, { message: "Campo gols regular deve ter um valor máximo de 99." })
  golsRegularEquipe1: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols regular deve ser um número inteiro." })
  @Max(99, { message: "Campo gols regular deve ter um valor máximo de 99." })
  golsRegularEquipe2: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols prorrogação deve ser um número inteiro." })
  @Max(99, {
    message: "Campo gols prorrogação deve ter um valor máximo de 99.",
  })
  golsProrrogacaoEquipe1: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols prorrogação deve ser um número inteiro." })
  @Max(99, {
    message: "Campo gols prorrogação deve ter um valor máximo de 99.",
  })
  golsProrrogacaoEquipe2: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols penalti deve ser um número inteiro." })
  @Max(99, {
    message: "Campo gols penalti deve ter um valor máximo de 99.",
  })
  golsPenaltiEquipe1: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "Campo gols penalti deve ser um número inteiro." })
  @Max(99, {
    message: "Campo gols penalti deve ter um valor máximo de 99.",
  })
  golsPenaltiEquipe2: number;
}
