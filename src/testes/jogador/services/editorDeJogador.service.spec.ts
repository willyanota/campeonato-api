import { BadRequestException } from "@nestjs/common";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { EditorDeJogadorService } from "../../../dominio/jogador/services/editorDeJogador.service";
import { EnvioDeArquivoMinioService } from "../../../dominio/minio-client/envioDeArquivoMinio.service";
import { JogadorBuilder } from "../../builders/jogadorBuilder";

describe("editar jogador", () => {
  let editorDeJogadorService: EditorDeJogadorService;
  let repositorioJogador: RepositorioJogador;
  let envioDeFoto: EnvioDeArquivoMinioService;
  let jogador;
  let image: Express.Multer.File;

  beforeEach(async () => {
    jogador = JogadorBuilder.umJogador()
      .comId(1)
      .comFoto("fotourl")
      .comNome("nomejogador")
      .comIdade(20)
      .comCpf("99977788855")
      .comEhGoleiro(false)
      .estaAtivo(true)
      .estaSuspenso(false)
      .comContadorDeRodadasSuspenso(0)
      .comContadorDeCartoesAmarelos(0)
      .comContadorDeCartoesVermelhos(0)
      .comEquipe();
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    editorDeJogadorService = new EditorDeJogadorService(
      repositorioJogador,
      envioDeFoto,
    );
  });

  it('deve chamar o método "editarJogador" com êxito', async () => {
    repositorioJogador.buscarPorId = jest.fn(() =>
      Promise.resolve(jogador.criar()),
    );

    await editorDeJogadorService.editar(jogador.criar(), image);

    expect(repositorioJogador.salvar).toHaveBeenCalledWith(jogador.criar());
  });

  it("deve lançar uma exceção BadRequestException quando não encontrar um jogador", async () => {
    repositorioJogador.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const editarJogador = async () => {
      await editorDeJogadorService.editar(jogador.criar(), image);
    };

    await expect(editarJogador).rejects.toThrow(
      new BadRequestException("Jogador não encontrado."),
    );
  });
});
