<template>
  <h2 class="text-xl font-bold mb-4">
    🎓 Sanción a Miembro del Cuerpo Técnico
  </h2>
  <form class="space-y-4">
    <div>
      <label class="block font-medium">Miembro CT</label>
      <div class="flex gap-2 w-full justify-between">
        <input
          type="text"
          class="border p-2 rounded w-2/3"
          placeholder="Buscar miembro por DNI/FICHA"
        />
        <button class="bg-sky-600 text-white px-4 py-2 rounded w-1/5">
          Buscar
        </button>
        <button class="bg-orange-600 text-white px-4 py-2 rounded w-1/5">
          Limpiar
        </button>
      </div>
    </div>
    <div class="info-jugador flex gap-2" v-if="resultados.nombre">
      <p class="w-1/2 font-medium border rounded p-2">Nombre:</p>
      <p class="w-1/2 font-medium border rounded p-2">Club:</p>
    </div>

    <div class="flex gap-2 items-center justify-between">
      <label class="flex flex-col font-medium w-2/4"
        >Fecha de Suspensión
        <input type="date" class="border p-2 rounded" v-model="fecha"
      /></label>
      <div class="flex flex-col w-2/4">
        <label for="fechaOdias">Días/Partidos</label>
        <select
          name="fechaOdias"
          id="fechaOdias"
          v-model="fechaOdias"
          class="border p-2 rounded"
        >
          <option value="dias">Días</option>
          <option value="partidos">Partidos</option>
        </select>
      </div>
    </div>

    <div class="flex gap-2 w-full">
      <label class="block font-medium w-1/2"
        >Cantidad
        <input
          v-model="cantidad"
          type="number"
          placeholder="Cantidad de días/partidos"
          class="w-full border p-2 rounded"
        />
      </label>
      <label class="block font-medium w-1/2"
        >Multa (opcional)
        <input
          v-model="multa"
          type="number"
          placeholder="Monto en $"
          class="w-full border p-2 rounded"
        />
      </label>
    </div>
    <div>
      <label class="block font-medium">Descripción</label>
      <textarea
        v-model="descripcion"
        class="w-full border p-2 rounded"
      ></textarea>
    </div>

    <div class="flex items-center justify-center w-3/5 mx-auto">
      <button
        class="bg-red-600 text-white px-4 py-2 rounded"
        @click.prevent="guardar"
      >
        Guardar
      </button>
      <button class="bg-orange-600 text-white px-4 py-2 rounded ml-2">
        Cancelar y Limpiar
      </button>
    </div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import axios from "axios";

const fecha = ref("");
const fechaOdias = ref("dias");
const cantidad = ref("");
const multa = ref("");
const descripcion = ref("");
const id = ref("");

const resultados = ref({});

const buscarClub = () => {
  console.log(id.value);
};

const limpiar = () => {
  id.value = "";
  resultados.value = {};
};
const guardar = () => {
  let data = {
    fecha: fecha.value,
    fechaOdias: fechaOdias.value,
    cantidad: cantidad.value,
    descripcion: descripcion.value,
    multa: multa.value,
    puntos: 0,
    tipo: "",
  };
  axios
    .post(
      "http://localhost:8080/api/sanciones/ct?idCT=" + resultados.value.id,
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
