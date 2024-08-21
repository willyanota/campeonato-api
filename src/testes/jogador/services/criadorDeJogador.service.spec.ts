import { BadRequestException } from "@nestjs/common";
import { RepositorioEquipe } from "../../../dominio/equipe/repositorioEquipe";
import { CriarJogadorDTO } from "../../../dominio/jogador/dtos/criadorDeJogador.dto";
import { RepositorioJogador } from "../../../dominio/jogador/repositorioJogador";
import { CriadorDeJogadorService } from "../../../dominio/jogador/services/criadorDeJogador.service";
import { EnvioDeArquivoMinioService } from "../../../dominio/minio-client/envioDeArquivoMinio.service";
import { EquipeBuilder } from "../../builders/equipeBuilder";

describe("criar jogador", () => {
  let repositorioJogador: RepositorioJogador;
  let jogadorDto: CriarJogadorDTO;
  let repositorioEquipe: RepositorioEquipe;
  let criadorDeJogadorService: CriadorDeJogadorService;
  let envioDeFoto: EnvioDeArquivoMinioService;
  let equipe;
  let image: Express.Multer.File;

  beforeEach(async () => {
    equipe = EquipeBuilder.umaEquipe()
      .comId(1)
      .comNome("nome da equipe")
      .comResponsavel("nome do responsavel")
      .comEhConvidada(true)
      .comAbertura(true)
      .comCategoria();
    jogadorDto = {
      equipeId: 1,
      nome: "nome do jogador",
      idade: 29,
      cpf: "12345678900",
      ehGoleiro: true,
    };
    repositorioEquipe = {
      salvar: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      excluir: jest.fn(),
      buscarDosCampeonatosAtivos: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorGrupoId: jest.fn(),
      buscarDoGrupo: jest.fn(),
    };
    repositorioJogador = {
      salvar: jest.fn(),
      buscarPorEquipeId: jest.fn(),
      buscarPorId: jest.fn(),
      contarAtivosDaEquipe: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    criadorDeJogadorService = new CriadorDeJogadorService(
      repositorioJogador,
      repositorioEquipe,
      envioDeFoto,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    const foto = "fotourl";
    const ativo = true;
    const motivoInativacao = null;
    const dataSolicitacao = null;
    const descricaoSolicitacao = null;
    const situacaoSolicitacao = null;
    const suspenso = false;
    repositorioEquipe.buscarPorId = jest.fn(() =>
      Promise.resolve(equipe.criar()),
    );

    await criadorDeJogadorService.criar(jogadorDto, image);

    expect(repositorioJogador.salvar).toHaveBeenCalledWith(
      jogadorDto.equipeId,
      foto,
      jogadorDto.nome,
      jogadorDto.idade,
      jogadorDto.cpf,
      jogadorDto.ehGoleiro,
      ativo,
      motivoInativacao,
      dataSolicitacao,
      descricaoSolicitacao,
      situacaoSolicitacao,
      suspenso,
    );
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma equipe existente", async () => {
    repositorioEquipe.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const criarJogador = async () => {
      await criadorDeJogadorService.criar(jogadorDto, image);
    };

    await expect(criarJogador).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um jogador sem equipe existente.",
      ),
    );
  });
});
