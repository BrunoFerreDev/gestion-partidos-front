<template>
    <h2 class="text-xl font-bold mb-4">
        🎓 Sanción a Miembro del Cuerpo Técnico
    </h2>
    <form class="space-y-4">
        <div>
            <label class="block font-medium">Miembro CT</label>
            <div class="flex gap-2 w-full justify-between">
                <input type="text" class="border p-2 rounded w-2/3" placeholder="Buscar miembro por DNI/FICHA" />
                <button class="bg-sky-600 text-white px-4 py-2 rounded w-1/5">
                    Buscar
                </button>
                <button class="bg-orange-600 text-white px-4 py-2 rounded w-1/5">
                    Limpiar
                </button>
            </div>
        </div>
        <div class="info-jugador flex gap-2" v-if="resultados.nombre">
            <p class="w-1/2 font-medium border rounded p-2">Nombre:</p>
            <p class="w-1/2 font-medium border rounded p-2">Club:</p>
        </div>

        <div>
            <label class="block font-medium">Fecha de Suspensión</label>
            <input type="date" class="w-full border p-2 rounded" />
        </div>

        <div class="flex gap-2 w-full">
            <label class="block font-medium w-1/2">Duración
                <input type="number" placeholder="Cantidad de días/partidos" class="w-full border p-2 rounded" />
            </label>
            <label class="block font-medium w-1/2">Multa (opcional)
                <input type="number" placeholder="Monto en $" class="w-full border p-2 rounded" />
            </label>
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
import { ref } from 'vue';

const id = ref('');


const resultados = ref({});

const buscarClub = () => {
    console.log(id.value);
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
