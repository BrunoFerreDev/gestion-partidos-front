<template>
    <div class="flex justify-center items-start gap-10 flex-wrap gap-3">
        <section class="w-full flex flex-col gap-2">
            <div class="flex flex-col gap-2 ">
                <div class="flex items-center gap-2">
                    <label for="fecha" class="text-lg font-bold">Cantidad de fechas:</label>
                    <input type="number" id="fecha" class="border rounded w-24 h-9 text-center" min="0"
                        :max="clubes.length" v-model="cantidad">
                    <div class="btn-group flex gap-3 items-center">
                        <button @click="generarFixture"
                            class="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg shadow cursor-pointer">Generar</button>
                        <button @click="limpiarFixture"
                            class="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-lg shadow cursor-pointer">Remover
                            todos</button>
                    </div>
                </div>
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-green-600">Se generarán {{ cantidad }} fechas de manera
                        aleatoria</span>
                    <span class="text-sm font-bold text-red-600">Se limpiara el fixture, la cantidad de fechas
                        persistira</span>
                </div>
            </div>
        </section>
        <!-- FIXTURE POR FECHAS -->
        <div class="w-2/4 " v-if="visible">
            <h2 class="text-xl text-center font-bold mb-4 ">Fixture del Torneo</h2>
            <!-- Render de fechas -->
            <div v-for="(fecha, fechaIndex) in fixture" :key="fecha.id" class="mb-4 border" draggable="true"
                @dragstart="onDragFecha(fechaIndex)" @dragover.prevent @drop="onDropFecha(fechaIndex)">
                <!-- Cabecera de la fecha -->
                <div class="flex justify-between items-center bg-gray-100 px-4 py-2 cursor-pointer "
                    @click="toggleFecha(fechaIndex)">
                    <div class="flex items-center gap-2">
                        <span class="cursor-move">☰</span>
                        <h3 class="font-semibold">Fecha {{ fechaIndex + 1 }}</h3>
                    </div>
                    <span>{{ fecha.abierta ? "▲" : "▼" }}</span>
                </div>
                <!-- Partidos dentro del acordeón -->
                <div v-if="fecha.abierta" class="p-4">
                    <div v-for="(partido, partidoIndex) in fecha.partidos" :key="partidoIndex"
                        class="border rounded p-3 mb-3 bg-gray-50 shadow-sm">
                        <h4 class="font-semibold mb-2">Partido {{ partidoIndex + 1 }}</h4>
                        <div class="flex justify-between items-center mb-2 ">
                            <div class="w-1/2 text-center border rounded p-2 bg-white">
                                {{ partido.local ? partido.local.nombre : "Seleccionar Local" }}
                                <span @click="removeClub(partido.local, fechaIndex, partidoIndex)"
                                    :class="partido.local ? 'text-red-600 cursor-pointer font-bold' : ''">X</span>
                            </div>
                            <span class="font-bold mx-2">VS</span>
                            <div class="w-1/2 text-center border rounded p-2 bg-white">
                                {{ partido.visitante ? partido.visitante.nombre : "Seleccionar Visitante" }}
                                <span @click="removeClub(partido.visitante, fechaIndex, partidoIndex)"
                                    :class="partido.visitante ? 'text-red-600 cursor-pointer font-bold' : ''">X</span>
                            </div>
                        </div>
                        <!-- Select manual con validación -->
                        <div class="flex gap-2">
                            <select class="border p-2 rounded w-1/2" v-model="partido.local" :disabled="partido.local">
                                <option disabled selected>Seleccionar Local</option>
                                <option v-for="club in clubes" :key="club.id" :value="club"
                                    :disabled="clubUsado(club, partido.local, fechaIndex)">
                                    {{ club.nombre }}
                                </option>
                            </select>
                            <span class="font-bold">VS</span>
                            <select class="border p-2 rounded w-1/2" v-model="partido.visitante"
                                :disabled="partido.visitante">
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

        </div>
        <!-- LISTADO DE CLUBES -->
        <div class="flex flex-col gap-2 w-2/5 ">
            <h2 class="text-xl text-center font-bold mb-4">Clubes</h2>
            <section class="grid grid-cols-2 gap-2">
                <div v-for="club in clubes" :key="club.id" class="border p-3 rounded-lg bg-white shadow">
                    <h3 class="font-semibold">{{ club.nombre }}</h3>
                    <p class="text-sm text-gray-500">{{ club.ciudad }}</p>
                </div>
            </section>
        </div>
    </div>
    <!-- Notificación -->
    <transition name="fade">
        <div v-if="notificacion" class="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
            {{ notificacion }}
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const notificacion = ref("");

