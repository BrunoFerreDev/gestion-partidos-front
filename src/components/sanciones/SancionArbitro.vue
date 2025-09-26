<template>
    <div class="flex gap-2 items-center justify-between">
        <h2 class="text-xl font-bold">⚖️ Sanción a Árbitro</h2>
        <div class="flex gap-2 ">
            <input v-model="id" type="search" class="border p-2 rounded w-[20rem]"
                placeholder="Buscar árbitro por DNI/FICHA" @keypress.enter.prevent="buscarArbitro" />
            <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded" @click.prevent="buscarArbitro">
                Buscar
            </button>
            <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded" @click.prevent="limpiar">
                Limpiar
            </button>
        </div>
    </div>
    <form class="space-y-4 pt-4">
        <div class="flex flex-col gap-2">
            <div class="info-jugador flex gap-2" v-if="resultados.nombre">
                <p class="w-1/2 font-medium border rounded p-2">
                    Nombre: {{ resultados.nombre + " " + resultados.apellido }}
                </p>
                <p
                    :class="resultados.estadoPersona === 'ACTIVO' ? 'w-1/2 font-medium border rounded p-2 text-green-600' : 'w-1/2 font-medium border rounded p-2 text-red-600'">
                    Estado: {{ resultados.estadoPersona }}</p>
            </div>
        </div>
        <div class="flex gap-2 items-center">
            <div class="w-full">
                <label class="block font-medium">Duración de la sanción</label>
                <select class=" border p-2 rounded w-full">
                    <option value="dias">Días</option>
                    <option value="años">Años</option>
                </select>
            </div>
            <div class="w-full">
                <label class="block font-medium">Cantidad</label>
                <input type="number" placeholder="Ej: 30 días / 1 año" class=" border p-2 rounded w-full" />
            </div>
        </div>

        <div>
            <label class="block font-medium">Motivo</label>
            <textarea class="w-full border p-2 rounded"></textarea>
        </div>
        <div class="flex items-center  justify-center w-3/5 mx-auto">
            <button class="bg-red-600 text-white px-4 py-2 rounded ">
                Guardar
            </button>
            <button class="bg-orange-600 text-white px-4 py-2 rounded ml-2">Cancelar y Limpiar</button>
        </div>
    </form>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const resultados = ref({});
const id = ref('');
const buscarArbitro = () => {
    axios.get(`http://localhost:8080/api/arbitros/${id.value}`)
        .then(response => {
            resultados.value = response.data;
        })
        .catch(error => {
            console.log(error);
        })
    console.log(id.value);
}

const limpiar = () => {
    id.value = '';
    resultados.value = {};
}
</script>