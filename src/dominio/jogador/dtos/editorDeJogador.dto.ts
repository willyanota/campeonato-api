import { ApiProperty } from "@nestjs/swagger";
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
} from "class-validator";

export class EditarJogadorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumberString(undefined, {
    message: "Identificador do jogador está inválido.",
  })
  id: number;

  @ApiProperty()
  @IsBooleanString()
  ehGoleiro: boolean;
}

export class SolicitarInativacaoDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do jogador está inválido." })
  id: number;

  @ApiProperty()
  @IsString({ message: "Campo motivo de inativação deve ser um texto." })
  @Length(1, 30, {
    message: "Campo motivo de inativação é obrigatório. (Máx. 30 caracteres)",
  })
  motivoInativacao: string;

  @ApiProperty()
  @IsString({ message: "Campo descrição de inativação deve ser um texto." })
  @Length(1, 1000, {
    message:
      "Campo descrição de inativação é obrigatório. (Máx. 1000 caracteres)",
  })
  descricaoSolicitacao: string;
}

export class AtivarEInativarJogadorDTO {
  @ApiProperty()
  @IsNotEmpty({ message: "Campo jogador é obrigatório." })
  @IsNumber(undefined, { message: "Identificador do jogador está inválido." })
  id: number;
}
