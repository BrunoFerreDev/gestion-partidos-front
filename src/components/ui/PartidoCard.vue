<template>
    <div class="flex justify-between flex-wrap gap-3">
        <section class="w-full flex flex-col gap-2" v-if="!visible">
            <div class="flex items-center justify-center gap-2 ">
                <label for="fecha" class="text-lg font-bold">Cantidad de fechas:</label>
                <input type="number" id="fecha" class="border rounded w-24 h-9 text-center" min="0"
                    :max="clubes.length + 2" v-model="cantidad">
                <button @click="generarFixture"
                    class="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg shadow cursor-pointer">Generar</button>
            </div>
        </section>
        <!-- FIXTURE POR FECHAS -->
        <div class="w-2/4" v-if="visible">
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
        <!-- LISTADO DE CLUBES -->
        <div class="flex flex-col gap-2 w-2/5 ">
            <h2 class="text-xl text-center font-bold mb-4">Clubes</h2>
            <section class="grid grid-cols-2 gap-2">
                <div v-for="club in clubes" :key="club.id" class="border p-3 rounded-lg bg-white shadow cursor-move"
                    draggable="true" @dragstart="onDragStart(club)" :class="{
                        'opacity-50 cursor-not-allowed': clubUsado(club)
                    }" :draggable="!clubUsado(club)">
                    <h3 class="font-semibold">{{ club.nombre }}</h3>
                    <p class="text-sm text-gray-500">{{ club.ciudad }}</p>
                </div>
            </section>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const clubes = ref([]);
let draggedClub = null;
let visible = ref(false);
// 🔹 Fixture: se generan automáticamente tantos partidos como la mitad de clubes
const fixture = ref([]);
const cantidad = ref();
// Cargar clubes desde API y armar fixture base
onMounted(async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/club");
        clubes.value = data;

        // // cantidad de partidos por fecha = mitad de clubes
        // const partidosPorFecha = Math.floor(clubes.value.length / 2);

        // // inicializamos 3 fechas
        // fixture.value = Array.from({ length: 3 }, () => ({
        //     abierta: false,
        //     partidos: Array.from({ length: partidosPorFecha }, () => ({
        //         local: null,
        //         visitante: null,
        //     })),
        // }));
        fixture.value[0].abierta = true; // abrimos la primera por defecto
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

const agregarFecha = () => {
    fixture.value.push({
        abierta: false,
        partidos: Array.from({ length: Math.floor(clubes.value.length / 2) }, () => ({
            local: null,
            visitante: null,
        })),
    });
    fixture.value[fixture.value.length - 1].abierta = true;
};
const generar = () => {
    if (cantidad.value < 1) {
        alert("⚠️ Debes ingresar al menos 1 fecha");
        return;
    } else if (cantidad.value > clubes.value.length) {
        alert("⚠️ Debes ingresar menos fechas que clubes");
        return;
    } else {

        for (let i = 0; i < cantidad.value; i++) {
            agregarFecha();
        }
        visible.value = true;
    }
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
// Guardar fixture completo
const guardarFixture = async () => {
    // Validar que en cada fecha todos los clubes estén presentes
    const totalClubes = clubes.value.length;

    for (let i = 0; i < fixture.value.length; i++) {
        const fecha = fixture.value[i];
        const usados = new Set();

        fecha.partidos.forEach((p) => {
            if (p.local) usados.add(p.local.id);
            if (p.visitante) usados.add(p.visitante.id);
        });

        if (usados.size !== totalClubes) {
            alert(`⚠️ La fecha ${i + 1} no incluye a todos los clubes`);
            return;
        }
    }

    try {
        await axios.post("http://localhost:8080/api/fixture", fixture.value);
        alert("✅ Fixture guardado correctamente");
    } catch (error) {
        console.error("Error guardando fixture:", error);
    }
};
const generarFixture = () => {
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

}

</script>