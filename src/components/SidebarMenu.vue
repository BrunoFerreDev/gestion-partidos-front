<template>
  <div
    class="w-68 bg-gray-100 shadow-md border border-gray-400 rounded flex flex-col justify-start gap-1 overflow-y-auto"
  >
    <RouterLink
      to="/"
      class="w-full flex justify-between items-center px-4 py-2 bg-blue-400 font-semibold"
    >
      Inicio
    </RouterLink>
    <!-- Torneos -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('torneos')"
      >
        Torneos
        <span>{{ open.torneos ? "−" : "+" }}</span>
      </button>
      <div v-if="open.torneos" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-torneos' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar torneos</RouterLink
          >
          <RouterLink
            :to="{ name: 'registrar-torneo' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo registro</RouterLink
          >
        </ul>
      </div>
    </div>
    <!-- Jugadores -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('jugadores')"
      >
        Jugadores
        <span>{{ open.jugadores ? "−" : "+" }}</span>
      </button>
      <div v-if="open.jugadores" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-jugadores' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar jugadores</RouterLink
          >
          <RouterLink
            :to="{ name: 'registrar-jugador' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo registro</RouterLink
          >
        </ul>
      </div>
    </div>
    <!-- Entrenadores -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('entrenadores')"
      >
        Entrenadores
        <span>{{ open.entrenadores ? "−" : "+" }}</span>
      </button>
      <div v-if="open.entrenadores" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-entrenadores' }"
            class="hover:text-blue-600 cursor-pointer"
          >
            Buscar entrenadores
          </RouterLink>
          <RouterLink
            to="/entrenadores"
            class="hover:text-blue-600 cursor-pointer"
          >
            Registrar entrenador</RouterLink
          >
        </ul>
      </div>
    </div>
    <!-- Clubes -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('clubes')"
      >
        Clubes
        <span>{{ open.clubes ? "−" : "+" }}</span>
      </button>
      <div v-if="open.clubes" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-clubes' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar clubes</RouterLink
          >
          <RouterLink to="/clubes" class="hover:text-blue-600 cursor-pointer"
            >Registrar club</RouterLink
          >
          <li class="hover:text-blue-600 cursor-pointer">Plantilla</li>
        </ul>
      </div>
    </div>
    <!-- Árbitros -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('arbitros')"
      >
        Árbitros
        <span>{{ open.arbitros ? "−" : "+" }}</span>
      </button>
      <div v-if="open.arbitros" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-arbitros' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar árbitros</RouterLink
          >
          <RouterLink to="/arbitros" class="hover:text-blue-600 cursor-pointer"
            >Registrar árbitro</RouterLink
          >
          <li class="hover:text-blue-600 cursor-pointer">Designar</li>
        </ul>
      </div>
    </div>
    <!-- Sanciones -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
        @click="toggle('sanciones')"
      >
        Sanciones
        <span>{{ open.sanciones ? "−" : "+" }}</span>
      </button>
      <div v-if="open.sanciones" class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-sanciones' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar Sanciones</RouterLink
          >
          <RouterLink
            :to="{ name: 'registrar-sancion' }"
            class="hover:text-blue-600 cursor-pointer"
            >Registrar Sancion</RouterLink
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "SidebarMenu",
  data() {
    return {
      open: {
        torneos: false,
        jugadores: false,
        entrenadores: false,
        clubes: false,
        arbitros: false,
        sanciones: false,
      },
    };
  },
  methods: {
    toggle(section) {
      this.open[section] = !this.open[section];
    },
  },
};
</script>
