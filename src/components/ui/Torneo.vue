<template>
  <div class="p-6 space-y-6 w-full ">
    <!-- Datos del torneo -->
    <div class="flex justify-between ">
      <div class="border rounded flex items-start justify-between w-4/5 flex-wrap gap-4 p-2">
        <h2 class="text-2xl font-bold text-gray-800 w-full"> {{ torneo.nombre }}</h2>
        <div class="flex flex-col gap-2">
          <p class="inline-flex gap-2"><span class="font-bold">Categoria: </span>{{ torneo.categoria}}</p>
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
      <div class="btn-group flex flex-col items-center justify-center gap-2 w-1/5" >
      <button class="btn-primary w-1/2 bg-green-400 p-2 rounded font-bold cursor-pointer hover:bg-green-500">Crear Torneo</button>
      <button class="btn-secondary w-1/2 bg-red-400 p-2 rounded font-bold cursor-pointer hover:bg-red-500"> Cancelar</button>
    </div>  
  </div>
  <div class="flex items-start gap-4">
    <!-- Tabla de equipos -->
    <div v-if="torneo.id>0 && equipos.length>0" class="overflow-x-auto rounded border border-gray-200 w-3/5">
      <table class=" text-center overflow-hidden w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 border">#</th>
            <th class="p-2 border">CLUB</th>
            <th class="p-2 border">Ciudad</th>
            <th colspan="2" class="p-2 border">AGREGAR A ZONA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(club, index) in equipos" :key="club.id">
            <td class="p-2 border">{{ index + 1 }}</td>
            <td class="p-2 border">{{ club.nombre }}</td>
            <td class="p-2 border">{{ club.ciudad }}</td>
            <td class="p-2 border">
              <button
                @click="agregarAZona(club, 1)"
                class="px-3 py-1 rounded bg-green-300 hover:bg-green-400"
              >
                ZONA 1
              </button>
            </td>
            <td class="p-2 gap-2 py-2 border">
              <button
                @click="agregarAZona(club, 2)"
                class="px-3 py-1 rounded bg-cyan-300 hover:bg-cyan-400"
              >
                ZONA 2
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
       <!-- Zonas -->
     <div class="flex flex-wrap gap-6">
      <!-- Zona 1 -->
      <div class="bg-gray-200 rounded-2xl p-4 text-center w-3/4">
        <h2 class="font-semibold mb-2">ZONA 1</h2>
        <ul class="space-y-2">
          <li
            v-for="club in zona1"
            :key="club.id"
            class="bg-white p-2 rounded shadow-lg flex justify-between items-center"
          >
            <span>{{ club.nombre }}</span>
            <button
              @click="removerDeZona(club, 1)"
              class="text-red-500 hover:text-red-700 font-bold"
            >
              ✖
            </button>
          </li>
        </ul>
      </div>

      <!-- Zona 2 -->
      <div class="bg-gray-200 rounded-2xl p-4 text-center w-3/4">
        <h2 class="font-semibold mb-2">ZONA 2</h2>
        <ul class="space-y-2">
          <li
            v-for="club in zona2"
            :key="club.id"
            class="bg-white p-2 rounded shadow-lg flex justify-between items-center"
          >
            <span>{{ club.nombre }}</span>
            <button
              @click="removerDeZona(club, 2)"
              class="text-red-500 hover:text-red-700 font-bold"
            >
              ✖
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"

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


// Ejecutar al montar el componente
onMounted(() => {
  fetchClubes()
})

</script>
