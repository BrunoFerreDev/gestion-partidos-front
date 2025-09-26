<template>
    <div class="p-6">
        <h2 class="text-2xl font-semibold mb-6">Buscar Persona</h2>
        <div class="mt-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
            <!-- Tabs -->
            <div class="flex border-b">
                <button v-for="tab in tabs" :key="tab" @click="cambiarTab(tab)" :class="[
                    'flex-1 py-3 text-center font-semibold transition',
                    activeTab === tab
                        ? 'border-b-4 border-green-600 text-green-600'
                        : 'text-gray-500 hover:text-gray-700',
                ]">
                    {{ tab }}
                </button>
            </div>
            <div class="p-6 flex justify-center">
                <label for="buscar"
                    class="max-w-3xl mx-4 w-full rounded-xl border border-gray-300 p-2 inline-flex items-center gap-4 my-2">
                    Buscar
                    <input type="search" placeholder="Ingrese DNI / FICHA / CODIGO"
                        class="p-2 w-full border-l-2 border-gray-300" id="buscar">
                </label>
            </div>
            <!-- Contenido dinámico -->
            <div class="p-6">
                <!-- Jugador -->
                <BuscarJugador v-if="activeTab === 'Jugador'" />
                <!-- Cuerpo Técnico -->
                <BuscarCT v-if="activeTab === 'Cuerpo Técnico'" />
                <!-- Club -->
                <BuscarClub v-if="activeTab === 'Club'" />
                <!-- Árbitro -->
                <BuscarArbitro v-if="activeTab === 'Árbitro'" />

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import BuscarJugador from '../components/buscar/BuscarJugador.vue';
import BuscarCT from '../components/buscar/BuscarCT.vue';
import BuscarClub from '../components/buscar/BuscarClub.vue';
import BuscarArbitro from '../components/buscar/BuscarArbitro.vue';
const activeTab = ref('Jugador');
const tabs = ['Jugador', 'Cuerpo Técnico', 'Club', 'Árbitro'];

const cambiarTab = (tab) => {
    activeTab.value = tab;
};
</script>