import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";

export class CriarCategoriaDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo campeonato é obrigatório." })
  @IsNumber(undefined, {
    message: "Identificador do campeonato está inválido.",
  })
  campeonatoId: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo gênero é obrigatório." })
  @IsIn(["F", "M"], { message: "Campo gênero deve ser F ou M." })
  genero: string;

  @ApiProperty()
  @IsString({ message: "Campo nome deve ser um texto." })
  @Length(1, 30, { message: "Campo nome é obrigatório. (Máx. 30 caracteres)" })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo idade mínima é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo idade mínima deve ser um número inteiro." })
  @Min(1, { message: "Campo idade mínima deve ser maior que zero." })
  @Max(99, { message: "Campo idade mínima deve ter um valor máximo de 99." })
  idadeMinima: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo idade máxima é obrigatório." })
  @Type(() => Number)
  @IsInt({ message: "Campo idade máxima deve ser um número inteiro." })
  @Min(1, { message: "Campo idade máxima deve ser maior que zero." })
  @Max(99, { message: "Campo idade máxima deve ter um valor máximo de 99." })
  idadeMaxima: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo máximo de jogadores ativos é obrigatório." })
  @Type(() => Number)
  @IsInt({
    message: "Campo máximo de jogadores ativos deve ser um número inteiro.",
  })
  @Min(0, {
    message: "Campo máximo de jogadores ativos deve ser maior ou igual a 0.",
  })
  @Max(20, {
    message: "Campo máximo de jogadores ativos deve ter um valor máximo de 20.",
  })
  maxJogadoresAtivos: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "Campo máximo de jogadores dependentes é obrigatório.",
  })
  @Type(() => Number)
  @IsInt({
    message:
      "Campo máximo de jogadores dependentes deve ser um número inteiro.",
  })
  @Min(0, {
    message:
      "Campo máximo de jogadores dependentes deve ser maior ou igual a 0.",
  })
  @Max(5, {
    message:
      "Campo máximo de jogadores dependentes deve ter um valor máximo de 5.",
  })
  maxJogadoresDependentes: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: "Campo goleiro fora da idade é obrigatório." })
  goleiroForaIdade: boolean;

  @ApiProperty()
  @IsNotEmpty({
    message: "Campo quantidade de cartões vermelhos por jogo é obrigatório.",
  })
  @Type(() => Number)
  @IsInt({
    message:
      "Campo quantidade de cartões vermelhos por jogo deve ser um número inteiro.",
  })
  @Min(0, {
    message:
      "Campo quantidade de cartões vermelhos por jogo deve ser maior ou igual a 0.",
  })
  maxCartoesVermelhosPorJogo: number;

  @ApiProperty()
  @IsNotEmpty({
    message:
      "Campo máximo de horas para inscrição de um jogador é obrigatório.",
  })
  @Type(() => Number)
  @IsInt({
    message:
      "Campo máximo de horas para inscrição de um jogador deve ser um número inteiro.",
  })
  @Min(0, {
    message:
      "Campo máximo de horas para inscrição de um jogador deve ser maior ou igual a 0.",
  })
  maxHorasInscricaoJogador: number;
}