const clubes = ref([]);

let visible = ref(false);

// 🔹 Fixture: se generan automáticamente tantos partidos como la mitad de clubes
const fixture = ref([]);

const cantidad = ref();

// Cargar clubes desde API y armar fixture base
onMounted(async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/club");
        clubes.value = data;
    } catch (error) {
        console.error("Error cargando clubes:", error);
    }
});

// Accordion toggle
const toggleFecha = (index) => {
    if (!fixture.value[index]) return; // si no existe, salgo
    fixture.value[index].abierta = !fixture.value[index].abierta;
};

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

let draggedFecha = null;

const onDragFecha = (fechaIndex) => {
    draggedFecha = fechaIndex;
}

const onDropFecha = (fechaIndex) => {
    if (draggedFecha === fechaIndex || draggedFecha === null) return;
    const movedItem = fixture.value[draggedFecha];
    fixture.value.splice(draggedFecha, 1);
    fixture.value.splice(fechaIndex, 0, movedItem);
    draggedFecha = null;
    // Mostrar notificación
    if (draggedFecha < fechaIndex) {
        notificacion.value = `La Fecha ${draggedFecha + 1} se movió a la fecha ${fechaIndex + 1}`;
    } else {
        notificacion.value = `La Fecha ${draggedFecha + 1} se movió a la fecha ${fechaIndex + 1}`;
    }
    setTimeout(() => {
        notificacion.value = "";
    }, 2000);

}

const removeClub = (club, fechaIndex, partidoIndex) => {
    const partido = fixture.value[fechaIndex].partidos[partidoIndex];
    if (partido.local && partido.local.id === club.id) {
        partido.local = null;
    } else if (partido.visitante && partido.visitante.id === club.id) {
        partido.visitante = null;
    }
}

const generarFixture = () => {
    if (fixture.value.length > 0) {
        alert("⚠️ Ya existe un fixture");
        return;
    }
    let clubesArray = [...clubes.value];
    // Si hay número impar de clubes, agrego "Libre"
    if (clubesArray.length % 2 !== 0) {
        clubesArray.push("Libre");
    }

    const totalClubes = clubesArray.length;
    const partidosPorFecha = totalClubes / 2;

    let fixtureGenerado = [];

    // Algoritmo round-robin
    for (let f = 0; f < cantidad.value; f++) {
        let fecha = {
            abierta: false,
            partidos: []
        };

        for (let p = 0; p < partidosPorFecha; p++) {
            const local = clubesArray[p];
            const visitante = clubesArray[totalClubes - 1 - p];
            fecha.partidos.push({
                local,
                visitante
            });
        }

        // Rotación de clubes (excepto el primero)
        clubesArray.splice(1, 0, clubesArray.pop());

        fixtureGenerado.push(fecha);
    }

    fixture.value = fixtureGenerado;
    visible.value = true;
    fixture.value[0].abierta = true;

}

const limpiarFixture = () => {
    fixture.value = [];
    for (let i = 0; i < cantidad.value; i++) {
        fixture.value.push({
            abierta: false,
            partidos: []
        });
        for (let j = 0; j < clubes.value.length; j++) {
            fixture.value[i].partidos.push({
                local: null,
                visitante: null
            });
        }
    }
    fixture.value[0].abierta = true;
}
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