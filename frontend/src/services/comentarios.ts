import type { CommentRecord } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

function mapComment(comment: Record<string, unknown>): CommentRecord {
	return {
		id: Number(comment.id),
		clientId: comment.cliente_id == null ? null : Number(comment.cliente_id),
		client: String(comment.cliente ?? 'Cliente sin asignar'),
		content: String(comment.contenido ?? ''),
		channel: String(comment.canal ?? 'web'),
		status: String(comment.estado ?? 'pendiente'),
		category: (comment.categoria ?? 'Consulta') as CommentRecord['category'],
		date: String(comment.fecha ?? ''),
		processed: Boolean(comment.procesado),
		sentiment: 'Neutral',
		text: String(comment.contenido ?? ''),
		responseTime: 'Pendiente',
		rating: 0,
		source: String(comment.canal ?? 'web'),
		priority: 'Media',
	};
}

export interface CreateCommentInput {
	content: string;
	clientId: number | null;
	category: string;
	channel: string;
}

export interface UpdateCommentInput extends CreateCommentInput {
	status: string;
	processed: boolean;
}

export async function listComments(): Promise<CommentRecord[]> {
	const response = await fetch(`${API_URL}/comentarios`);
	if (!response.ok) throw new Error('No se pudieron cargar los comentarios');
	const data = await response.json() as Record<string, unknown>[];
	return data.map(mapComment);
}

export async function createComment(input: CreateCommentInput): Promise<CommentRecord> {
	const response = await fetch(`${API_URL}/comentarios`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cliente_id: input.clientId, contenido: input.content, canal: input.channel, categoria: input.category }),
	});
	if (!response.ok) throw new Error('No se pudo crear el comentario');
	return mapComment(await response.json());
}

export async function updateComment(id: number, input: UpdateCommentInput): Promise<CommentRecord> {
	const response = await fetch(`${API_URL}/comentarios/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			cliente_id: input.clientId,
			contenido: input.content,
			canal: input.channel,
			estado: input.status,
			categoria: input.category,
			procesado: input.processed,
		}),
	});
	if (!response.ok) throw new Error('No se pudo actualizar el comentario');
	return mapComment(await response.json());
}

export async function deleteComment(id: number): Promise<void> {
	const response = await fetch(`${API_URL}/comentarios/${id}`, { method: 'DELETE' });
	if (!response.ok) throw new Error('No se pudo eliminar el comentario');
}
