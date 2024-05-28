<script lang="ts">
  import { onMount } from 'svelte';
  import { getServiceData, getBackendService } from '$lib/api/apiService';
  import Time from "svelte-time";

  let fruits: any[] = [];
  let service = "clientes"
  onMount(async () => {
    fruits = await getBackendService(service);
  });
</script>

<div class="flex justify-center">
<div class="grid grid-cols-1 min-w-full md:min-w-[450px]">
  <h3 class="text-center">Clientes</h3>
  <div class="card p-4 mt-2">
    <table class="table-auto text-center">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Creado</th>
          <th>Actualizado</th>
        </tr>
      </thead>
      <tbody>

        {#each fruits as fruit}
        <tr>
          <td>{fruit.nombre}</td>
          <td>{fruit.email}</td>
          <!-- <td>{fruit.variedad}</td> -->
          <td class="px-5"><Time timestamp={new Date(fruit.createdAt)} format="YYYY/MM/DD" /></td>
          <td class="px-5"><Time relative timestamp={new Date(fruit.updatedAt)} format="YYYY/MM/DD" /></td>
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