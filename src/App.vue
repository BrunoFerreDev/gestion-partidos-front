<script setup>
import Header from './components/Header.vue';
import NavBar from './components/NavBar.vue';
</script>
<template>
  <div class="flex items-start h-screen">
    <NavBar />
    <div class="flex flex-col w-full">
      <Header />
      <main class="p-2">
        <RouterView />
      </main>
    </div>
  </div>
</template>
