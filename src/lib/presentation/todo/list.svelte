<script lang="ts">
	import { Todo } from '@models';
	import { CheckList, type CheckBoxItem } from '../components';

	export let values: Todo[];
	export let onNewTodo: (todo: Todo) => void;
	export let onUpdateTodo: (todo: Todo) => void;
	export let onDeleteTodos: () => void;

	let newTodoInput: HTMLInputElement;

	$: checkListValues = values.map((t) => {
		return {
			id: t.id,
			value: t.value,
			active: t.done
		} satisfies CheckBoxItem;
	});

	$: completed = checkListValues.filter((x) => x.active);
</script>

<div class="card">
	<div class="card-body">
		<h2 class="card-header">TODO</h2>
		<input
			bind:this={newTodoInput}
			class="input"
			type="text"
			placeholder="New todo..."
			on:keypress={(event) => {
				if (event.key === 'Enter') {
					onNewTodo(Todo(newTodoInput.value));

					newTodoInput.value = '';
				}
			}}
		/>
		<CheckList
			values={checkListValues}
			onChanged={(value) => {
				const todo = values.find((x) => x.id === value.id);

				if (todo) {
					todo.done = value.active;
					todo.value = value.value;

					onUpdateTodo(todo);
				}
			}}
		/>
		<div class="flex justify-center">
			<button
				class="btn btn-primary w-fit"
				disabled={completed.length === 0}
				on:click={() => {
					onDeleteTodos();
				}}
			>
				Delete completed
			</button>
		</div>
		<h3 class="card-footer justify-end text-sm italic">
			<span>Updated ({new Date().toLocaleTimeString()})</span>
		</h3>
	</div>
</div>
