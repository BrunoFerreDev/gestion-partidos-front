<template>
    <div class="flex justify-center items-start flex-wrap">
        <div class="p-4">
            <h2 class="text-2xl font-bold mb-4 text-center">Fixture del torneo</h2>
            <!-- Botones de fechas -->
            <div class="flex flex-col gap-2 items-center justify-center w-full">
        
                <select name="fecha" id="" v-model="fechaUpdate" @change="seleccionarFecha(fechaUpdate)" class="w-full border rounded p-2 bg-gray-200">
                    <option value="">Seleccionar fecha</option>
                    <option v-for="(partidos, index) in fixture" :key="index" :value="partidos[0]?.fechaTorneo">
                        Fecha {{ partidos[0]?.fechaTorneo }}
                    </option>
                </select>
                <!-- <h4 class="text-xl font-bold mb-4 text-center bg-amber-50 p-2 rounded shadow-lg border">Fecha {{
                        fechaUpdate }}
                    </h4> -->
                <!-- Lista de partidos de la fecha seleccionada -->
                <div class="space-y-3">
                    <div v-for="(partido, idx) in fixture[fechaSeleccionada]" :key="idx"
                        class="p-4 border rounded-lg shadow-sm bg-white grid grid-cols-3 items-center justify-center w-full">
                        <span class="font-semibold col-span-1 place-self-start">{{ partido.local }}</span>
                        <span class="text-gray-600 col-span-1 place-self-center">vs</span>
                        <span class="font-semibold col-span-1 place-self-end">{{ partido.visitante }}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
const props = defineProps({
    idTorneo: Number
})
let visible = ref(false);

// 🔹 Fixture: se generan automáticamente tantos partidos como la mitad de clubes
const fixture = ref([]);
// Fecha seleccionada por defecto
const fechaSeleccionada = ref(0)

const seleccionarFecha = (fecha) => {
    fechaSeleccionada.value = fecha
}
const fechaUpdate = ref("")
// Cargar clubes desde API y armar fixture base
onMounted(async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/partido/" + props.idTorneo + "/fixture");
        fixture.value = data;
        visible.value = true;
        fechaSeleccionada.value = 1;
        fechaUpdate.value = 1;
    } catch (error) {
        console.error("Error cargando clubes:", error);
    }
});

watch(fechaSeleccionada, () => {
    fechaUpdate.value = fixture.value[fechaSeleccionada.value][0]?.fechaTorneo
    fechaSeleccionada.value = fixture.value[fechaSeleccionada.value][0]?.fechaTorneo;
})
</script>
<style scoped>
/* Animación del fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>