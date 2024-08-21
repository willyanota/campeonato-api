CREATE TABLE public.grupo (
  gru_id SERIAL PRIMARY KEY,
  fas_id INTEGER NOT NULL,
  gru_nome VARCHAR(30) NOT NULL,
  gru_observacao VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_gru_fas FOREIGN KEY (fas_id) REFERENCES public.fase (fas_id)
);