CREATE TABLE public.local (
  loc_id SERIAL PRIMARY KEY,
  cam_id INTEGER NOT NULL,
  loc_nome VARCHAR(40) NOT NULL,
  loc_endereco VARCHAR(80) NOT NULL,
  loc_cep VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP,

  CONSTRAINT fk_loc_cam FOREIGN KEY (cam_id) REFERENCES public.campeonato (cam_id)
);