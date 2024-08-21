CREATE TABLE public.equipe (
  equ_id SERIAL PRIMARY KEY,
  cat_id INTEGER NOT NULL,
  gru_id INTEGER NULL,
  equ_nome VARCHAR(60) NOT NULL,
  equ_responsavel VARCHAR(60) NOT NULL,
  equ_convidada BOOLEAN NOT NULL,
  equ_abertura BOOLEAN NOT NULL,
  equ_pontos SMALLINT NOT NULL,
  equ_contadorvitorias SMALLINT DEFAULT 0 NOT NULL,
	equ_contadorempates SMALLINT DEFAULT 0 NOT NULL,
	equ_contadorderrotas SMALLINT DEFAULT 0 NOT NULL,
	equ_golspro SMALLINT DEFAULT 0 NOT NULL,
	equ_golscontra SMALLINT DEFAULT 0 NOT NULL,
	equ_saldogols SMALLINT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,
  
  CONSTRAINT fk_equ_cat FOREIGN KEY (cat_id) REFERENCES public.categoria (cat_id),

  CONSTRAINT fk_equ_gru FOREIGN KEY (gru_id) REFERENCES public.grupo (gru_id)
);