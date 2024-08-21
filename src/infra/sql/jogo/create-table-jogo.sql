CREATE TABLE public.jogo (
  jog_id SERIAL PRIMARY KEY,
  fas_id INTEGER NOT NULL,
  eq1_id INTEGER NOT NULL,
  eq2_id INTEGER NOT NULL,
  loc_id INTEGER NOT NULL,
  jog_numerojogo SMALLINT NOT NULL,
  jog_numerorodada SMALLINT NOT NULL,
  jog_datahora TIMESTAMP NOT NULL,
  jog_realizado BOOLEAN NOT NULL,
  jog_wo BOOLEAN NOT NULL,
  jog_golsregulareq1 SMALLINT NOT NULL,
  jog_golsregulareq2 SMALLINT NOT NULL,
  jog_golsprorrogacaoeq1 SMALLINT NOT NULL,
  jog_golsprorrogacaoeq2 SMALLINT NOT NULL,
  jog_golspenaltieq1 SMALLINT NOT NULL,
  jog_golspenaltieq2 SMALLINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_jog_fas FOREIGN KEY (fas_id) REFERENCES public.fase (fas_id),

  CONSTRAINT fk_jog_loc FOREIGN KEY (loc_id) REFERENCES public.local (loc_id),

  CONSTRAINT fk_jog_eq1 FOREIGN KEY (eq1_id) REFERENCES public.equipe (equ_id),

  CONSTRAINT fk_jog_eq2 FOREIGN KEY (eq2_id) REFERENCES public.equipe (equ_id)
);