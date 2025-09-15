<template>
  <div class="mx-auto p-6 bg-white rounded-2xl shadow-md max-w-4xl my-10 border">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Crear Torneo</h2>
    <form @submit.prevent="guardarTorneo" class="flex flex-col space-y-4">
      <!-- Nombre -->
      <div class="flex items-center gap-2">
        <label class="flex flex-col w-2/4 text-lg font-medium text-gray-700">Nombre
          <input v-model="form.nombre" type="text" required
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10" />
        </label>
        <label class="flex flex-col w-2/4 text-lg font-medium text-gray-700">Temporada
          <input v-model="form.temporada" type="number" min="2020" max="2100" required
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10" />
        </label>
      </div>

      <!-- Categoría  y Tipo de torneo-->
      <div class="flex gap-4 items-start">
        <div class="flex flex-col items-start gap-2 w-2/4">
          <label class="flex text-lg font-medium text-gray-700">Categoría</label>
          <select v-model="form.categoria"
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10">
            <option value="">Seleccionar...</option>
            <option value="Primera">Primera</option>
            <option value="Reserva">Reserva</option>
            <option value="Sub-20">Sub-20</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div class="flex flex-col items-start gap-2 w-2/4">
          <label class="flex text-lg font-medium text-gray-700">Tipo de torneo</label>
          <select v-model="form.tipo"
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10">
            <option value="">Seleccionar...</option>
            <option value="Liga">Liga (todos contra todos)</option>
            <option value="Eliminacion">Eliminación directa</option>
            <option value="Mixto">Mixto</option>
          </select>
        </div>
      </div>
      <!-- Fechas -->
      <div class="flex items-center justify-around gap-2">
        <label class="flex flex-col text-lg font-medium text-gray-700 w-2/4">Fecha de inicio
          <input v-model="form.fechaInicio" type="date" required
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10" />
        </label>
        <label class="flex flex-col text-lg font-medium text-gray-700 w-2/4">Fecha de fin
          <input v-model="form.fechaFin" type="date" 
            class="mt-1 p-2 w-full rounded-lg border shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10" />
        </label>
      </div>

      <!-- Botón -->
      <div class="pt-4 flex items-center justify-center">
        <button type="submit"
          class="w-2/4 self-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
          Crear Torneo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RegistrarTorneo",
  data() {
    return {
      form: {
        nombre: "",
        temporada: "",
        categoria: "",
        tipo: "",
        fechaInicio: "",
        fechaFin: "",
        reglamentoUrl: "",
        zonas: "",
      },
    };
  },
  methods: {
    crearTorneo() {
      console.log("Torneo creado:", this.form);
      // Aquí iría tu llamada al backend con fetch o axios
      // axios.post("/api/torneos", this.form).then(...)
      axios.post("http://localhost:8080/api/torneo", this.form).then(response => {
        console.log(response.data);
      });
    },
    guardarTorneo() {
      if (confirm("¿Estas seguro de guardar el torneo?")) {
        this.crearTorneo();
      } else {
        alert("Torneo no guardado ❌");
        location.reload();
      }
    }
  },
};
</script>
