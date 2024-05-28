
<script lang="ts">
	import CodeSnippetCard from "../CodeSnippetCard.svelte";
	import { snippetStore } from "../SnippetStore";
	import type { PageData } from "./$types";
	export let data: PageData;
	// createSnippet(input : CodeSnippetInput)
	snippetStore.set(data.snippets);
	// SnippetStore -> a local writable that allows us to store code snippets
	// create / delete snippets
	// favorite snippets
	// +page.ts to initially load in some example snippets (mocking a database request)
</script>


<div class="flex justify-center">

	<div class="grid grid-cols-1 gap-4 min-w-full md:min-w-[750px]">
		<h1 class="text-center p-0 py-5">Bienvenidos a ONESTA FARM APP</h1>
		<h5 class="ml-5"><em>Links de interes</em></h5>
		<ul>
			<li><a class="ml-5" href="http://localhost:5173/frutas">Frutas</a></li>
			<li><a class="ml-5" href="http://localhost:5173/variedades">Variedades</a></li>
			<li><a class="ml-5" href="http://localhost:5173/agricultores">Agricultores</a></li>
			<li><a class="ml-5" href="http://localhost:5173/campos">Campos</a></li>
			<li><a class="ml-5" href="http://localhost:5173/clientes">Clientes</a></li>
		</ul>
		<h1 class="text-center p-0 py-5"></h1>
		{#each $snippetStore as snippet, index}
			<CodeSnippetCard snippet={snippet} index={index} /> <!--WE NEED PROPERTIES-->
		{/each}
	</div>
</div>
