<template>
    <div class="p-6">
        <h2 class="text-2xl font-semibold mb-6 capitalize">Buscar {{ route.params.tipo }}</h2>
        <div class="mt-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border h-full overflow-y-auto">
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
                    <input type="search" :placeholder="placeholder" class="p-2 w-full border-l-2 border-gray-300"
                        id="buscar">
                </label>
            </div>
            <!-- Contenido Dinámico -->
            <!-- Torneo -->
            <BuscarTorneo v-if="activeTab === 'Torneo'" />
            <!-- Partido -->
            <BuscarPartido v-if="activeTab === 'Partido'" />
            <!-- Sancion -->
            <BuscarSancion v-if="activeTab === 'Sancion'" />
        </div>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import BuscarTorneo from '../components/buscar/BuscarTorneo.vue';
import BuscarPartido from '../components/buscar/BuscarPartido.vue';
import BuscarSancion from '../components/buscar/BuscarSancion.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tabs = ['Torneo', 'Partido', 'Sancion'];
const activeTab = ref('Torneo');
const placeholder = computed(() => {
    switch (activeTab.value) {
        case 'Torneo':
            return 'Ingrese nombre del torneo o codigo';
        case 'Partido':
            return 'Ingrese codigo de partido';
        case 'Sancion':
            return 'Ingrese DNI / FICHA o codigo de sancion';
    }
})
const cambiarTab = (tab) => {
    route.params.tipo = tab;
    activeTab.value = tab;
}
</script>