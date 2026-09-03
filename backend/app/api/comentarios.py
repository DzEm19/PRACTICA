from datetime import datetime
from typing import Any

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.database.connection import connection

router = APIRouter(tags=["comentarios"])


class ComentarioCreate(BaseModel):
	cliente_id: int | None = None
	contenido: str = Field(min_length=1, max_length=5000)
	canal: str = Field(default="web", max_length=30)
	categoria: str | None = Field(default=None, max_length=50)


class ComentarioUpdate(ComentarioCreate):
	estado: str = Field(default="pendiente", min_length=1, max_length=30)
	procesado: bool = False


def serialize(row: tuple[Any, ...]) -> dict[str, Any]:
	return {
		"id": row[0],
		"cliente_id": row[1],
		"cliente": row[2],
		"contenido": row[3],
		"canal": row[4],
		"estado": row[5],
		"categoria": row[6],
		"fecha": row[7].isoformat() if isinstance(row[7], datetime) else row[7],
		"procesado": row[8],
	}


SELECT_COMMENT = """
SELECT c.id, c.cliente_id, COALESCE(cl.nombre, 'Cliente sin asignar'),
	   c.contenido, c.canal, c.estado, c.categoria, c.fecha, c.procesado
FROM comentarios c
LEFT JOIN clientes cl ON cl.id = c.cliente_id
"""


@router.post("/comentarios", status_code=status.HTTP_201_CREATED)
def crear_comentario(payload: ComentarioCreate) -> dict[str, Any]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(
				"""INSERT INTO comentarios (cliente_id, contenido, canal, categoria)
				   VALUES (%s, %s, %s, %s) RETURNING id""",
				(payload.cliente_id, payload.contenido.strip(), payload.canal, payload.categoria),
			)
			comment_id = cursor.fetchone()[0]
		db.commit()
	finally:
		db.close()
	return obtener_comentario(comment_id)


@router.get("/comentarios")
def listar_comentarios() -> list[dict[str, Any]]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(SELECT_COMMENT + " ORDER BY c.fecha DESC, c.id DESC")
			return [serialize(row) for row in cursor.fetchall()]
	finally:
		db.close()


@router.get("/comentarios/{comment_id}")
def obtener_comentario(comment_id: int) -> dict[str, Any]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(SELECT_COMMENT + " WHERE c.id = %s", (comment_id,))
			row = cursor.fetchone()
	finally:
		db.close()
	if row is None:
		raise HTTPException(status_code=404, detail="Comentario no encontrado")
	return serialize(row)


@router.put("/comentarios/{comment_id}")
def actualizar_comentario(comment_id: int, payload: ComentarioUpdate) -> dict[str, Any]:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute(
				"""UPDATE comentarios
				   SET cliente_id = %s, contenido = %s, canal = %s, estado = %s,
				       categoria = %s, procesado = %s
				 WHERE id = %s RETURNING id""",
				(
					payload.cliente_id,
					payload.contenido.strip(),
					payload.canal,
					payload.estado,
					payload.categoria,
					payload.procesado,
					comment_id,
				),
			)
			updated = cursor.fetchone()
		db.commit()
	finally:
		db.close()
	if updated is None:
		raise HTTPException(status_code=404, detail="Comentario no encontrado")
	return obtener_comentario(comment_id)


@router.delete("/comentarios/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def eliminar_comentario(comment_id: int) -> None:
	db = connection()
	try:
		with db.cursor() as cursor:
			cursor.execute("DELETE FROM comentarios WHERE id = %s RETURNING id", (comment_id,))
			deleted = cursor.fetchone()
		db.commit()
	finally:
		db.close()
	if deleted is None:
		raise HTTPException(status_code=404, detail="Comentario no encontrado")
