<h1>Sobre o projeto 💻
---


**Tecnologias**

- NestJS
- Typescript
- Node
- Docker
- TypeOrm
- Jest JS
- Swagger
- Postgres


**Funcionalidades**

- criar campeonato;
- editar campeonato;
- buscar campeonatos;
- buscar campeonato pelo id;
- buscar campeonatos ativos;

- cadastrar fase;
- editar fase;
- buscar fase pelo categoriaId;

- criar uma nova categoria;
- editar uma categoria;
- buscar uma categoria pelo seu id;
- buscar categorias pelo campeonatoId;

- criar grupo;
- editar grupo;
- buscar grupos pelo campeonatoId;
- buscar grupos;

- criar equipe;
- editar equipe;
- buscar equipes pelo campeonatoId;
- excluir equipe;
- buscar equipes dos campeonatos ativos;
- buscar equipes por categoriaId;
- buscar equipes por grupoId;
- pontuar equipes;

- criar jogador;
- editar jogador;
- inativar jogador;
- buscar jogadores por equipeId;
- suspensão de jogador;
- buscar jogadores por categoria id;

- criar local;
- editar local;
- buscar todos os locais;
- buscar locais por campeonatoId;

- criar jogo;
- buscar jogos por campeonatoId;
- editar jogo;
- buscar todos os jogos;
- buscar jogos por data;
- cadastrar resultado;
- buscar últimos 3 jogos da equipe;

- cadastrar gol;
- buscar gols por jogo id;
- excluir gol;

- cadastrar cartão;
- buscar cartões por jogo id;
- excluir cartão;


**Documentação SWAGGER**

- Ambiente de Desenvolvimento Local:
  http://localhost:3000/docs


**Como rodar o projeto? 📄**

```bash
# Na pasta raiz, executar o comando para instalar as dependências do node e rodar o projeto:

npm install
npm run start

# Para rodar o docker-compose do banco de dados

cd db
docker-compose up
```
**Rodar os scripts de criação das tabelas na pasta infra/sql, as migrations não estão habilitadas**