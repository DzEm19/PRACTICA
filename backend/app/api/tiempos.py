from datetime import datetime
from typing import Any

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.database.connection import connection

router = APIRouter(tags=["tiempos-atencion"])


class TiempoAtencionCreate(BaseModel):
	comentario_id: int = Field(gt=0)
	minutos: int = Field(ge=0)
	observaciones: str | None = None


def serialize(row: tuple[Any, ...]) -> dict[str, Any]:
	return {
		"id": row[0],
		"comentario_id": row[1],
		"contenido": row[2],
		"minutos": row[3],
		"fecha": row[4].isoformat() if isinstance(row[4], datetime) else row[4],
		"observaciones": row[5],
	}


SELECT_TIME = """
SELECT t.id, t.comentario_id, c.contenido, t.minutos, t.fecha, t.observaciones
FROM tiempos_atencion t
JOIN comentarios c ON c.id = t.comentario_id
"""


@router.post("/tiempos-atencion", status_code=status.HTTP_201_CREATED)
def crear_tiempo(payload: TiempoAtencionCreate) -> dict[str, Any]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(
				"""INSERT INTO tiempos_atencion (comentario_id, minutos, observaciones)
				   VALUES (%s, %s, %s) RETURNING id""",
				(payload.comentario_id, payload.minutos, payload.observaciones),
			)
			row = cursor.fetchone()
		db.commit()
	except Exception:
		db.rollback()
		raise
	finally:
		db.close()
	if row is None:
		raise HTTPException(status_code=400, detail="No se pudo registrar el tiempo")
	return obtener_tiempo(row[0])


@router.get("/tiempos-atencion")
def listar_tiempos() -> list[dict[str, Any]]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(SELECT_TIME + " ORDER BY t.fecha DESC, t.id DESC")
			return [serialize(item) for item in cursor.fetchall()]
	finally:
		db.close()


def obtener_tiempo(time_id: int) -> dict[str, Any]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(SELECT_TIME + " WHERE t.id = %s", (time_id,))
			row = cursor.fetchone()
	finally:
		db.close()
	if row is None:
		raise HTTPException(status_code=404, detail="Tiempo de atención no encontrado")
	return serialize(row)