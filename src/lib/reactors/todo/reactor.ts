import { Reactor } from '@web-pacotes/reactor-svelte';
import { isTodoCreated, TodoCreated, type TodoEvent } from './event';
import { TodoInitial, TodoUpdate, type TodoState } from './state';

export class TodoReactor extends Reactor<TodoEvent, TodoState> {
	constructor() {
		super(TodoInitial());

		this.on<TodoCreated>((event, emit) => {
			emit(TodoUpdate([...this.state.value, event.value]));
		}, isTodoCreated);
	}
}
