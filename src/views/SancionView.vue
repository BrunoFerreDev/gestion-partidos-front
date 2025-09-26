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
                <SancionJugador v-if="activeTab === 'Jugador'" />
                <!-- Cuerpo Técnico -->
                <SancionCT v-if="activeTab === 'Cuerpo Técnico'" />
                <!-- Club -->
                <SancionClub v-if="activeTab === 'Club'" />
                <!-- Árbitro -->
                <SancionArbitro v-if="activeTab === 'Árbitro'" />

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import SancionJugador from '../components/sanciones/SancionJugador.vue';
import SancionCT from '../components/sanciones/SancionCT.vue';
import SancionClub from '../components/sanciones/SancionClub.vue';
import SancionArbitro from '../components/sanciones/SancionArbitro.vue';

const activeTab = ref('Jugador');
const tabs = ['Jugador', 'Cuerpo Técnico', 'Club', 'Árbitro'];

const cambiarTab = (tab) => {
    activeTab.value = tab;
    
    
};
</script>