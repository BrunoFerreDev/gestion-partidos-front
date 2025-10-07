<!-- ================= FICHA ÁRBITRO ================= -->
<template>
  <div class="bg-gray-100 p-6">
    <div class="bg-white rounded-lg shadow p-6 m-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Ficha de Árbitro</h2>
     
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500">Nombre</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            arbitro.nombre ? arbitro.nombre : "No encontrado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Apellido</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            arbitro.apellido ? arbitro.apellido : "No encontrado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Fecha de nacimiento</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            arbitro.fechaNacimiento ? arbitro.fechaNacimiento : "No encontrado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Nacionalidad</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            arbitro.nacionalidad ? arbitro.nacionalidad : "No encontrado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Categoría</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            arbitro.categoria ? arbitro.categoria : "No encontrado"
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { IconArrowLeft } from '@tabler/icons-vue';

const arbitro = defineProps({
  type: Object,
  required: true,
  default: () => {
    nombre: "NO CARGADO";
    apellido: "NO CARGADO";
    fechaNacimiento: "NO CARGADO";
    nacionalidad: "NO CARGADO";
    categoria: "NO CARGADO";
  },
});
</script>
