<template>
  <div
    class="w-1/5 min-h-[85vh] bg-gray-100 shadow-md border-l border-r border-gray-400 rounded flex flex-col justify-start gap-1 overflow-y-auto"
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
      >
        Torneos
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'nuevo-torneo' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo torneo</RouterLink
          >
          <RouterLink
            :to="{ name: 'buscar-torneo' }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar torneo</RouterLink
          >
          <!-- <RouterLink :to="{ name: 'partidos' }" class="hover:text-blue-600 cursor-pointer">Partidos</RouterLink> -->
        </ul>
      </div>
    </div>
    <!-- Jugadores -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
      >
        Jugadores
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'nuevo-jugador' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo registro</RouterLink
          >
          <RouterLink
            :to="{ name: 'buscar-entidad', params: { entidad: 'jugador', tab: 'jugador' } }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar jugadores</RouterLink
          >
        </ul>
      </div>
    </div>
    <!-- Entrenadores -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
      >
        Entrenadores
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'nuevo-ct' }"
            class="hover:text-blue-600 cursor-pointer"
          >
            Nuevo registro</RouterLink
          >
          <RouterLink
            :to="{ name: 'buscar-entidad', params: { entidad: 'ct', tab: 'ct' } }"
            class="hover:text-blue-600 cursor-pointer"
          >
            Buscar entrenadores
          </RouterLink>
        </ul>
      </div>
    </div>
    <!-- Clubes -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
      >
        Clubes
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'nuevo-club' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo registro
          </RouterLink>

          <RouterLink
            :to="{ name: 'buscar-entidad', params: { entidad: 'club', tab: 'club' } }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar clubes
          </RouterLink>
        </ul>
      </div>
    </div>
    <!-- Árbitros -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
      >
        Árbitros
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'nuevo-arbitro' }"
            class="hover:text-blue-600 cursor-pointer"
            >Nuevo registro</RouterLink
          >
          <RouterLink
            :to="{ name: 'buscar-entidad', params: { entidad: 'arbitro', tab: 'arbitro' } }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar árbitros</RouterLink
          >
        </ul>
      </div>
    </div>
    <!-- Sanciones -->
    <div>
      <button
        class="w-full flex justify-between items-center px-4 py-2 bg-gray-300 font-semibold"
      >
        Sanciones
      </button>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'sanciones' }"
            class="hover:text-blue-600 cursor-pointer"
            >Registrar Sancion</RouterLink
          >
        </ul>
      </div>
      <div class="bg-white">
        <ul class="pl-6 py-2 space-y-1 text-gray-700 flex flex-col">
          <RouterLink
            :to="{ name: 'buscar-detalle', params: { tipo: 'sancion' } }"
            class="hover:text-blue-600 cursor-pointer"
            >Buscar Sanciones</RouterLink
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "NavBar",
  data() {
    return {};
  },
};
</script>
