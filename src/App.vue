<template>
  <header class="flex items-center justify-around bg-green-400 p-2">
    <img alt="Vue logo" class="logo" src="/vite.svg" width="50" height="125" />
    <h2>Panel de Administración</h2>
    <div class="flex flex-col gap-2">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </header>
  <main class="flex flex-col bg-gray-200">
    <section
      class="border rounded p-2 flex flex-col gap-10 container mx-auto max-w-5xl m-3 text-xl"
    >
      <h4 class="text-2xl text-center">Crear un nuevo partido</h4>
      <div
        class="container flex gap-12 items-center justify-between max-w-3xl mx-auto"
      >
        <label for="local" class="flex flex-col"
          >Local
          <input
            id="local"
            type="search"
            placeholder="Buscar Local"
            class="border-b py-2"
        /></label>
        <span class="text-sm font-bold">VS</span>
        <label for="visitante" class="flex flex-col items-end"
          >Visitante
          <input
            id="visitante"
            type="search"
            placeholder="Buscar Visitante"
            class="border-b py-2 text-right"
        /></label>
      </div>
      <div
        class="container flex gap-12 items-center justify-between max-w-3xl mx-auto"
      >
        <label class="border-b" for="estadio"
          >Estadio <input id="estadio" type="text"
        /></label>
        <label class="border-b" for="fecha"
          >Fecha <input id="fecha" type="date"
        /></label>
      </div>
      <div
        class="container flex gap-12 items-center justify-between max-w-3xl mx-auto"
      >
        <label
          for="horario"
          class="border-b w-1/3 inline-flex gap-2 items-center justify-between"
          >Horario inicio:<input id="horario" type="time"
        /></label>
        <label for="division" class="border-b"
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
    <section
      class="border rounded p-5 flex flex-col gap-5 items-center justify-between container mx-auto max-w-5xl m-3 text-xl"
    >
      <h4 class="text-2xl text-center">Designar Arbitros</h4>
      <div
        class="container flex gap-12 items-center justify-between max-w-4xl p- mx-auto flex-wrap"
      >
        <label for="arbitro1" class="border-b gap-2 items-center w-2/5"
          >Principal:<input id="arbitro1" type="text"
        /></label>
        <label for="arbitro2" class="border-b gap-2 items-center w-2/5"
          >Asistente 1:<input id="arbitro2" type="text"
        /></label>
        <label for="arbitro3" class="border-b gap-2 items-center w-2/5"
          >Asistente 2:<input id="arbitro3" type="text"
        /></label>
        <label for="arbitro4" class="border-b gap-2 items-center w-2/5"
          >Cuarto Arbitro:<input id="arbitro4" type="text"
        /></label>
      </div>
      <div class="btn-group flex gap-10 items-center justify-center text-lg">
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
  </main>
</template>
