from typing import Any

import psycopg2
from fastapi import HTTPException

from app.core.config import get_database_url


def connection() -> Any:
	database_url = get_database_url()
	if not database_url:
		raise HTTPException(status_code=503, detail="DATABASE_URL no está configurada")
	try:
		return psycopg2.connect(database_url)
	except psycopg2.Error as error:
		raise HTTPException(status_code=503, detail="No se pudo conectar con la base de datos") from error
