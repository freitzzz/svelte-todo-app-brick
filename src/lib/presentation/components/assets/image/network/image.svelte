<!-- @component
Component for rendering a network asset image.
-->

<script lang="ts">
	import type { ShirtSize } from '../size';
	import type { ImageFormat } from '../format';
	import Image from '../image.svelte';

	export let host: string;
	export let name: string;
	export let alt: string;
	export let size: ShirtSize;
	export let format: ImageFormat;
</script>

<Image {host} {name} {alt} {size} {format} />
