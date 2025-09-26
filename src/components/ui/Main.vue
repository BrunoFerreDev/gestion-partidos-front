<script setup lang="ts">
import NavBar from '../adminUI/NavBar.vue';

</script>

<template>
    <main id="main" class="mx-auto border-b border-r border-t rounded mt-2 flex justify-start items-start min-h-[85vh]">
        <NavBar />
        <RouterView class="w-full" />
    </main>
</template>
<style scoped>
@reference "tailwindcss";

main {
    @apply xl:w-[95vw] 2xl:w-[85vw];
}
</style>
