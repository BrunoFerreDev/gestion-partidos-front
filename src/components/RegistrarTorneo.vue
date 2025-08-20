<template>
  <div class="mx-auto p-6 bg-white rounded-2xl shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Crear Torneo</h2>

    <form @submit.prevent="crearTorneo" class="space-y-4">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          v-model="form.nombre"
          type="text"
          required
          class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
        />
      </div>

      <!-- Temporada -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Temporada</label>
        <input
          v-model="form.temporada"
          type="number"
          min="2020"
          max="2100"
          required
          class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
        />
      </div>

      <!-- Categoría -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          v-model="form.categoria"
          class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
        >
          <option value="">Seleccionar...</option>
          <option value="Primera">Primera</option>
          <option value="Reserva">Reserva</option>
          <option value="Sub-20">Sub-20</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <!-- Tipo -->
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Tipo de torneo</label
        >
        <select
          v-model="form.tipo"
          class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
        >
          <option value="">Seleccionar...</option>
          <option value="Liga">Liga (todos contra todos)</option>
          <option value="Eliminacion">Eliminación directa</option>
          <option value="Mixto">Mixto</option>
        </select>
      </div>

      <!-- Fechas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Fecha de inicio</label
          >
          <input
            v-model="form.fechaInicio"
            type="date"
            required
            class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Fecha de fin</label
          >
          <input
            v-model="form.fechaFin"
            type="date"
            required
            class="mt-1 block w-full rounded-lg border-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 p-2"
          />
        </div>
      </div>

      <!-- Botón -->
      <div class="pt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Crear Torneo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrarTorneo",
  data() {
    return {
      form: {
        nombre: "",
        descripcion: "",
        temporada: new Date().getFullYear(),
        categoria: "",
        tipo: "",
        fechaInicio: "",
        fechaFin: "",
      },
    };
  },
  methods: {
    crearTorneo() {
      console.log("Torneo creado:", this.form);
      // Aquí iría tu llamada al backend con fetch o axios
      // axios.post("/api/torneos", this.form).then(...)
    },
  },
};
</script>
