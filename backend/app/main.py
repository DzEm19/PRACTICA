from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.comentarios import router as comentarios_router
from app.api.tiempos import router as tiempos_router

app = FastAPI(title="Centro Inteligente API")
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(comentarios_router, prefix="/api")
app.include_router(tiempos_router, prefix="/api")


@app.get("/health")
def health() -> dict[str, str]:
	return {"status": "ok"}