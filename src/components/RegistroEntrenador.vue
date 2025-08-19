<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">
      Registro de Entrenador / Cuerpo Técnico
    </h2>

    <form
      class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded-2xl p-6"
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
      <div class="md:col-span-2">
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
      <div class="md:col-span-2">
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
          type="submit"
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistroEntrenador",
  data() {
    return {
      entrenador: {
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        rol: "",
        club: "",
      },
    };
  },
  methods: {
    guardarEntrenador() {
      console.log("Datos entrenador:", this.entrenador);
      // POST /api/entrenadores
    },
  },
};
</script>
