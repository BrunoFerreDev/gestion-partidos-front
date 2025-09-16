<template>
  <div class="space-y-6 ">
    <!-- Datos del torneo -->
    <div class="flex justify-center">
      <div class="border rounded flex items-start justify-between w-4/5 flex-wrap gap-4 p-2">
        <h2 class="text-2xl font-bold text-gray-800 w-full"> {{ torneo.nombre }}</h2>
        <div class="flex flex-col gap-2">
          <p class="inline-flex gap-2"><span class="font-bold">Categoria: </span>{{ torneo.categoria }}</p>
          <p class="inline-flex gap-2"><span class="font-bold">Tipo: </span>{{ torneo.tipo }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="inline-flex gap-2"><span class="font-bold">Estado: </span>{{ torneo.estado }}</p>
          <p class="inline-flex gap-2"><span class="font-bold">Temporada: </span>{{ torneo.temporada }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="inline-flex gap-2"><span class="font-bold">Fecha Inicio: </span>{{ torneo.fechaInicio }}</p>
          <p class="inline-flex gap-2"><span class="font-bold">Fecha Fin: </span>{{ torneo.fechaFin }}</p>
        </div>
      </div>

    </div>
    <PartidoCard />
  </div>

</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"
import PartidoCard from "./PartidoCard.vue"

const props = defineProps({
  torneo: {
    type: Object,
    required: true
  }
})
// Estos equipos vendrían del backend con GET /api/equipos
const equipos = ref([])
const zona1 = ref([])
const zona2 = ref([])
const zonasHabilitadas = ref(false)
// Asignar club a una zona y sacarlo de la tabla
const agregarAZona = (club, zona) => {
  if (zona === 1) {
    zona1.value.push(club)
  } else if (zona === 2) {
    zona2.value.push(club)
  }
  equipos.value = equipos.value.filter((c) => c.id !== club.id)
}

// Sacar club de una zona y devolverlo a la tabla
const removerDeZona = (club, zona) => {
  if (zona === 1) {
    zona1.value = zona1.value.filter((c) => c.id !== club.id)
  } else if (zona === 2) {
    zona2.value = zona2.value.filter((c) => c.id !== club.id)
  }
  equipos.value.push(club)
}
//Metodo para traer clubes
const fetchClubes = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/club")
    equipos.value = response.data // 👈 asumiendo que tu backend devuelve un array de clubes

  } catch (error) {
    console.error("Error al cargar los clubes:", error)
  }
}
const removerTodosDeZona = () => {
  zona1.value = []
  zona2.value = []
  fetchClubes()
}
const generarFixture = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/torneo/" + props.torneo.id + "/generar")
    alert("Fixture generado con exito ✅")
  } catch (error) {
    alert("Error al generar el fixture ❌")
  }
}
//Metodo para generar fixture
const verificarFixture = () => {

  if (confirm("¿Estas seguro de generar el fixture?")) {
    generarFixture()
  } else {
    alert("Fixture no generado ❌")
  }
}
const partidos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/torneo/" + props.torneo.id + "/fixture")
    partidos.value = response.data // 👈 asumiendo que tu backend devuelve un array de clubes
  } catch (error) {
    console.error("Error al cargar los clubes:", error)
  }
}
// Ejecutar al montar el componente
onMounted(() => {
  fetchClubes()
  partidos()
})

</script>
