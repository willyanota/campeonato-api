CREATE TABLE public.cartao (
  car_id SERIAL PRIMARY KEY,
  jog_id INTEGER NOT NULL,
  jgd_id INTEGER NOT NULL,
  car_tipo VARCHAR(10) NOT NULL,
  car_minuto SMALLINT NOT NULL,
  car_periodo VARCHAR(30) NOT NULL,
  car_sumula VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_car_jog FOREIGN KEY (jog_id) REFERENCES public.jogo (jog_id),

  CONSTRAINT fk_car_jgd FOREIGN KEY (jgd_id) REFERENCES public.jogador (jgd_id)
);