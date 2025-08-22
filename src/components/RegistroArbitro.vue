<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Registro de Árbitro</h2>

    <form
      @submit.prevent="guardarArbitro"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded-2xl p-6"
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
import axios from "axios";

export default {
  name: "RegistroArbitro",
  data() {
    return {
      arbitro: {
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        email: "",
        fechaNacimiento: "",
      },
    };
  },
  methods: {
    guardarArbitro() {
      console.log("Datos árbitro:", this.arbitro);
      axios
        .post("http://localhost:8080/api/arbitros", this.arbitro)
        .then((response) => {
          alert("Arbitro guardado con exito ✅");
          console.log("Arbitro guardado:", response.data);
          location.reload();
        })
        .catch((error) => {
          console.error("Error al guardar el árbitro:", error);
        });
    },
  },
};
</script>
