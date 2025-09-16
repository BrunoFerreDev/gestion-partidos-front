<template>
    <div class="w-2/4">
        <h2 class="text-xl text-center font-bold mb-4">Fixture del Torneo</h2>
        <div v-for="(fecha, fechaIndex) in fixture" :key="fechaIndex" class="mb-4 border rounded-lg shadow ">
            <!-- ENCABEZADO DEL ACCORDION -->
            <button @click="toggleFecha(fechaIndex)"
                class="w-full flex justify-between items-center px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-t-lg">
                <span class="font-semibold">Fecha {{ fechaIndex + 1 }}</span>
                <span>{{ fecha.abierta ? "▲" : "▼" }}</span>
            </button>
            <!-- CONTENIDO DEL ACCORDION -->
            <div v-show="fecha.abierta" class="p-4 bg-gray-50 ">
                <div v-for="(partido, partidoIndex) in fecha.partidos" :key="partidoIndex"
                    class="mb-4 border rounded-lg bg-white shadow p-4 " @dragover.prevent
                    @drop="onDrop($event, fechaIndex, partidoIndex)">
                    <h3 class="font-semibold mb-2">
                        Partido {{ partidoIndex + 1 }}
                    </h3>
                    <div class="flex justify-between items-center mb-2 ">
                        <div class="text-center border rounded p-2 bg-gray-100 w-2/5">
                            {{ partido.local ? partido.local.nombre : "Arrastrar Local" }}
                            <span @click="removeClub(partido.local, fechaIndex, partidoIndex)"
                                :class="partido.local ? 'text-red-600 cursor-pointer font-bold' : ''">X</span>
                        </div>
                        <span class="font-bold">VS</span>
                        <div class="text-center border rounded p-2 bg-gray-100 w-2/5">
                            {{ partido.visitante ? partido.visitante.nombre : "Arrastrar Visitante" }}
                            <span @click="removeClub(partido.visitante, fechaIndex, partidoIndex)"
                                :class="partido.visitante ? 'text-red-600 cursor-pointer font-bold' : ''">X</span>
                        </div>

                    </div>

                    <!-- Selección manual -->
                    <div class="flex gap-4 items-center justify-between ">
                        <select class="border p-2 rounded w-2/5" v-model="partido.local">
                            <option disabled selected>Seleccionar Local</option>
                            <option v-for="club in clubes" :key="club.id" :value="club"
                                :disabled="clubUsado(club, partido.local, fechaIndex)">
                                {{ club.nombre }}
                            </option>
                        </select>
                        <span class="font-bold ">VS</span>
                        <select class="border p-2 rounded w-2/5" v-model="partido.visitante">
                            <option disabled selected>Seleccionar Visitante</option>
                            <option v-for="club in clubes" :key="club.id" :value="club"
                                :disabled="clubUsado(club, partido.visitante, fechaIndex)">
                                {{ club.nombre }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- <button @click="agregarFecha"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">Agregar
        Fecha</button> -->
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    fixture: {
        type: Array,
        required: true
    },
    clubes: {
        type: Array,
        required: true
    }
})

// Verificación si un club ya está usado en una fecha
const clubUsado = (club, actual = null, fechaIndex = null) => {
    if (fechaIndex === null || fechaIndex === undefined) {
        return false; // no validamos si no hay fecha
    }

    const fecha = fixture.value[fechaIndex];
    if (!fecha || !fecha.partidos) {
        return false; // seguridad extra
    }

    return (
        fecha.partidos.some(
            (p) =>
                (p.local && p.local.id === club.id) ||
                (p.visitante && p.visitante.id === club.id)
        ) && (!actual || actual.id !== club.id)
    );
};

// Drag & Drop
const onDragStart = (club) => {
    draggedClub = club;
};

const onDrop = (event, fechaIndex, partidoIndex) => {
    if (clubUsado(draggedClub, null, fechaIndex)) {
        alert("⚠️ Este club ya está asignado en esta fecha");
        return;
    }
    const partido = fixture.value[fechaIndex].partidos[partidoIndex];
    if (!partido.local) {
        partido.local = draggedClub;
    } else if (!partido.visitante) {
        partido.visitante = draggedClub;
    } else {
        alert("⚠️ Este partido ya tiene los dos equipos asignados");
    }
    draggedClub = null;
};

const removeClub = (club, fechaIndex, partidoIndex) => {
    const partido = fixture.value[fechaIndex].partidos[partidoIndex];
    if (partido.local && partido.local.id === club.id) {
        partido.local = null;
    } else if (partido.visitante && partido.visitante.id === club.id) {
        partido.visitante = null;
    }
}

const toggleFecha = (fecha) => {
    fixture.value[fecha].abierta = !fixture.value[fecha].abierta;
}

</script>