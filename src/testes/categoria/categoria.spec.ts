import * as moment from "moment";
import { Categoria } from "../../dominio/entidades/categoria.entity";

describe("categoria", () => {
  let campeonato;
  beforeEach(async () => {
    campeonato = {
      id: 1,
      nome: "nome do campeonato",
      dataInicio: moment().subtract(1, "days").toDate(),
      dataFim: new Date(),
      inscricaoDataInicio: moment().subtract(1, "days").toDate(),
      inscricaoDataFim: new Date(),
      ativo: true,
      exibirNoSite: false,
    };
  });

  it("não deve lançar exceção quando criar uma categoria informando campeonato", () => {
    expect(
      () =>
        new Categoria(
          1,
          "F",
          "nome da categoria",
          18,
          49,
          12,
          3,
          false,
          2,
          24,
          campeonato,
        ),
    ).not.toThrow(new Error("Não é possível criar categoria sem campeonato"));
  });
});
