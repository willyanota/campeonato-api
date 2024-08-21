CREATE TABLE public.gol (
  gol_id SERIAL PRIMARY KEY,
  jog_id INTEGER NOT NULL,
  jgd_id INTEGER NOT NULL,
  gol_minuto SMALLINT NOT NULL,
  gol_periodo VARCHAR(30) NOT NULL,
  gol_golcontra BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_gol_jog FOREIGN KEY (jog_id) REFERENCES public.jogo (jog_id),

  CONSTRAINT fk_gol_jgd FOREIGN KEY (jgd_id) REFERENCES public.jogador (jgd_id)
);