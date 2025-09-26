<template>
    <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-semibold mb-2">Registro de Club</h2>

    <form class="grid grid-cols-2 md:grid-cols-2 gap-6 border border-gray-200 rounded-lg shadow-xl p-6 bg-white">

      <!-- Nombre del club -->
      <div>
        <label class="block text-sm font-medium mb-1">Nombre del Club</label>
        <input type="text" v-model="club.nombre"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- Fundación -->
      <div>
        <label class="block text-sm font-medium mb-1">Fecha de Fundación</label>
        <input type="date" v-model="club.fundacion"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- Ciudad -->
      <div>
        <label class="block text-sm font-medium mb-1">Ciudad</label>
        <input type="text" v-model="club.ciudad"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- Estadio -->
      <div>
        <label class="block text-sm font-medium mb-1">Estadio</label>
        <input type="text" v-model="club.estadio"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300" />
      </div>

      <!-- Colores -->
      <div>
        <label class="block text-sm font-medium mb-1">Colores Representativos</label>
        <input type="text" v-model="club.colores"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Ej: Rojo y blanco" />
      </div>

      <!-- Botones -->
      <div class="md:col-span-2 flex justify-end space-x-4 mt-4">
        <button type="button" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">
          Cancelar
        </button>
        <button type="submit" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
          Guardar
        </button>
      </div>

    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const club = ref({
  nombre: '',
  fundacion: '',
  ciudad: '',
  estadio: '',
  colores: '',
});

const guardarClub = () => {
  // Lógica para guardar el club
};
</script>