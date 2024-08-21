import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CriarLocalDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo campeonato é obrigatório." })
  @IsNumber(undefined, {
    message: "Identificador do campeonato está inválido.",
  })
  campeonatoId: number;

  @ApiProperty()
  @IsString({ message: "Campo nome deve ser um texto." })
  @Length(1, 40, { message: "Campo nome é obrigatório. (Máx. 40 caracteres)" })
  nome: string;

  @ApiProperty()
  @IsString({ message: "Campo endereço deve ser um texto." })
  @Length(1, 80, {
    message: "Campo endereço é obrigatório. (Máx. 80 caracteres)",
  })
  endereco: string;

  @ApiProperty()
  @IsString()
  @Length(1, 10, { message: "Campo CEP é obrigatório. (Máx. 10 caracteres)" })
  cep: string;
}
