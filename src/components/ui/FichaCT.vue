<template>
  <div class="bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold mb-4">Ficha de Cuerpo Técnico</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500">Nombre</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            ct.nombre?ct.nombre:"No especificado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Apellido</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            ct.apellido?ct.apellido:"No especificado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Cargo</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            ct.cargo?ct.cargo:"No especificado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Nacionalidad</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            ct.nacionalidad?ct.nacionalidad:"No especificado"
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const ct = defineProps({
  type: Object,
  required: true,
  default: () => {
    return {
      nombre: " - NO CARGADO",
      apellido: " - NO CARGADO",
      cargo: " - NO CARGADO",
      nacionalidad: " - NO CARGADO",
    };
  },
});
</script>
