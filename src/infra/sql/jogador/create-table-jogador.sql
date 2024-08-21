CREATE TABLE public.jogador (
  jgd_id SERIAL PRIMARY KEY,
  equ_id INTEGER NOT NULL,
  jgd_foto VARCHAR(255) NOT NULL,
  jgd_nome VARCHAR(60) NOT NULL,
	jgd_idade SMALLINT NOT NULL,
	jgd_cpf VARCHAR(20) NOT NULL,
  jgd_goleiro BOOLEAN NOT NULL,
  jgd_ativo BOOLEAN NOT NULL,
  jgd_suspenso BOOLEAN NOT NULL,
  jgd_rodadasuspenso SMALLINT NULL,
  jgd_contadorrodadassuspenso BOOLEAN NOT NULL,
  jgd_contadorcartoesamarelos BOOLEAN NOT NULL,
  jgd_contadorcartoesvermelhos BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_jgd_eq FOREIGN KEY (equ_id) REFERENCES public.equipe (equ_id)
);