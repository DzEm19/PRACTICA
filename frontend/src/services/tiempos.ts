import type { AttentionTimeRecord } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

function mapTime(item: Record<string, unknown>): AttentionTimeRecord {
	return {
		id: Number(item.id),
		commentId: Number(item.comentario_id),
		content: String(item.contenido ?? ''),
		minutes: Number(item.minutos),
		date: String(item.fecha ?? ''),
		notes: item.observaciones == null ? null : String(item.observaciones),
	};
}

export async function listAttentionTimes(): Promise<AttentionTimeRecord[]> {
	const response = await fetch(`${API_URL}/tiempos-atencion`);
	if (!response.ok) throw new Error('No se pudieron cargar los tiempos de atención');
	const data = await response.json() as Record<string, unknown>[];
	return data.map(mapTime);
}

export async function createAttentionTime(input: { commentId: number; minutes: number; notes: string }): Promise<AttentionTimeRecord> {
	const response = await fetch(`${API_URL}/tiempos-atencion`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ comentario_id: input.commentId, minutos: input.minutes, observaciones: input.notes || null }),
	});
	if (!response.ok) throw new Error('No se pudo registrar el tiempo de atención');
	return mapTime(await response.json());
}