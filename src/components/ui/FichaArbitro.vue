<!-- ================= FICHA ÁRBITRO ================= -->
<template>
    <div class="bg-gray-100 p-6">
    <div v-if="existe === false"
        class="flex gap-4 items-center justify-center p-4 border border-gray-200 rounded-lg font-bold text-lg bg-white">
        <label for="search" class="border-b">Buscar Árbitro:</label>
        <input type="search" placeholder="Ingrese FICHA ÁRBITRO" id="search" class=" border-b w-[20rem]"
            @keypress.enter="buscarArbitro" v-model="id">
        <button @click="buscarArbitro"
            class="p-2 rounded-lg border text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-200">
            <IconSearch /> Buscar
        </button>
    </div>
    <div v-else class="bg-white rounded-lg shadow p-6 m-4">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Ficha de Árbitro</h2>
            <button @click="() => { existe = false; id = ''; arbitro = {} }"
                class="p-2 rounded-lg border text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-200">
                <IconArrowLeft /> Volver
            </button>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-xs text-gray-500">Nombre</label>
                <span class="mt-1 block w-full rounded border px-3 py-2">{{ arbitro.nombre ? arbitro.nombre : 'No encontrado'}}</span>
            </div>
            <div>
                <label class="block text-xs text-gray-500">Apellido</label>
                <span class="mt-1 block w-full rounded border px-3 py-2">{{ arbitro.apellido ? arbitro.apellido : 'No encontrado' }}</span>
            </div>
            <div>
                <label class="block text-xs text-gray-500">Fecha de nacimiento</label>
                <span class="mt-1 block w-full rounded border px-3 py-2">{{ arbitro.fechaNacimiento ?
                    arbitro.fechaNacimiento : 'No encontrado' }}</span>
            </div>
            <div>
                <label class="block text-xs text-gray-500">Nacionalidad</label>
                <span class="mt-1 block w-full rounded border px-3 py-2">{{ arbitro.nacionalidad ? arbitro.nacionalidad
                    : 'No encontrado' }}</span>
            </div>
            <div>
                <label class="block text-xs text-gray-500">Categoría</label>
                <span class="mt-1 block w-full rounded border px-3 py-2">{{ arbitro.categoria ? arbitro.categoria : 'No encontrado' }}</span>
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";
const arbitro = ref({});
const existe = ref(false);
const id = ref('');
const buscarArbitro = () => {
    axios.get(`http://localhost:8080/api/arbitros/${id.value}`)
        .then(response => {
            arbitro.value = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    existe.value = true;
};
</script>