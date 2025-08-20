<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Buscar {{ titulo }}</h2>

    <!-- Barra de búsqueda -->
    <div class="flex space-x-2 mb-6">
      <input
        type="text"
        v-model="query"
        @keyup.enter="buscar"
        class="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        placeholder="Escribe para buscar..."
      />
      <button
        @click="buscar"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Buscar
      </button>
    </div>

    <!-- Resultados -->
    <div v-if="resultados.length > 0" class="overflow-x-auto">
      <table class="w-full border border-gray-200 rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th v-for="col in columnas" :key="col" class="px-4 py-2 border-b">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in resultados"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td v-for="col in columnas" :key="col" class="px-4 py-2 border-b">
              {{ item[col.toLowerCase()] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-gray-500 mt-4">Sin resultados</div>
  </div>
</template>

<script>
export default {
  name: "BuscarEntidad",
  props: {
    tipo: {
      type: String,
      required: true, // jugador, entrenador, club, arbitro
    },
  },
  data() {
    return {
      query: "",
      resultados: [],
    };
  },
  computed: {
    titulo() {
      switch (this.tipo) {
        case "jugador":
          return "Jugador";
        case "entrenador":
          return "Entrenador";
        case "club":
          return "Club";
        case "arbitro":
          return "Árbitro";
        case "torneo":
          return "Torneo";
        default:
          return "Entidad";
      }
    },
    columnas() {
      switch (this.tipo) {
        case "jugador":
          return ["ID", "Nombre", "Apellido", "Posicion", "Club"];
        case "entrenador":
          return ["ID", "Nombre", "Apellido", "Rol", "Club"];
        case "club":
          return ["ID", "Nombre", "Ciudad", "Estadio"];
        case "arbitro":
          return ["ID", "Nombre", "Apellido", "Categoria"];
        default:
          return ["ID", "Nombre"];
      }
    },
  },
  methods: {
    async buscar() {
      // 🔹 Aquí cambias las URLs por las de tu backend Spring Boot
      let url = `/api/${this.tipo}s?search=${this.query}`;
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          this.resultados = await response.json();
        } else {
          this.resultados = [];
        }
      } catch (error) {
        console.error("Error en búsqueda:", error);
      }
    },
  },
};
</script>
