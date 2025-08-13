<template>
  <section
    class="border border-gray-300 p-6 rounded max-w-3xl mx-2 flex flex-wrap items-start justify-start gap-5"
  >
    <article class="text-3xl flex flex-col gap-2">
      <h3>Detalles del partido</h3>
      <p class="text-xs text-gray-500">Informacion básica del partido</p>
    </article>
    <h3 class="text-xl font-semibold w-full">Información del partido</h3>
    <!-- <div class="flex gap-5 items-center border border-gray-300 p-2 rounded">
      <label for="comp">Competencia</label>
      <input type="text" id="comp" placeholder="Competencia" />
    </div> -->
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="estadio">Estadio </label>
      <input type="text" id="estadio" placeholder="Estadio" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="fecha">Fecha</label>
      <input type="date" id="fecha" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="local">Local</label>
      <input type="text" id="local" placeholder="Local" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="visitante">Visitante</label>
      <input type="text" id="visitante" placeholder="Visitante" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="horaInicio">Hora de inicio</label>
      <input type="time" id="horaInicio" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[260px]"
    >
      <label for="horaFin">Hora de fin</label>
      <input type="time" id="horaFin" />
    </div>
  </section>
</template>
