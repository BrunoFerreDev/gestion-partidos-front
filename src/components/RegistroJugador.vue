<template>
  <div class="p-6 w-full h-full overflow-y-auto ">
    <h2 class="text-2xl font-semibold mb-6">Registro de Jugador</h2>

    <form
      class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow border rounded-2xl p-6"
    >
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          v-model="jugador.nombre"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Apellido -->
      <div>
        <label class="block text-sm font-medium mb-1">Apellido</label>
        <input
          type="text"
          v-model="jugador.apellido"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- DNI -->
      <div>
        <label class="block text-sm font-medium mb-1">DNI</label>
        <input
          type="text"
          v-model="jugador.dni"
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
          v-model="jugador.fechaNacimiento"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Nacionalidad -->
      <div>
        <label class="block text-sm font-medium mb-1">Nacionalidad</label>
        <input
          type="text"
          v-model="jugador.nacionalidad"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Posición -->
      <div>
        <label class="block text-sm font-medium mb-1">Posición</label>
        <select
          v-model="jugador.posicion"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione una posición</option>
          <option value="arquero">Arquero</option>
          <option value="defensor">Defensor</option>
          <option value="mediocampista">Mediocampista</option>
          <option value="delantero">Delantero</option>
        </select>
      </div>

      <!-- Club actual -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">Club</label>
        <input
          type="text"
          v-model="jugador.club"
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
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "JugadorForm",
  data() {
    return {
      jugador: {
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        nacionalidad: "",
        posicion: "",
        club: "",
      },
    };
  },
  methods: {
    guardarJugador() {
      console.log("Datos jugador:", this.jugador);
      // Aquí iría la llamada a tu API (POST /api/jugadores)
    },
  },
};
</script>
