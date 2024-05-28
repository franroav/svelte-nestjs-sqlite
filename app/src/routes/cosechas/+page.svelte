<script lang="ts">
    import { onMount } from 'svelte';
    import { getServiceData, getBackendService } from '$lib/api/apiService';
    import Time from "svelte-time";

    let cosechas: any[] = [];
    let service = "cosechas"
    onMount(async () => {
      cosechas = await getBackendService(service);
    });
  </script>

<div class="flex justify-center">
	<div class="grid grid-cols-1 min-w-full md:min-w-[450px]">
		<h3 class="text-center">Frutas</h3>
		<div class="card p-4 mt-2">
      <table class="table-auto text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Frutas</th>
            <th>Campos</th>
            <th>Variedad</th>
            <th>Agricultor</th>
            <th>Fecha Cosecha</th>
            <th>Cantidad</th>
            <th>Creado</th>
            <th>Actualizado</th>
          </tr>
        </thead>
        <tbody>

          {#each cosechas as cosecha}
          <tr>
            <td>{cosecha.nombre}</td>
            <td>{cosecha.frutaId}</td>
            <td>{cosecha.campoId}</td>
            <td>{cosecha.agricultorId}</td>
            <td>{cosecha.campoId}</td>
            <td>{cosecha.fechaCosecha}</td>
            <td>{cosecha.cantidad}</td>
            <!-- <td>{cosecha.variedad}</td> -->
            <td class="px-5"><Time timestamp={new Date(cosecha.createdAt)} format="YYYY/MM/DD" /></td>
            <td class="px-5"><Time relative timestamp={new Date(cosecha.updatedAt)} format="YYYY/MM/DD" /></td>
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