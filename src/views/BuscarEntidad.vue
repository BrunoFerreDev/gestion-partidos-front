<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Buscar {{ titulo }}</h2>

    <!-- Barra de búsqueda -->
    <div class="flex space-x-2 mb-6">
      <input
        type="number"
        v-model="id"
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
    <div class="flex flex-col gap-4 justify-center w-full">
      <div v-if="tipo === 'club'" class="self-center">
        <ClubCard />
      </div>
      <div v-if="tipo === 'jugador'" class="self-center">
        <JugadorCard />
      </div>
      <div v-if="tipo === 'entrenador'" class="self-center">
        <CuerpoTecnicoCard />
      </div>
      <div v-if="tipo === 'arbitro'" class="self-center">
        <ArbitroCard />
      </div>
      <div >
        <EstadisticasTable :entidad="tipo" :datos="resultados" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClubCard from "../components/ui/ClubCard.vue";
import JugadorCard from "../components/ui/JugadorCard.vue";
import ArbitroCard from "../components/ui/ArbitroCard.vue";
import CuerpoTecnicoCard from "../components/ui/CuerpoTecnicoCard.vue";
import EstadisticasTable from "../components/ui/EstadisticasTable.vue";

export default {
  name: "BuscarEntidad",
  props: {
    tipo: {
      type: String,
      required: true, // jugador, entrenador, club, arbitro
    },
  },
  components: {
    ClubCard,
    JugadorCard,
    ArbitroCard,
    CuerpoTecnicoCard,
    EstadisticasTable,
  },
  data() {
    return {
      resultados: {},
      id: "",
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
      let url = `http://localhost:8080/api/${this.tipo}/${this.id}`;
      try {
        axios.get(url).then((response) => {
          this.resultados = response.data;
          console.log(this.resultados);
        });
      } catch (error) {
        console.error("Error en búsqueda:", error);
      }
    },
  },
};
</script>
