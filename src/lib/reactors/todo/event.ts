import type { Todo } from '@models';
import { isTypedOf } from '@web-pacotes/reactor-svelte';

export function TodoCreated(value: Todo) {
	return {
		type: 'todo-created',
		value: value
	};
}

export function TodoFetched() {
	return {
		type: 'todo-fetched'
	};
}

export type TodoCreated = ReturnType<typeof TodoCreated>;
export type TodoFetched = ReturnType<typeof TodoFetched>;
export type TodoEvent = TodoCreated | TodoFetched;

export const isTodoCreated = (event: TodoEvent) => isTypedOf<TodoCreated>(event, 'todo-created');
export const isTodoFetched = (event: TodoEvent) => isTypedOf<TodoFetched>(event, 'todo-fetched');
