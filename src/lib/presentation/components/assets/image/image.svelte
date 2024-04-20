<!-- @component
Core component for rendering an asset image.
-->

<script lang="ts">
	import type { ShirtSize } from './size';
	import type { ImageFormat } from './format';

	export let host: string;
	export let name: string;
	export let alt: string;
	export let size: ShirtSize;
	export let format: ImageFormat;
</script>

<img src="{host}/{format}/{size}/{name}.{format}" {alt} loading="lazy" />
