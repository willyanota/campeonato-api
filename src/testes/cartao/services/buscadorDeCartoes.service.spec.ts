import { RepositorioCartao } from "../../../dominio/cartao/repositorioCartao";
import { BuscadorDeCartoesService } from "../../../dominio/cartao/services/buscadorDeCartoes.service";

describe("busca de cartões", () => {
  let repositorioCartao: RepositorioCartao;
  let buscadorDeCartoes: BuscadorDeCartoesService;

  beforeEach(async () => {
    repositorioCartao = {
      salvar: jest.fn(),
      buscarPorJogoId: jest.fn(),
      buscarPorId: jest.fn(),
      excluir: jest.fn(),
      contarNumeroDeCartoesDoJogadorNoJogo: jest.fn(),
    };
    buscadorDeCartoes = new BuscadorDeCartoesService(repositorioCartao);
  });

  it('deve chamar o método "buscarPorJogoId" com êxito', async () => {
    const jogoId = 1;

    await buscadorDeCartoes.buscarPorJogoId(jogoId);

    expect(repositorioCartao.buscarPorJogoId).toHaveBeenCalledWith(jogoId);
  });
});
