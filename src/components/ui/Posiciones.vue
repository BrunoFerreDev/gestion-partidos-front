<template>
    <div class="p-6 max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-md mt-5 bg-white">
        <div class="flex justify-center items-center gap-4">
            <h2 class="text-2xl font-semibold">Tabla de Posiciones</h2>
            <strong class="text-2xl font-semibold">Torneo </strong>
        </div>
        <!-- Zona A -->
        <h3 class="text-xl font-bold mb-3 text-blue-700">Zona A</h3>
        <div class="overflow-x-auto mb-10">
            <table class="w-full border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-gray-100 text-left text-sm uppercase">
                        <th class="px-4 py-2 border-b">#</th>
                        <th class="px-4 py-2 border-b">Club</th>
                        <th class="px-4 py-2 border-b">PJ</th>
                        <th class="px-4 py-2 border-b">PG</th>
                        <th class="px-4 py-2 border-b">PE</th>
                        <th class="px-4 py-2 border-b">PP</th>
                        <th class="px-4 py-2 border-b">GF</th>
                        <th class="px-4 py-2 border-b">GC</th>
                        <th class="px-4 py-2 border-b">DG</th>
                        <th class="px-4 py-2 border-b">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(club, index) in posicionesZonaA" :key="club.id" class="hover:bg-gray-50 text-sm">
                        <td class="px-4 py-2 border-b font-semibold">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border-b flex items-center space-x-2">
                            <img v-if="club.logo" :src="club.logo" alt="logo" class="w-6 h-6 rounded-full" />
                            <span>{{ club.nombre }}</span>
                        </td>
                        <td class="px-4 py-2 border-b">{{ club.pj }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pg }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pe }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pp }}</td>
                        <td class="px-4 py-2 border-b">{{ club.gf }}</td>
                        <td class="px-4 py-2 border-b">{{ club.gc }}</td>
                        <td class="px-4 py-2 border-b">{{ club.dg }}</td>
                        <td class="px-4 py-2 border-b font-bold">{{ club.pts }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Zona B -->
        <h3 class="text-xl font-bold mb-3 text-green-700">Zona B</h3>
        <div class="overflow-x-auto">
            <table class="w-full border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-gray-100 text-left text-sm uppercase">
                        <th class="px-4 py-2 border-b">#</th>
                        <th class="px-4 py-2 border-b">Club</th>
                        <th class="px-4 py-2 border-b">PJ</th>
                        <th class="px-4 py-2 border-b">PG</th>
                        <th class="px-4 py-2 border-b">PE</th>
                        <th class="px-4 py-2 border-b">PP</th>
                        <th class="px-4 py-2 border-b">GF</th>
                        <th class="px-4 py-2 border-b">GC</th>
                        <th class="px-4 py-2 border-b">DG</th>
                        <th class="px-4 py-2 border-b">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(club, index) in posicionesZonaB" :key="club.id" class="hover:bg-gray-50 text-sm">
                        <td class="px-4 py-2 border-b font-semibold">{{ index + 1 }}</td>
                        <td class="px-4 py-2 border-b flex items-center space-x-2">
                            <img v-if="club.logo" :src="club.logo" alt="logo" class="w-6 h-6 rounded-full" />
                            <span>{{ club.nombre }}</span>
                        </td>
                        <td class="px-4 py-2 border-b">{{ club.pj }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pg }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pe }}</td>
                        <td class="px-4 py-2 border-b">{{ club.pp }}</td>
                        <td class="px-4 py-2 border-b">{{ club.gf }}</td>
                        <td class="px-4 py-2 border-b">{{ club.gc }}</td>
                        <td class="px-4 py-2 border-b">{{ club.dg }}</td>
                        <td class="px-4 py-2 border-b font-bold">{{ club.pts }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const posicionesZonaA = ref([]);
const posicionesZonaB = ref([]);

</script>
