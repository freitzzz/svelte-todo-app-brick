import type { Todo } from '@models';

export function TodoInitial(value: Todo[] = []) {
	return {
		type: 'todo-initial' as const,
		value: value
	};
}

export function TodoUpdate(value: Todo[]) {
	return {
		type: 'todo-update' as const,
		value: value
	};
}

export type TodoInitial = ReturnType<typeof TodoInitial>;
export type TodoUpdate = ReturnType<typeof TodoUpdate>;
export type TodoState = { value: Todo[] } & (TodoInitial | TodoUpdate);
