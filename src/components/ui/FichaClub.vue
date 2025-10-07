<!-- ================= FICHA CLUB ================= -->
<template>
  <div class="bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow p-6 m-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Ficha de Club</h2>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs text-gray-500">Nombre del Club</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            club.nombre ? club.nombre : "No especificado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Fundación</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            club.fundacion ? club.fundacion : "No especificado"
          }}</span>
        </div>
        <div>
          <label class="block text-xs text-gray-500">Estado</label>
          <span
            :class="
              club.estado === 'ACTIVO' ? 'text-green-700' : 'text-red-700'
            "
            class="mt-1 block w-full font-bold rounded border px-3 py-2"
            >{{ club.estado ? club.estado : "No especificado" }}</span
          >
        </div>
        <div>
          <label class="block text-xs text-gray-500">Ciudad</label>
          <span class="mt-1 block w-full rounded border px-3 py-2">{{
            club.ciudad ? club.ciudad : "No especificado"
          }}</span>
        </div>
        <div class="col-span-2">
                <label class="block text-xs text-gray-500">Presidente</label>
                <span class="mt-1 block w-full rounded border px-3 py-2" >{{ club.presidente?club.presidente:"No especificado" }}</span>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const club = defineProps({
  type: Object,
  required: true,
  default: () => {
    return {
      nombre: " - NO CARGADO",
      fundacion: " - NO CARGADO",
      estado: " - NO CARGADO",
      ciudad: " - NO CARGADO",
    };
  },
});
</script>
