import { BadRequestException } from "@nestjs/common";
import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { CriarGrupoDTO } from "src/dominio/grupo/dtos/criadorDeGrupo.dto";
import { RepositorioGrupo } from "../../../dominio/grupo/repositorioGrupo";
import { CriadorDeGrupoService } from "../../../dominio/grupo/services/criadorDeGrupo.service";
import { CampeonatoBuilder } from "../../builders/campeonatoBuilder";
import { CategoriaBuilder } from "../../builders/categoriaBuilder";
import { FaseBuilder } from "../../builders/faseBuilder";

describe("criar grupo", () => {
  let repositorioGrupo: RepositorioGrupo;
  let repositorioFase: RepositorioFase;
  let criadorDeGrupoService: CriadorDeGrupoService;
  let fase;
  let grupoDto: CriarGrupoDTO;

  beforeEach(async () => {
    fase = FaseBuilder.umaFase()
      .comId(1)
      .comNome("nome da fase")
      .comEhGrupo(false)
      .comProrrogacao(false)
      .comPenalti(false)
      .estaDisponivelNoSite(false)
      .comQuantidadeClassificados(2)
      .comCategoria();
    grupoDto = {
      faseId: 1,
      nome: "nome do grupo",
      observacao: "uma observação",
    };
    repositorioGrupo = {
      salvar: jest.fn(),
      buscarPorCampeonatoId: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
    };
    repositorioFase = {
      salvar: jest.fn(),
      buscarPorCategoriaId: jest.fn(),
      buscarPorId: jest.fn(),
    };
    criadorDeGrupoService = new CriadorDeGrupoService(
      repositorioGrupo,
      repositorioFase,
    );
  });

  it('deve chamar o método "criar" com êxito', async () => {
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(fase.criar()));

    await criadorDeGrupoService.criar(grupoDto);

    expect(repositorioGrupo.salvar).toHaveBeenCalledWith({
      ...grupoDto,
      fase,
    });
  });

  it("deve lançar uma exceção BadRequestException quando não houver uma Fase existente", async () => {
    repositorioFase.buscarPorId = jest.fn(() => Promise.resolve(undefined));

    const criarGrupo = async () => {
      await criadorDeGrupoService.criar(grupoDto);
    };

    await expect(criarGrupo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um grupo com uma fase inexistente.",
      ),
    );
  });

  it("deve lançar uma exceção BadRequestException quando o Campeonato estiver inativo", async () => {
    const campeonato = CampeonatoBuilder.umCampeonato()
      .estaAtivo(false)
      .criar();
    const categoria = CategoriaBuilder.umaCategoria()
      .comCampeonato(campeonato)
      .criar();
    repositorioFase.buscarPorId = jest.fn(() =>
      Promise.resolve(fase.comCategoria(categoria).criar()),
    );

    const criarGrupo = async () => {
      await criadorDeGrupoService.criar(grupoDto);
    };

    await expect(criarGrupo).rejects.toThrow(
      new BadRequestException(
        "Não é possível adicionar um grupo com uma fase de um campeonato inativo.",
      ),
    );
  });
});
