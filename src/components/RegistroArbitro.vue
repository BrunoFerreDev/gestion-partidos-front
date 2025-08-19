<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Registro de Árbitro</h2>

    <form
      class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded-2xl p-6"
    >
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          v-model="arbitro.nombre"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Apellido -->
      <div>
        <label class="block text-sm font-medium mb-1">Apellido</label>
        <input
          type="text"
          v-model="arbitro.apellido"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- DNI -->
      <div>
        <label class="block text-sm font-medium mb-1">DNI</label>
        <input
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
          type="date"
          v-model="arbitro.fechaNacimiento"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Categoría -->
      <div>
        <label class="block text-sm font-medium mb-1">Categoría</label>
        <select
          v-model="arbitro.categoria"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione categoría</option>
          <option value="internacional">Internacional (FIFA)</option>
          <option value="nacional">Nacional</option>
          <option value="regional">Regional</option>
          <option value="local">Local</option>
        </select>
      </div>

      <!-- Licencia -->
      <div>
        <label class="block text-sm font-medium mb-1">Licencia Nº</label>
        <input
          type="text"
          v-model="arbitro.licencia"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Experiencia -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1"
          >Años de Experiencia</label
        >
        <input
          type="number"
          min="0"
          v-model="arbitro.experiencia"
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
          type="submit"
          class="px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistroArbitro",
  data() {
    return {
      arbitro: {
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        categoria: "",
        licencia: "",
        experiencia: 0,
      },
    };
  },
  methods: {
    guardarArbitro() {
      console.log("Datos árbitro:", this.arbitro);
      // POST /api/arbitros
    },
  },
};
</script>
