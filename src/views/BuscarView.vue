<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Buscar Persona</h2>
    <div class="mt-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
      <!-- Tabs -->
      <div class="flex border-b">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="cambiarTab(tab)"
          :class="[
            'flex-1 py-3 text-center font-semibold transition capitalize',
            activeTab === tab
              ? 'border-b-4 border-green-600 text-green-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab === "ct" ? "Cuerpo Técnico" : tab }}
        </button>
      </div>
      <div class="p-6 flex justify-center">
        <label
          for="buscar"
          class="max-w-3xl mx-4 w-full rounded-xl border border-gray-300 p-2 inline-flex items-center gap-4 my-2"
        >
          Buscar
          <input
            type="search"
            placeholder="Ingrese DNI / FICHA / CODIGO"
            class="p-2 w-full border-l-2 border-gray-300"
            id="buscar"
            v-model="busqueda"
          />
        </label>
      </div>
      <!-- Contenido dinámico -->
      <div class="p-6">
        <!-- Jugador -->
        <FichaJugador v-if="activeTab === 'jugador'" :jugador="{}" />
        <!-- Cuerpo Técnico -->
        <FichaCT v-if="activeTab === 'ct'" :ct="{}" />
        <!-- Club -->
        <FichaClub v-if="activeTab === 'club'" :club="{}" />
        <!-- Árbitro -->
        <FichaArbitro v-if="activeTab === 'arbitro'" :arbitro="{}" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import FichaJugador from "../components/ui/FichaJugador.vue";
import FichaCT from "../components/ui/FichaCT.vue";
import FichaArbitro from "../components/ui/FichaArbitro.vue";
import FichaClub from "../components/ui/FichaClub.vue";
const route = useRoute();
const busqueda = ref("");
const activeTab = ref(route.params.tab);
const tabs = ["jugador", "ct", "club", "arbitro"];

const cambiarTab = (tab) => {
  activeTab.value = "";
  activeTab.value = tab;
};
</script>
