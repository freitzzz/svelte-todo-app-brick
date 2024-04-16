<script>
	import '../app.css';
	import { vault } from '@core';
	import { ReactorProvider } from '@web-pacotes/reactor-svelte';
	import { TodoFetched, TodoReactor } from '@reactors';

	const appVault = vault(window?.window);

	const todos = new TodoReactor(appVault.todosRepository);
	todos.add(TodoFetched());
</script>

<ReactorProvider reactor={todos}>
	<slot />
</ReactorProvider>
