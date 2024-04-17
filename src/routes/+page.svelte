<script lang="ts">
	import { TodoList } from '@presentation';
	import { TodoCreated, TodoReactor, TodosDeleted, TodoUpdated } from '@reactors';
	import { logMessage } from '@web-pacotes/lumberdash';
	import { ReactorListener, resolve } from '@web-pacotes/reactor-svelte';

	const todos = resolve(TodoReactor);
</script>

<div class="flex justify-center">
	<ReactorListener reactor={todos} listener={(state) => logMessage(`new state: ${state.type}`)}>
		<TodoList
			values={$todos.value}
			onNewTodo={(value) => todos.add(TodoCreated(value))}
			onUpdateTodo={(value) => todos.add(TodoUpdated(value))}
			onDeleteTodos={() => todos.add(TodosDeleted())}
		/>
	</ReactorListener>
</div>
