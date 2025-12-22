<script setup >
import { IconBellFilled } from '@tabler/icons-vue';
import { IconSearch } from '@tabler/icons-vue';

</script>

<template>
    <header class="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300">
        <h1 class="text-xl font-bold">LRFPR - ADMINISTRACIÓN</h1>
        <label for="search" class="bg-white inline-flex w-2/4 p-2 items-center gap-2 border border-gray-300 rounded-lg">
            <IconSearch />
            <input type="search" name="search" id="search" placeholder="Buscar club, jugador ...">
        </label>
        <div class="flex items-center gap-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-full">Crear Torneo</button>
            <label for="notifications">
                <IconBellFilled />
            </label>
        </div>
    </header>
</template>