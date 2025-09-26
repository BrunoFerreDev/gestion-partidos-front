<template>
  <div class="space-y-6 ">
    <!-- Datos del torneo -->
    <div class="flex justify-start ">
      <div class="border rounded flex items-start justify-between flex-wrap gap-4 p-2">
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
    <PartidoCard :idTorneo="torneo.id"/>
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

// Ejecutar al montar el componente
onMounted(() => {
  console.log(props.torneo)
})

</script>
