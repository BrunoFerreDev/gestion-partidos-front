<template>
  <div class="bg-gray-100 p-3" v-if="jugador">
    <!-- Header -->
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-lg font-semibold bg-white px-4 py-2 rounded-2xl shadow">
        {{ jugador.nombre + " " + jugador.apellido }}
      </h1>

    </div>

    <!-- Card -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-15 gap-6 items-start">
        <!-- Left: Avatar -->
        <div class="col-span-4 flex flex-col items-center">
          <div
            class="w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center"
          >
            <img
              alt="avatar"
              :src="jugador.avatar"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="mt-4 w-full flex gap-2">
            <button
              class="flex-1 py-2 rounded-lg border text-sm hover:bg-gray-200"
            >
              Cambiar
            </button>
            <button
              class="flex-1 py-2 rounded-lg border text-sm hover:bg-gray-200"
            >
              Documentos
            </button>
          </div>
          <div class="mt-4 w-full flex gap-2">
            <span>Estado:</span>
            <span class="text-green-600">Activo</span>
          </div>
        </div>

        <!-- Middle: Basic info -->
        <div class="col-span-11">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-xs text-gray-500">Núm</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.numero ? jugador.numero : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500">Apellidos</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.apellido ? jugador.apellido : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500">Nombres</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.nombre ? jugador.nombre : "No especificado"
              }}</span>
            </div>
            <div>
              <label class="block text-xs text-gray-500">Cédula</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.cedula ? jugador.cedula : "No especificado"
              }}</span>
            </div>
            <div>
              <label class="block text-xs text-gray-500">Nacionalidad</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.nacionalidad ? jugador.nacionalidad : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500"
                >Fecha de nacimiento</label
              >
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.fechaNacimiento
                  ? jugador.fechaNacimiento
                  : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500"
                >País de nacimiento</label
              >
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.paisNacimiento
                  ? jugador.paisNacimiento
                  : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500">Género</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.genero ? jugador.genero : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500">Club Actual</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.nombreClub ? jugador.nombreClub : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500"
                >Ciudad de nacimiento</label
              >
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.ciudadNacimiento
                  ? jugador.ciudadNacimiento
                  : "No especificado"
              }}</span>
            </div>

            <div>
              <label class="block text-xs text-gray-500">Posición</label>
              <span class="mt-1 block w-full rounded border px-3 py-2">{{
                jugador.posicion ? jugador.posicion : "No especificado"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jugador = defineProps({
  type: Object,
  required: true,
  default: () => {
    nombre: "NO CARGADO";
    apellido: "NO CARGADO";
  },
});
</script>
