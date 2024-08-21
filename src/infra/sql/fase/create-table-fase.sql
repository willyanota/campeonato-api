CREATE TABLE public.fase (
  fas_id SERIAL PRIMARY KEY,
  cat_id INTEGER NOT NULL,
  fas_nome VARCHAR(30) NOT NULL,
  fas_grupo BOOLEAN NOT NULL,
  fas_tem_prorrogacao BOOLEAN NOT NULL,
  fas_tem_penalti BOOLEAN NOT NULL,
  fas_qtd_classificados SMALLINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_fas_cat FOREIGN KEY (cat_id) REFERENCES public.categoria (cat_id)
);