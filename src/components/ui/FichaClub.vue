<!-- ================= FICHA CLUB ================= -->
<template>
    <div class="bg-gray-100 p-4">
        <div v-if="existe === false"
            class="flex gap-4 items-center justify-center p-5 border border-gray-200 rounded-lg mx-auto font-bold text-lg mb-2 bg-white">
            <label for="search" class="border-b">Buscar club:</label>
            <input type="search" placeholder="Ingrese DNI / FICHA " id="search" class=" border-b w-[20rem]"
                @keypress.enter="buscarClub" v-model="id">
            <button @click="buscarClub"
                class="p-2 rounded-lg border text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-200">
                <IconSearch /> Buscar
            </button>
        </div>
        <div v-else class="bg-white rounded-lg shadow p-6 m-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Ficha de Club</h2>
                <button @click="() => { existe = false; id = ''; club = {} }"
                    class="p-2 rounded-lg border text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-200">
                    <IconArrowLeft /> Volver
                </button>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs text-gray-500">Nombre del Club</label>
                    <span class="mt-1 block w-full rounded border px-3 py-2">{{ club.nombre }}</span>
                </div>
                <div>
                    <label class="block text-xs text-gray-500">Fundación</label>
                    <span class="mt-1 block w-full rounded border px-3 py-2">{{ club.fundacion }}</span>
                </div>
                <div>
                    <label class="block text-xs text-gray-500">Estado</label>
                    <span :class="club.estado === 'ACTIVO' ? 'text-green-700' : 'text-red-700'"
                        class="mt-1 block w-full font-bold rounded border px-3 py-2">{{ club.estado }}</span>
                </div>
                <div>
                    <label class="block text-xs text-gray-500">Ciudad</label>
                    <span class="mt-1 block w-full rounded border px-3 py-2">{{ club.ciudad }}</span>
                </div>
                <!-- <div class="col-span-2">
                <label class="block text-xs text-gray-500">Presidente</label>
                <span class="mt-1 block w-full rounded border px-3 py-2" >{{ club.presidente }}</span>
            </div> -->
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
const club = ref({});
const id = ref('');
const existe = ref(false);

const buscarClub = () => {
    axios.get(`http://localhost:8080/api/club/${id.value}`)
        .then(response => {
            club.value = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    existe.value = true;
};
</script>