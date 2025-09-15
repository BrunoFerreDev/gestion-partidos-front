<script setup>
import SidebarMenu from "./components/SidebarMenu.vue";
</script>

<template>
  <header class="flex items-center justify-between p-4 rounded border border-gray-400 shadow-sm">
    <div class="flex gap-5 h-full w-1/2">
      <img alt="Vue logo" class="logo" src="/vite.svg" width="50" height="125" />
      <h1 class="text-xl">Panel de Administración</h1>
    </div>
    <div class="flex gap-10 items-center justify-start w-1/3">
      <article class="flex flex-col">
        <span>Usuario: nombre de usuario</span>
        <span>Club: Nombre del club</span>
      </article>
      <img src="/vite.svg " alt="Logo del club" width="50" height="100" />
    </div>
  </header>
  <main class="flex gap-5 mt-2 h-[calc(87vh-64px)] ">
    <SidebarMenu />
    <div class="w-full border border-gray-400 rounded  overflow-y-auto">
      <router-view></router-view>
    </div>
  </main>
  <footer class="w-full border border-gray-400 rounded flex items-center justify-center h-[5vh] mt-2 ">
    <p class="text-center">Todos los derechos reservados</p>
  </footer>
</template>
