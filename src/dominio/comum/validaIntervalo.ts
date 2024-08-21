import { BadRequestException } from "@nestjs/common";

type intervalo = Date | number;

export function validaIntervalo(
  inicio: intervalo,
  fim: intervalo,
  mensagem: string,
): void {
  if (inicio >= fim) {
    throw new BadRequestException(mensagem);
  }
}
