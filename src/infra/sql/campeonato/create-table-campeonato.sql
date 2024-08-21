CREATE TABLE public.campeonato (
  cam_id SERIAL PRIMARY KEY,
  cam_nome VARCHAR(60) NOT NULL,
  cam_dt_inicio TIMESTAMP NOT NULL,
  cam_dt_fim TIMESTAMP NOT NULL,
  cam_inscricao_dt_inicio TIMESTAMP NOT NULL,
  cam_inscricao_dt_fim TIMESTAMP NOT NULL,
  cam_ativo BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP
);