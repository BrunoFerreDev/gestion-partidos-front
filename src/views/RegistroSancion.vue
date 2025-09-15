<template>
  <div class="p-6 w-full">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border h-full overflow-y-auto">
      <!-- Tabs -->
      <div class="flex border-b">
        <button v-for="tab in tabs" :key="tab" @click="cambiarTab(tab)" :class="[
          'flex-1 py-3 text-center font-semibold transition',
          activeTab === tab
            ? 'border-b-4 border-red-600 text-red-600'
            : 'text-gray-500 hover:text-gray-700',
        ]">
          {{ tab }}
        </button>
      </div>

      <!-- Contenido dinámico -->
      <div class="p-6">
        <!-- Jugador -->
        <JugadorSancion v-if="activeTab === 'Jugador'" />
        <!-- Cuerpo Técnico -->
        <CTSancion v-if="activeTab === 'Cuerpo Técnico'" />
        <!-- Club -->
        <ClubSancion v-if="activeTab === 'Club'" />
        <!-- Árbitro -->
        <ArbitroSancion v-if="activeTab === 'Árbitro'" />

      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import JugadorSancion from "../components/ui/JugadorSancion.vue";
import CTSancion from "../components/ui/CTSancion.vue";
import ClubSancion from "../components/ui/ClubSancion.vue";
import ArbitroSancion from "../components/ui/ArbitroSancion.vue";

export default {
  name: "RegistroSancion",
  components: {
    JugadorSancion,
    CTSancion,
    ClubSancion,
    ArbitroSancion,
  },
  data() {
    return {
      id: "",
      show: false,
      sancion: {
        entidad: "",
        entidadId: "",
        tipo: "",
        fecha: "",
        duracion: "",
        motivo: "",
      },
      listaEntidades: [],
      tabs: ["Jugador", "Cuerpo Técnico", "Club", "Árbitro"],
      activeTab: "Jugador",
      resultados: {},
    };
  },
  methods: {
    async cargarEntidades() {
      if (!this.sancion.entidad) {
        this.listaEntidades = [];
        return;
      }

      try {
        const response = await fetch(`/api/${this.sancion.entidad}s`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          this.listaEntidades = await response.json();
        }
      } catch (error) {
        console.error("Error cargando entidades:", error);
      }
    },
    mostrarNombre(item) {
      if (this.sancion.entidad === "club") return item.nombre;
      return `${item.nombre} ${item.apellido}`;
    },
    async guardarSancion() {
      console.log("Datos sanción:", this.sancion);
      // Ejemplo POST
      try {
        const response = await fetch(`/api/sanciones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(this.sancion),
        });
        if (response.ok) {
          alert("Sanción registrada con éxito ✅");
          this.sancion = {
            entidad: "",
            entidadId: "",
            tipo: "",
            fecha: "",
            duracion: "",
            motivo: "",
          };
          this.listaEntidades = [];
        } else {
          alert("Error al guardar sanción ❌");
        }
      } catch (error) {
        console.error("Error guardando sanción:", error);
      }
    },
    cambiarTab(tab) {
      this.limpiar();
      this.activeTab = tab;
    },
    limpiar() {
      this.resultados = {};
      this.id = "";
    },
  },
};
</script>
<style scoped>
textarea {
  resize: none;
  height: 100px;
}
</style>
