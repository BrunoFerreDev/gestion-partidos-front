<template>
    <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Ficha de Cuerpo Técnico</h2>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-xs text-gray-500">Nombre</label>
                <input v-model="cuerpo.nombre" class="mt-1 block w-full rounded border px-3 py-2" />
            </div>
            <div>
                <label class="block text-xs text-gray-500">Apellido</label>
                <input v-model="cuerpo.apellido" class="mt-1 block w-full rounded border px-3 py-2" />
            </div>
            <div>
                <label class="block text-xs text-gray-500">Cargo</label>
                <select v-model="cuerpo.cargo" class="mt-1 block w-full rounded border px-3 py-2">
                    <option>Director Técnico</option>
                    <option>Asistente</option>
                    <option>Preparador Físico</option>
                    <option>Médico</option>
                </select>
            </div>
            <div>
                <label class="block text-xs text-gray-500">Nacionalidad</label>
                <input v-model="cuerpo.nacionalidad" class="mt-1 block w-full rounded border px-3 py-2" />
            </div>
        </div>
    </div>
</template>


<script setup>
import { reactive } from "vue";
const cuerpo = reactive({
    nombre: "",
    apellido: "",
    cargo: "",
    nacionalidad: "",
});
</script>