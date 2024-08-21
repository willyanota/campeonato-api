CREATE TABLE public.categoria (
  cat_id SERIAL PRIMARY KEY,
  cam_id INTEGER NOT NULL,
  cat_genero CHAR(1) NOT NULL,
  cat_nome VARCHAR(30) NOT NULL,
  cat_idade_minima SMALLINT NOT NULL,
  cat_idade_maxima SMALLINT NOT NULL,
  cat_max_jogadores_ativos SMALLINT NOT NULL,
  cat_max_jogadores_dependentes SMALLINT NOT NULL,
  cat_goleiro_fora_idade BOOLEAN NOT NULL,
  cat_max_cartoes_vermelhos SMALLINT NOT NULL,
  cat_max_horas_inscricao_jogador SMALLINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_cat_cam FOREIGN KEY (cam_id) REFERENCES public.campeonato (cam_id)
);