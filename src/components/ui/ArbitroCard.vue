<template>
  <div
    class="max-w-sm rounded-2xl shadow-lg bg-white p-4 hover:shadow-xl transition"
  >
    <div class="flex items-center space-x-4">
      <img
        :src="arbitro.foto"
        alt="Foto del árbitro"
        class="w-16 h-16 object-contain rounded-full border"
      />
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ arbitro.nombre }}</h2>
        <p class="text-sm text-gray-500">{{ arbitro.categoria }}</p>
      </div>
    </div>

    <div class="mt-4 space-y-2 text-gray-700 text-sm">
      <p><span class="font-semibold">Edad:</span> {{ arbitro.edad }}</p>
      <p>
        <span class="font-semibold">Nacionalidad:</span>
        {{ arbitro.nacionalidad }}
      </p>
      <p>
        <span class="font-semibold">Partidos dirigidos:</span>
        {{ arbitro.partidosDirigidos }}
      </p>
      <p>
        <span class="font-semibold">Años de experiencia:</span>
        {{ arbitro.experiencia }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArbitroCard",
  props: {
    arbitro: {
      type: Object,
      required: true,
      default: () => ({
        nombre: "Árbitro Ejemplo",
        foto: "https://www.cariverplate.com.ar/images/logo-river.png?cache=a57",
        categoria: "Árbitro",
        edad: 45,
        nacionalidad: "Argentina",
        partidosDirigidos: 10,
        experiencia: 20,
      }),
    },
  },
};
</script>
