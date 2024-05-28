<script lang="ts">
    import { onMount } from 'svelte';
    import { getServiceData, getBackendService } from '$lib/api/apiService';
    import Time from "svelte-time";
    let variedades: any[] = [];
    let service = "variedades"
    onMount(async () => {
      variedades = await getBackendService(service);
    });
  </script>

<div class="flex justify-center">
	<div class="grid grid-cols-1 min-w-full md:min-w-[450px]">
		<h3 class="text-center">Variedades</h3>
		<div class="card p-4 mt-2">
      <table class="table-auto text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>frutaId</th>
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>

          {#each variedades as variedad}
          <tr>
            <td>{variedad.nombre}</td>
            <td>{variedad.frutaId}</td>
            <!-- <td>{variedad.variedad}</td> -->
            <td class="px-5"><Time timestamp={new Date(variedad.createdAt)} format="YYYY/MM/DD" /></td>
            <td class="px-5"><Time relative timestamp={new Date(variedad.updatedAt)} format="YYYY/MM/DD" /></td>
          </tr>
          {/each}

        </tbody>
      </table>
		</div>
	</div>
</div>
  
  <style>
    /* Tailwind classes handle most styling */
  </style>