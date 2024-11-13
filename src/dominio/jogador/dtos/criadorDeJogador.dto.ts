import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from "class-validator";

export class CriarJogadorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo equipe é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador da equipe está inválido.",
  })
  equipeId: number;

  @ApiProperty()
  @Length(1, 60, { message: "Campo nome é obrigatório. (Máx. 60 caracteres)" })
  @IsString({ message: "Campo nome deve ser um texto." })
  nome: string;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo idade é obrigatório." })
  @IsInt({ message: "Campo idade deve ser um número inteiro." })
  idade: number;

  @ApiProperty()
  @IsNotEmpty({ message: "Campo CPF é obrigatório." })
  cpf: string;

  @ApiProperty()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  ehGoleiro: boolean;
}
