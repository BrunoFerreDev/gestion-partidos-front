<template>
  <div class="p-6 max-w-5xl mx-auto">
    <h2 class="text-2xl font-semibold mb-2">
      Registro de Entrenador / Cuerpo Técnico
    </h2>

    <form
      class="grid grid-cols-2 md:grid-cols-2 gap-6 border border-gray-200 rounded-lg shadow-xl p-6 bg-white"
    >
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          v-model="entrenador.nombre"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Apellido -->
      <div>
        <label class="block text-sm font-medium mb-1">Apellido</label>
        <input
          type="text"
          v-model="entrenador.apellido"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- DNI -->
      <div>
        <label class="block text-sm font-medium mb-1">DNI</label>
        <input
          type="text"
          v-model="entrenador.dni"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Fecha de nacimiento -->
      <div>
        <label class="block text-sm font-medium mb-1"
          >Fecha de Nacimiento</label
        >
        <input
          type="date"
          v-model="entrenador.fechaNacimiento"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <!-- Rol -->
      <div class="md:col-span-1">
        <label class="block text-sm font-medium mb-1">Rol</label>
        <select
          v-model="entrenador.rol"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione un rol</option>
          <option value="dt">Director Técnico</option>
          <option value="ayudante">Ayudante de Campo</option>
          <option value="preparador">Preparador Físico</option>
          <option value="medico">Médico</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <!-- Club -->
      <div class="md:col-span-1">
        <label class="block text-sm font-medium mb-1">Club</label>
        <input
          type="text"
          v-model="entrenador.club"
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
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Guardar
        </button>
      </div>
      <BaseModal
        :show="mostrarModal"
        message="Se registrara el entrenador"
        confirmText="Confirmar"
        @confirm="guardarEntrenador"
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
const entrenador = ref({
  nombre: "",
  apellido: "",
  dni: "",
  fechaNacimiento: "",
  rol: "",
  club: "",
});

const guardarEntrenador = () => {
  // Lógica para guardar el entrenador
};
const verificarForm = () => {
  if (
    entrenador.value.nombre &&
    entrenador.value.apellido &&
    entrenador.value.dni &&
    entrenador.value.fechaNacimiento &&
    entrenador.value.rol &&
    entrenador.value.club
  ) {
    mostrarModal.value = true;
  } else {
    mostrarModal.value = false;
  }
};
</script>
