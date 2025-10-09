<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-semibold mb-2">Registro de Árbitro</h2>
    <form
      @submit.prevent="guardarArbitro"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded-lg shadow-xl p-6 bg-white"
    >
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input
          required
          type="text"
          v-model="arbitro.nombre"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Apellido -->
      <div>
        <label class="block text-sm font-medium mb-1">Apellido</label>
        <input
          required
          type="text"
          v-model="arbitro.apellido"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- DNI -->
      <div>
        <label class="block text-sm font-medium mb-1">DNI</label>
        <input
          required
          type="text"
          v-model="arbitro.dni"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Fecha de nacimiento -->
      <div>
        <label class="block text-sm font-medium mb-1"
          >Fecha de Nacimiento</label
        >
        <input
          required
          type="date"
          v-model="arbitro.fechaNacimiento"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- telefono -->
      <div>
        <label class="block text-sm font-medium mb-1">Telefono</label>
        <input
          required
          type="text"
          v-model="arbitro.telefono"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          required
          type="email"
          v-model="arbitro.email"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Botones -->
      <div class="md:col-span-2 flex justify-end space-x-4 mt-4">
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          @click.prevent="verificarForm()"
          type="submit"
          class="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition"
        >
          Guardar
        </button>
      </div>
      <BaseModal
        :show="mostrarModal"
        message="Se registrara el árbitro"
        confirmText="Confirmar"
        @confirm="guardarArbitro"
        @close="mostrarModal = false"
        classButton="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      />
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import BaseModal from "../ui/BaseModal.vue";
const mostrarModal = ref(false);
const arbitro = ref({
  nombre: "",
  apellido: "",
  dni: "",
  fechaNacimiento: "",
  telefono: "",
  email: "",
});
const verificarForm = () => {
  if (
    arbitro.value.nombre &&
    arbitro.value.apellido &&
    arbitro.value.dni &&
    arbitro.value.fechaNacimiento &&
    arbitro.value.telefono &&
    arbitro.value.email
  ) {
    mostrarModal.value = true;
  } else {
    mostrarModal.value = false;
  }
};
const guardarArbitro = () => {
  // Lógica para guardar el árbitro
};
</script>
