<script>
	import '../app.css';
	import { vault } from '@core';
	import { ReactorProvider } from '@web-pacotes/reactor-svelte';
	import { TodoFetched, TodoReactor } from '@reactors';
	import { browser } from '$app/environment';

	const appVault = vault(browser ? window.window : undefined);

	const todos = new TodoReactor(appVault.todosRepository);
	todos.add(TodoFetched());
</script>

<ReactorProvider reactor={todos}>
	<slot />
</ReactorProvider>
