<template>
  <form class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-xl font-bold w-1/2">⚽ Sanción a Jugador</h2>
      <div class="flex gap-2 w-full justify-between items-center">
        <input
          v-model="id"
          type="text"
          class="border p-2 rounded w-2/3"
          placeholder="Buscar jugador por DNI/FICHA"
          @keypress.enter.prevent="buscarJugador"
        />
        <button
          type="submit"
          class="bg-sky-600 text-white px-4 py-2 rounded w-1/5"
          @click.prevent="buscarJugador"
        >
          Buscar
        </button>
        <button
          type="submit"
          class="bg-orange-600 text-white px-4 py-2 rounded w-1/5"
          @click.prevent="limpiar"
        >
          Limpiar
        </button>
      </div>
    </div>
    <!-- Resultado inicio -->
    <div class="info-jugador flex gap-2" v-if="resultados.nombre">
      <p class="w-1/2 font-medium border rounded p-2">
        Nombre: {{ resultados.nombre + " " + resultados.apellido }}
      </p>
      <p class="w-1/2 font-medium border rounded p-2">
        Club: {{ resultados.nombreClub }}
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex justify-around items-center gap-4">
        <div class="flex flex-col gap-2 w-1/2">
          <label class="block font-medium"
            >Fecha de suspension valida desde:
          </label>
          <input
            type="date"
            class="w-full border p-2 rounded"
            v-model="fecha"
          />
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <label class="block font-medium">Multa (opcional)</label>
          <input
            type="number"
            placeholder="Monto en $"
            class="w-full border p-2 rounded"
            v-model="multa"
          />
        </div>
      </div>
      <div class="flex justify-around items-center gap-4">
        <div class="flex flex-col gap-2 w-1/2">
          <label class="font-medium">Tipo de Sanción</label>
          <select
            name="tipo"
            id="tipo"
            class="border rounded h-10 px-2"
            v-model="fechaOdias"
          >
            <option value="fechas">Fechas</option>
            <option value="dias">Dias</option>
          </select>
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <label class="font-medium" for="duracion">Duración</label>
          <input
            v-model="cantidad"
            type="number"
            placeholder="Cantidad de días/fechas"
            class="w-full border p-2 rounded"
            id="duracion"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label class="block font-medium">Motivo</label>
        <textarea
          class="w-full border p-2 rounded"
          v-model="descripcion"
        ></textarea>
      </div>
    </div>
    <div class="flex items-center justify-center w-3/5 mx-auto">
      <button
        class="bg-red-600 text-white px-4 py-2 rounded"
        @click.prevent="guardar"
      >
        Guardar
      </button>
      <button
        class="bg-orange-600 text-white px-4 py-2 rounded ml-2"
        @click.prevent="limpiar"
      >
        Cancelar y Limpiar
      </button>
    </div>
  </form>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";

const id = ref("");
const fecha = ref("");
const multa = ref("");
const fechaOdias = ref("fechas");
const cantidad = ref("");
const descripcion = ref("");
const resultados = ref({});

const buscarJugador = () => {
  axios
    .get(`http://localhost:8080/api/jugador/${id.value}`)
    .then((response) => {
      resultados.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const limpiar = () => {
  id.value = "";
  fecha.value = "";
  multa.value = "";
  fechaOdias.value = "fechas";
  cantidad.value = "";
  descripcion.value = "";
  resultados.value = {};
};
const guardar = () => {
  let data = {
    fecha: fecha.value,
    fechaOdias: fechaOdias.value,
    cantidad: duracion.value,
    descripcion: descripcion.value,
    multa: multa.value,
    puntos: 0,
    tipo: "",
  };
  axios
    .post(
      "http://localhost:8080/api/sanciones/jugador?idJugador=" +
        resultados.value.id,
      data
    )
    .then((response) => {
      console.log(response);
      alert("Sanción guardada exitosamente");
      limpiar();
    })
    .catch((error) => {
      console.log(error);
      alert("Error al guardar la sanción");
      limpiar();
    });
};
</script>
<style>
textarea {
  resize: none;
  height: 100px;
}
</style>
