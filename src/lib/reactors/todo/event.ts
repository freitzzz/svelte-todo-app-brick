import type { Todo } from '@models';
import { isTypedOf } from '@web-pacotes/reactor-svelte';

export function TodoCreated(value: Todo) {
	return {
		type: 'todo-created',
		value: value
	};
}

export type TodoCreated = ReturnType<typeof TodoCreated>;
export type TodoEvent = TodoCreated;

export const isTodoCreated = (event: TodoEvent) => isTypedOf<TodoCreated>(event, 'todo-created');
