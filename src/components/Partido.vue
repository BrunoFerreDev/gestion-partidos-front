<template>
  <section
    class="border rounded p-2 flex flex-col justify-between gap-10 text-xl"
  >
    <h4 class="text-2xl text-center">Crear un nuevo partido</h4>
    <div
      class="container flex gap-10 items-center justify-between max-w-3xl mx-auto"
    >
      <label for="local" class="flex flex-col w-2/5 gap-2"
        >Local
        <input
          id="local"
          type="search"
          placeholder="Buscar Local"
          class="border-b text-center"
      /></label>
      <span class="text-sm font-bold">VS</span>
      <label for="visitante" class="flex flex-col text-right w-2/5 gap-2"
        >Visitante
        <input
          id="visitante"
          type="search"
          placeholder="Buscar Visitante"
          class="border-b w-full text-center"
      /></label>
    </div>
    <div
      class="container flex gap-12 items-center justify-between max-w-3xl mx-auto"
    >
      <label
        class="border-b w-2/5 inline-flex items-center justify-between"
        for="estadio"
        >Estadio: <input id="estadio" type="text" class="w-full"
      /></label>
      <label
        class="border-b w-2/5 inline-flex items-center justify-between gap-2"
        for="fecha"
        >Fecha: <input id="fecha" type="date" class="w-full"
      /></label>
    </div>
    <div
      class="container flex gap-12 items-center justify-between max-w-3xl mx-auto"
    >
      <label
        for="horario"
        class="border-b w-2/5 inline-flex gap-2 items-center justify-between"
        >Horario inicio:<input id="horario" type="time"
      /></label>
      <label
        for="division"
        class="border-b w-2/5 inline-flex gap-2 items-center justify-between"
        >Division:
        <select id="division">
          <option selected disabled>Seleccionar</option>
          <option value="A">Primera</option>
          <option value="B">Sub-21</option>
        </select>
      </label>
    </div>
    <div class="btn-group flex gap-10 items-center justify-center text-lg">
      <button
        class="btn-primary bg-green-400 p-2 rounded font-bold cursor-pointer hover:bg-green-500"
      >
        Crear partido
      </button>
      <button
        class="btn-secondary bg-red-400 p-2 rounded font-bold cursor-pointer hover:bg-red-500"
      >
        Cancelar
      </button>
    </div>
  </section>
</template>
