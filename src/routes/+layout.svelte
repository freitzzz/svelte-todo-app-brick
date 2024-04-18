<script>
	import '../app.css';
	import { vault } from '@core';
	import { MultiReactorProvider } from '@web-pacotes/reactor-svelte';
	import { TodoFetched, TodoReactor, AlertsReactor } from '@reactors';
	import { browser } from '$app/environment';
	import { ToastGroup } from '@presentation';

	const appVault = vault(browser ? window.window : undefined);

	const todos = new TodoReactor(appVault.todosRepository);
	const alerts = new AlertsReactor();

	todos.add(TodoFetched());
</script>

<MultiReactorProvider reactors={[todos, alerts]}>
	<slot />

	<ToastGroup values={$alerts.value} />
</MultiReactorProvider>
