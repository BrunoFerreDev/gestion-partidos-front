<template>
  <div class="bg-gray-100 p-6">
    <div class="mx-auto">
      <!-- Header -->
      <div class="mb-4 inline-block bg-white px-4 py-2 rounded-2xl shadow">
        <h1 class="text-lg font-semibold">NOMBRE DE JUGADOR</h1>
      </div>

      <!-- Card -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-15 gap-6 items-start">
          <!-- Left: Avatar -->
          <div class="col-span-4 flex flex-col items-center">
            <div
              class="w-48 h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              <img alt="avatar" :src="jugador.avatar" class="object-cover w-full h-full" />
            </div>
            <div class="mt-4 w-full flex gap-2">
              <button class="flex-1 py-2 rounded-lg border text-sm">Cambiar</button>
              <button class="flex-1 py-2 rounded-lg border text-sm">Documentos</button>
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
                <input v-model="jugador.numero" class="mt-1 block w-full rounded border px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs text-gray-500">Apellidos</label>
                <input v-model="jugador.apellido1" class="rounded border px-3 py-2" placeholder="PEREZ" />
              </div>

              <div>
                <label class="block text-xs text-gray-500">Nombres</label>
                <input v-model="jugador.nombre1" class="rounded border px-3 py-2" placeholder="PEDRO" />
              </div>
              <div>
                <label class="block text-xs text-gray-500">Cédula</label>
                <input v-model="jugador.cedula" class="mt-1 block w-full rounded border px-3 py-2" />
              </div>
              <div>
                <label class="block text-xs text-gray-500">Nacionalidad</label>
                <div class="mt-1 flex">
                  <input v-model="jugador.nacionalidad" class="flex-1 rounded-l border px-3 py-2" />
                  <!-- <button class="px-3 rounded-r border-l">🔍</button> -->
                </div>
              </div>

              <div>
                <label class="block text-xs text-gray-500">Fecha de nacimiento</label>
                <input type="date" v-model="jugador.fechaNacimiento"
                  class="mt-1 block w-full rounded border px-3 py-2" />
              </div>



              <div>
                <label class="block text-xs text-gray-500">País de nacimiento</label>
                <input v-model="jugador.paisNacimiento" class="mt-1 block w-full rounded border px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs text-gray-500">Género</label>
                <select v-model="jugador.genero" class="mt-1 block w-full rounded border px-3 py-2">
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label class="block text-xs text-gray-500">Estado de nacimiento</label>
                <input v-model="jugador.estadoNacimiento" class="mt-1 block w-full rounded border px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs text-gray-500">Ciudad de nacimiento</label>
                <input v-model="jugador.ciudadNacimiento" class="mt-1 block w-full rounded border px-3 py-2" />
              </div>

              <div>
                <label class="block text-xs text-gray-500">Posición</label>
                <select v-model="jugador.posicion" class="mt-1 block w-full rounded border px-3 py-2">
                  <option>Centro campista</option>
                  <option>Delantero</option>
                  <option>Defensor</option>
                  <option>Portero</option>
                </select>
              </div>


            </div>
          </div>

          <!-- Right: compact grouped fields -->
          <!-- <div class="col-span-3">
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-500">Buscar / opciones</label>
                <div class="mt-1 flex gap-2">
                  <input v-model="jugador.nacionalidad" class="flex-1 rounded border px-3 py-2" />
                  <button class="px-3 rounded border">🔍</button>
                  <button class="px-3 rounded border">✖</button>
                </div>
              </div>

              <div>
                <label class="block text-xs text-gray-500">Notas administrativas</label>
                <textarea rows="4" class="mt-1 block w-full rounded border px-3 py-2" placeholder="Observaciones..." />
              </div>

              <div class="flex gap-2">
                <button class="flex-1 py-2 rounded bg-green-600 text-white">Guardar</button>
                <button class="flex-1 py-2 rounded border">Cancelar</button>
              </div>
            </div>
          </div> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const jugador = reactive({
  numero: "",
  fifaId: "",
  estado: "ACTIVO",
  cedula: "",
  genero: "Masculino",
  apellido1: "",
  apellido2: "",
  nombre1: "",
  nombre2: "",
  apodo: "",
  pasaporte: "",
  nacionalidad: "Venezuela",
  fechaNacimiento: "",
  paisNacimiento: "Venezuela",
  estadoNacimiento: "",
  ciudadNacimiento: "",
  padre: "",
  madre: "",
  posicion: "Centro campista",
  nombreTV: "",
  avatar: "",
});
</script>
