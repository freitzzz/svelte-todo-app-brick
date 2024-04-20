<!-- @component
Component for rendering a static asset image.
-->

<script lang="ts">
	import type { ShirtSize } from '../size';
	import type { ImageFormat } from '../format';
	import Image from '../image.svelte';
	import { base } from '$app/paths';

	export let name: string;
	export let alt: string;
	export let size: ShirtSize;
	export let format: ImageFormat;

	const host = base;
</script>

<Image {host} {name} {alt} {size} {format} />
