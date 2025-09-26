<template>
    <form class="space-y-4 ">
        <div class="flex items-center justify-between gap-3">
            <h2 class="text-xl font-bold w-1/2">⚽ Sanción a Jugador</h2>
            <div class="flex gap-2 w-full justify-between items-center">
                <input v-model="id" type="text" class="border p-2 rounded w-2/3"
                    placeholder="Buscar jugador por DNI/FICHA" @keypress.enter.prevent="buscarJugador" />
                <button type="submit" class="bg-sky-600 text-white px-4 py-2 rounded w-1/5"
                    @click.prevent="buscarJugador">
                    Buscar
                </button>
                <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded w-1/5" @click.prevent="limpiar">
                    Limpiar
                </button>
            </div>
        </div>
        <div class="info-jugador flex gap-2" v-if="resultados.nombre">
            <p class="w-1/2 font-medium border rounded p-2">
                Nombre: {{ resultados.nombre + " " + resultados.apellido }}
            </p>
            <p class="w-1/2 font-medium border rounded p-2">Club: {{ resultados.nombreClub }}</p>
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex justify-around items-center gap-4">
                <div class="flex flex-col gap-2 w-1/2">
                    <label class="block font-medium">Fecha de suspension valida desde: </label>
                    <input type="date" class="w-full border p-2 rounded" />
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <label class="block font-medium">Multa (opcional)</label>
                    <input type="number" placeholder="Monto en $" class="w-full border p-2 rounded" />
                </div>
            </div>
            <div class="flex justify-around items-center gap-4">
                <div class="flex flex-col gap-2 w-1/2">
                    <label class="font-medium">Tipo de Sanción</label>
                    <select name="tipo" id="tipo" class=" border rounded h-10 px-2 ">
                        <option value="fechas">Fechas</option>
                        <option value="dias">Dias</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                    <label class="font-medium" for="duracion">Duración</label>
                    <input type="number" placeholder="Cantidad de días/fechas" class="w-full border p-2 rounded"
                        id="duracion" />
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <label class="block font-medium">Motivo</label>
                <textarea class="w-full border p-2 rounded"></textarea>
            </div>
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

const id = ref('');

const resultados = ref({});

const buscarJugador = () => {
    axios.get(`http://localhost:8080/api/jugador/${id.value}`)
        .then(response => {
            resultados.value = response.data;
        })
        .catch(error => {
            console.log(error);
        })
}

const limpiar = () => {
    id.value = '';
    resultados.value = {};
}
</script>
<style>
textarea {
    resize: none;
    height: 100px;
}
</style>
