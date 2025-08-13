<template>
  <section
    class="border border-gray-300 p-6 rounded w-full flex flex-col items-start justify-start gap-10"
  >
    <article class="text-3xl flex flex-col gap-2">
      <h3>Eventos</h3>
      <p class="text-xs text-gray-500">
        Registra amonestaciones, expulsiones, sustituciones y goles
      </p>
    </article>
    <div class="flex gap-5 items-center bg-gray-100 p-2 rounded justify-center">
      <button class="bg-green-600 text-white rounded p-2 cursor-pointer">
        Amonestación
      </button>
      <button class="bg-red-600 text-white rounded p-2 cursor-pointer">
        Expulsión
      </button>
      <button class="bg-yellow-400 text-white rounded p-2 cursor-pointer">
        Sustitución
      </button>
      <button class="bg-blue-600 text-white rounded p-2 cursor-pointer">
        Gol
      </button>
    </div>
    <div class="flex gap-5 items-center w-full">
      <form
        action="#"
        class="flex flex-col gap-5 items-center justify-center w-full"
      >
        <article class="flex gap-5">
          <label class="w-[100px] font-bold" for="minuto">Minuto</label>
          <label class="w-[100px] font-bold" for="equipo">Equipo</label>
          <label class="w-[100px] font-bold" for="jugador">Jugador</label>
          <label class="w-[100px] font-bold" for="tipo">DNI/FICHA</label>
        </article>
        <article class="flex gap-5">
          <input
            type="number"
            id="minuto"
            class="w-[100px] rounded border p-2"
          />
          <select
            name="equipo"
            id="equipo"
            class="w-[100px] rounded border p-2"
          >
            <option disabled value="0" selected>Seleccione...</option>
            <option value="local">Local</option>
            <option value="visitante">Visitante</option>
          </select>
          <input
            type="text"
            id="jugador"
            class="w-[100px] rounded border p-2"
          />
          <input type="text" id="tipo" class="w-[100px] rounded border p-2" />
        </article>
      </form>
    </div>
  </section>
</template>
