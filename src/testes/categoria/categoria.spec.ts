import { Categoria } from "../../dominio/entidades/categoria.entity";
import { CategoriaBuilder } from "../builders/categoriaBuilder";

describe("categoria", () => {
  let categoria;

  beforeEach(async () => {
    categoria = CategoriaBuilder.umaCategoria()
      .comId(1)
      .comGenero("F")
      .comNome("nome da categoria")
      .comIdadeMinima(18)
      .comIdadeMaxima(49)
      .comMaxJogadoresAtivos(20)
      .comMaxJogadoresDependentes(5)
      .comMaxCartoesVermelhosPorJogo(2)
      .comMaxHorasInscricaoJogador(48)
      .comCampeonato();
  });

  it("não deve lançar exceção quando criar uma categoria informando campeonato", () => {
    expect(() => new Categoria(categoria)).not.toThrow(
      new Error("Não é possível criar categoria sem campeonato"),
    );
  });
});
