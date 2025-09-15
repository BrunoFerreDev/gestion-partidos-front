<template>
    <section class="space-y-4">
        <header class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Partidos del torneo</h2>
            <div class="flex items-center gap-2">
                <select v-model="filterEstado" class="px-2 py-1 border rounded-md text-sm">
                    <option value="">Todos</option>
                    <option value="Pend.">Pendientes</option>
                    <option value="Jugado">Jugados</option>
                    <option value="Suspendido">Suspendidos</option>
                </select>
                <button @click="fetchPartidos" class="px-3 py-1 bg-indigo-600 text-white rounded-md">Refrescar</button>
            </div>
        </header>

        <div v-if="loading" class="text-center py-8">Cargando partidos...</div>
        <div v-if="error" class="text-red-600">{{ error }}</div>

        <div v-if="!loading && partidos.length === 0" class="text-gray-600">No hay partidos cargados aún.</div>

        <div class="grid gap-4" :class="gridColsClass">
            <MatchCard v-for="p in filteredPartidos" :key="p.id" :partido="p" @open="openPartido" />
        </div>

        <!-- modal o drawer simple -->
        <div v-if="selected"
            class="fixed inset-0 bg-black bg-opacity-40 flex items-end sm:items-center justify-center p-4 z-50">
            <div class="bg-white rounded-xl w-full sm:w-3/4 max-h-[90vh] overflow-auto p-6">
                <header class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold">Partido: {{ selected.clubLocal?.nombre }} vs {{
                        selected.clubVisitante?.nombre }}</h3>
                    <button @click="selected = null" class="text-gray-500">Cerrar ✕</button>
                </header>

                <div class="space-y-3 text-sm text-gray-700">
                    <div><strong>Fecha:</strong> {{ new Date(selected.fechaCalendario).toLocaleString() }}</div>
                    <div><strong>Fase:</strong> {{ selected.fase ?? 'Regular' }}</div>
                    <div><strong>Arbitro:</strong> {{ selected.arbitro ? `${selected.arbitro.nombre}
                        ${selected.arbitro.apellido}` : '—' }}</div>

                    <hr />

                    <div>
                        <h4 class="font-semibold">Eventos</h4>
                        <ul class="mt-2 space-y-1">
                            <li v-for="ev in selected.detalles" :key="ev.id" class="flex items-center justify-between">
                                <div>
                                    <span class="font-medium">{{ ev.minuto }}'</span>
                                    <span class="ml-2">{{ ev.tipo }}</span>
                                    <span class="ml-2 text-gray-600">— {{ ev.jugador?.nombre }} {{ ev.jugador?.apellido
                                        }}</span>
                                </div>
                                <div class="text-xs text-gray-500">{{ ev.detalleExtra }}</div>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import MatchCard from './MatchCard.vue' // importa la card

const props = defineProps({
    torneoId: { type: [Number, String], required: true }
})

// estado
const partidos = ref([])
const loading = ref(false)
const error = ref(null)
const selected = ref(null)
const filterEstado = ref('')

// grid responsivo
const gridColsClass = computed(() => {
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
})

async function fetchPartidos() {
    loading.value = true
    error.value = null
    try {
        // ejemplo: GET /api/torneos/{id}/partidos
        const res = await fetch(`/api/torneos/${props.torneoId}/partidos`)
        if (!res.ok) throw new Error('Error al obtener partidos')
        const data = await res.json()
        // suponer que el API devuelve un arreglo de partidos con relaciones embebidas:
        // { id, fechaCalendario, fase, estado, clubLocal:{id,nombre,escudoUrl}, clubVisitante:{}, detalles: [...], arbitro: {...} }
        partidos.value = data
    } catch (e) {
        error.value = e.message
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchPartidos()
})

const filteredPartidos = computed(() => {
    if (!filterEstado.value) return partidos.value
    return partidos.value.filter(p => (p.estado ?? 'Pend.') === filterEstado.value)
})

function openPartido(p) {
    selected.value = p
}
</script>

<style scoped>
/* Opcional: scroll suave para el modal */
</style>