<template>
  <form action="#" class="flex justify-around gap-5 items-center flex-wrap">
    <h3 class="text-xl font-semibold w-full">Información sobre los arbitros</h3>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[200px]"
    >
      <label for="arbitro">Árbitro principal</label>
      <input type="text" id="arbitro" placeholder="Árbitro" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[200px]"
    >
      <label for="asistente1">Asistente 1</label>
      <input type="text" id="asistente1" placeholder="Asistente 1" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[200px]"
    >
      <label for="asistente2">Asistente 2</label>
      <input type="text" id="asistente2" placeholder="Asistente 2" />
    </div>
    <div
      class="flex gap-5 items-center border border-gray-300 p-2 rounded w-[200px]"
    >
      <label for="cuartoArbitro">Cuarto árbitro</label>
      <input type="text" id="cuartoArbitro" placeholder="Cuarto árbitro" />
    </div>
  </form>
</template>
