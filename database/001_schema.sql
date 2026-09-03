CREATE TABLE IF NOT EXISTS clientes (
	id BIGSERIAL PRIMARY KEY,
	nombre VARCHAR(150) NOT NULL,
	email VARCHAR(200),
	activo BOOLEAN NOT NULL DEFAULT TRUE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS comentarios (
	id BIGSERIAL PRIMARY KEY,
	cliente_id BIGINT REFERENCES clientes(id) ON DELETE SET NULL,
	contenido TEXT NOT NULL CHECK (length(trim(contenido)) > 0),
	canal VARCHAR(30) NOT NULL DEFAULT 'web',
	estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
	categoria VARCHAR(50),
	fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	procesado BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_comentarios_fecha ON comentarios (fecha DESC);
CREATE INDEX IF NOT EXISTS idx_comentarios_estado ON comentarios (estado);

CREATE TABLE IF NOT EXISTS tiempos_atencion (
	id BIGSERIAL PRIMARY KEY,
	comentario_id BIGINT NOT NULL REFERENCES comentarios(id) ON DELETE CASCADE,
	minutos INTEGER NOT NULL CHECK (minutos >= 0),
	fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	observaciones TEXT
);

CREATE INDEX IF NOT EXISTS idx_tiempos_atencion_comentario ON tiempos_atencion (comentario_id);
CREATE INDEX IF NOT EXISTS idx_tiempos_atencion_fecha ON tiempos_atencion (fecha DESC);
