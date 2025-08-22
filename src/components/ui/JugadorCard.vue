<template>
  <div class="max-w-sm rounded-2xl shadow-lg bg-white p-4 hover:shadow-xl transition">
    <div class="flex items-center space-x-4">
      <img :src="jugador.foto" alt="Foto del jugador"
           class="w-18 h-18 object-contain  rounded-full border"/>
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ jugador.nombre }}</h2>
        <p class="text-sm text-gray-500">{{ jugador.posicion }}</p>
      </div>
    </div>

    <div class="mt-4 space-y-2 text-gray-700 text-sm">
      <p><span class="font-semibold">Edad:</span> {{ jugador.edad }}</p>
      <p><span class="font-semibold">Club:</span> {{ jugador.club }}</p>
      <p><span class="font-semibold">Nacionalidad:</span> {{ jugador.nacionalidad }}</p>
      <p><span class="font-semibold">Número:</span> {{ jugador.numero }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JugadorCard",
  props: {
    jugador: { type: Object, required: true,
      default: () => ({
        nombre: "Jugador Ejemplo",
        foto: "https://www.cariverplate.com.ar/images/logo-river.png?cache=a57",
        posicion: "Delantero",
        edad: 25,
        club: "River Plate",
        nacionalidad: "Argentina",
        numero: 10,
      }),
     }
  }
};
</script>