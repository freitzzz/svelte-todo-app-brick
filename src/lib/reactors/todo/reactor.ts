import {
	isTodoCreated,
	isTodoFetched,
	TodoCreated,
	type TodoEvent,
	type TodoFetched
} from './event';
import { TodoInitial, type TodoState, TodoUpdate } from './state';
import { logError, logMessage } from '@web-pacotes/lumberdash';
import type { TodosRepository } from '@data';
import { Reactor } from '@web-pacotes/reactor-svelte';
import { fold, wrap } from '@web-pacotes/foundation-types';

/**
 * A reactor that manages the state of todo actions.
 */
export class TodoReactor extends Reactor<TodoEvent, TodoState> {
	constructor(repository: TodosRepository) {
		super(TodoInitial([]));

		this.on<TodoCreated>(async (event, emit) => {
			const todo = event.value;

			logMessage(`Received new todo: ${todo.value}`);

			if (todo.value.trim().length > 0) {
				await repository.add(todo);

				emit(TodoUpdate([...this.state.value, event.value]));
			}
		}, isTodoCreated);

		this.on<TodoFetched>(async (event, emit) => {
			logMessage(`Fetching all todos...`);

			const result = await repository.all();

			emit(
				fold(
					result,
					(l) => {
						logError(wrap(l));

						return this.state;
					},
					(r) => TodoUpdate(r)
				)
			);
		}, isTodoFetched);
	}
}
