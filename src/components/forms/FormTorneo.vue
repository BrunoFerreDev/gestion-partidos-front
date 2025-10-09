<template>
  <div
    class="mx-auto p-6 bg-white max-w-4xl my-10 border border-gray-200 rounded-lg shadow-xl"
  >
    <h2 class="text-2xl font-bold mb-2 text-gray-800">Crear Torneo</h2>
    <form @submit.prevent="guardarTorneo" class="grid grid-cols-2 gap-5">
      <!-- Nombre -->
      <div>
        <label
          class="flex flex-col gap-2 mt-2 text-lg font-medium text-gray-700"
          >Nombre
          <input
            v-model="form.nombre"
            type="text"
            required
            placeholder="Nombre del torneo"
            class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3 placeholder-gray-400"
          />
        </label>
        <label
          class="flex flex-col gap-2 mt-2 text-lg font-medium text-gray-700"
          >Temporada
          <input
            v-model="form.temporada"
            type="number"
            min="2020"
            max="2100"
            required
            placeholder="Temporada"
            class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3 placeholder-gray-400"
          />
        </label>
      </div>

      <!-- Categoría  y Tipo de torneo-->
      <div>
        <div class="flex flex-col gap-2 mt-2">
          <label class="flex text-lg font-medium text-gray-700"
            >Categoría</label
          >
          <select
            v-model="form.categoria"
            class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3"
          >
            <option value="">Seleccionar...</option>
            <option value="Primera">Primera</option>
            <option value="Reserva">Reserva</option>
            <option value="Sub-20">Sub-20</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div class="flex flex-col gap-2 mt-2">
          <label class="flex text-lg font-medium text-gray-700"
            >Tipo de torneo</label
          >
          <select
            v-model="form.tipo"
            class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-3"
          >
            <option value="">Seleccionar...</option>
            <option value="Liga">Liga (todos contra todos)</option>
            <option value="Eliminacion">Eliminación directa</option>
            <option value="Mixto">Mixto</option>
          </select>
        </div>
      </div>
      <!-- Fechas -->
      <label
        class="flex flex-col justify-center gap-2 text-lg font-medium text-gray-700"
        >Fecha de inicio
        <input
          v-model="form.fechaInicio"
          type="date"
          required
          class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
        />
      </label>
      <label
        class="flex flex-col justify-center gap-2 text-lg font-medium text-gray-700"
        >Fecha de fin
        <input
          v-model="form.fechaFin"
          type="date"
          class="rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
        />
      </label>
      <!-- Botón -->
      <button
        @click="verificarForm()"
        type="submit"
        class="col-span-2 mt-6 w-2/4 mx-auto bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Crear Torneo
      </button>
      <BaseModal
        :show="mostrarModal"
        message="Se registrara el torneo"
        confirmText="Confirmar"
        @confirm="guardarTorneo"
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
const form = ref({
  nombre: "",
  temporada: "",
  categoria: "",
  tipo: "",
  fechaInicio: "",
  fechaFin: "",
});

const guardarTorneo = () => {
  // Lógica para guardar el torneo
};
const verificarForm = () => {
  if (
    form.value.nombre &&
    form.value.temporada &&
    form.value.categoria &&
    form.value.tipo &&
    form.value.fechaInicio &&
    form.value.fechaFin
  ) {
    mostrarModal.value = true;
  } else {
    mostrarModal.value = false;
  }
};
</script>
