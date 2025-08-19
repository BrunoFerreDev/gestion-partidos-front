<template>
  <section
    class="border rounded p-2 flex flex-col justify-between gap-10 container mx-auto max-w-4xl m-3 text-xl"
  >
    <h4 class="text-2xl text-center">Designar Arbitros</h4>
    <div
      class="container flex gap-10 items-center justify-around max-w-4xl mx-auto flex-wrap"
    >
      <label
        for="arbitro1"
        class="border-b gap-1 items-start w-2/5 flex flex-col"
        >Principal:<input id="arbitro1" type="text" class="w-full"
      /></label>
      <label
        for="arbitro2"
        class="border-b gap-1 items-start w-2/5 flex flex-col"
        >Asistente 1:<input id="arbitro2" type="text" class="w-full"
      /></label>
      <label
        for="arbitro3"
        class="border-b gap-1 items-start w-2/5 flex flex-col"
        >Asistente 2:<input id="arbitro3" type="text" class="w-full"
      /></label>
      <label
        for="arbitro4"
        class="border-b gap-1 items-start w-2/5 flex flex-col"
        >Cuarto Arbitro:<input id="arbitro4" type="text" class="w-full"
      /></label>
    </div>
    <div class="btn-group flex items-center justify-center gap-10 text-lg">
      <button
        class="btn-primary bg-green-400 p-2 rounded font-bold cursor-pointer hover:bg-green-500"
      >
        Designar
      </button>
      <button
        class="btn-secondary bg-red-400 p-2 rounded font-bold cursor-pointer hover:bg-red-500"
      >
        Cancelar
      </button>
    </div>
  </section>
</template>
