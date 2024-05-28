<script lang="ts">
	// import { CodeBlock } from '@skeletonlabs/skeleton';
	import { deleteSnippet, toggleFavorite, addSnippet, snippetStore, } from './SnippetStore';
	import { onMount } from 'svelte';
	import {
		getServiceData,
		getBackendService,
		saveHarvestOnBackendService
	} from '$lib/api/apiService';
	import Time from 'svelte-time';
	let cosechas: any[] = [];
	let service = 'harvests';

	let formData: CodeSnippetInput = {
		title: '',
		language: 'html',
		code: ''
	};

	export let snippet: CodeSnippet = {
		title: '',
		language: '',
		code: '',
		favorite: false
	};

	export let snippetHarvest: HarvestInterface = {
		// title: '',
		// language: '',
		comments: '',
		favorite: false,
		id: '',
		grower: {
			id: '',
			name: '',
			lastName: '',
			email: ''
		},
		farm: {
			id: '',
			name: '',
			address: ''
		},
		client: {
			id: '',
			name: '',
			lastName: '',
			email: ''
		},
		commodity: {
			id: '',
			name: ''
		},
		variety: {
			id: '',
			name: ''
		},
		createdAt: ''
	};

	export let index: number;

	const setSnippet = async (harvest: any) => {
		snippetHarvest.grower.name = harvest.grower.name;
		snippetHarvest.grower.lastName = harvest.grower.lastName;
		snippetHarvest.grower.email = harvest.grower.email;
		snippetHarvest.farm.name = harvest.farm.name;
		snippetHarvest.farm.address = harvest.farm.address;
		snippetHarvest.commodity.name = harvest.commodity.name;
		snippetHarvest.variety.name = harvest.variety.name;
		snippetHarvest.client.name = harvest.client.name;
        snippetHarvest.client.lastName = harvest.client.lastName;
        snippetHarvest.client.email = harvest.client.email;
		// const { harvests } = await getServiceData(service);
		// console.log("", harvests)
		// cosechas = harvests
	};

	onMount(async () => {
		const { harvests } = await getServiceData(service);
		console.log('', harvests);
		cosechas = harvests;
	});
</script>

<div class="grid grid-cols-1 gap-4 min-w-full md:min-w-[750px]">
	<h3 class="text-center py-6"><em>Crear una nueva cosecha</em></h3>
	<div class="card p-4 w-full text-token space-y-4">
		<label class="label">
			<span>Agricultor</span>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar nombre aqui..."
				bind:value={snippetHarvest.grower.name}
			/>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar apellido aqui..."
				bind:value={snippetHarvest.grower.lastName}
			/>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar email aqui..."
				bind:value={snippetHarvest.grower.email}
			/>
		</label>
		<label class="label">
			<span>Frutas</span>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar nombre aqui..."
				bind:value={snippetHarvest.commodity.name}
			/>
		</label>
		<label class="label">
			<span>Variedad</span>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar nombre aqui..."
				bind:value={snippetHarvest.variety.name}
			/>
		</label>
		<label class="label">
			<span>Campo</span>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar nombre aqui..."
				bind:value={snippetHarvest.farm.name}
			/>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar direccion aqui..."
				bind:value={snippetHarvest.farm.address}
			/>
		</label>
		<label class="label">
			<span>Cliente</span>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar nombre aqui..."
				bind:value={snippetHarvest.client.name}
			/>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar apellido aqui..."
				bind:value={snippetHarvest.client.lastName}
			/>
			<input
				class="input my-1"
				type="text"
				placeholder="ingresar email aqui..."
				bind:value={snippetHarvest.client.email}
			/>
		</label>

		<label class="label">
			<span>Favorito</span>
			<label
				><input type="checkbox" id="cbox1" bind:value={snippetHarvest.favorite} /> Esta es mi cosecha favorita</label
			><br />
			<!-- <select class="select" >
				<option value="html">HTML</option>
				<option value="css">CSS</option>
				<option value="typescript">TypeScript</option>
			</select> -->
		</label>
		<label class="label">
			<span>Comentarios</span>
			<textarea
				class="textarea"
				rows="4"
				placeholder="observacion de mi cosecha..."
				bind:value={snippetHarvest.comments}
			/>
		</label>
        
        <button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() => saveHarvestOnBackendService(service, snippetHarvest)}
		>
			Guardar Nueva Cosecha
		</button>

		<!-- <button
			type="button"
			class="btn btn-sm variant-filled-primary"
			on:click={() => addSnippet(formData)}
		>
			Guardar Nueva Cosecha
		</button> -->
	</div>
	<div class="text-center py-6">
		<h2><em>Mis Cosechas</em></h2>
	</div>
</div>
<div class="card">
	<header class="card-header">
		{'Colleción N° ' + Number(index + 1)}
		<div class="float-right">
			<button
				type="button"
				class="btn btn-sm variant-filled-error"
				on:click={() => deleteSnippet(index)}
			>
				X
			</button>
		</div>
	</header>
	<section class="p-4">
		<div class="flex justify-center">
			<div class="grid grid-cols-1 min-w-full md:min-w-[450px]">
				<h3 class="text-center">Cosechas</h3>
				<div class="card p-4 mt-2">
					<table class="table-auto text-center">
						<thead>
							<tr>
								<th>Agricultor</th>
								<th>Frutas</th>
								<th>Cliente</th>
								<th>Creado</th>
								<th>Actualizado</th>
								<th>Acciones</th>
                                <!-- <th></th> -->
							</tr>
						</thead>
						<tbody>
							{#each cosechas as fruit, index}
								<tr>
									<td>
										<ul>
											<li>
												{fruit.grower.name +
													' ' +
													fruit.grower.lastName +
													' ' +
													' | ' +
													fruit.grower.email +
													' | ' +
													fruit.farm.name +
													' | ' +
													fruit.farm.address}
											</li>
										</ul>
									</td>
									<td>
										<ul>
											<li>{fruit.commodity.name + ' ' + ' | ' + fruit.variety.name}</li>
										</ul>
									</td>
									<td>
										<ul>
											<li>
												{fruit.client.name +
													' ' +
													fruit.client.lastName +
													' | ' +
													fruit.client.email}
											</li>
										</ul>
									</td>
									<!-- <td>{fruit.variedad}</td> -->
									<td class="px-5"
										><Time timestamp={new Date(fruit.createdAt)} format="YYYY/MM/DD" /></td
									>
									<td class="px-5"
										><Time relative timestamp={new Date(fruit.updatedAt)} format="YYYY/MM/DD" /></td
									>
									<td>
										<button
											type="button"
											class="btn btn-sm variant-filled-primary"
											on:click={() => setSnippet(fruit)}
										>
											Seleccionar Cosecha
										</button>
                                        
										<!-- <button type="button" class="btn btn-sm variant-filled-primary" on:click={() => saveHarvestOnBackendService(service, fruit)}>
                            Seleccionar Cosecha
                        </button> -->
									</td>
                                    <!-- <td>
                                        <button
                                        type="button"
                                        class="btn btn-sm variant-filled-secondary"
                                        on:click={() => toggleFavoriteHarvest(index)}
                                    >
                                        {toggleFavoriteHarvest(index) ? '🫣' : '🤩'}
                                    </button>
                                    </td> -->
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
	<!-- <section class="p-4">
		<CodeBlock language={snippet.language} code={snippet.code} />
	</section> -->
</div>
