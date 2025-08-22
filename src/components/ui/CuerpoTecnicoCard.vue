<template>
  <div
    class="max-w-sm rounded-2xl shadow-lg bg-white p-4 hover:shadow-xl transition"
  >
    <div class="flex items-center space-x-4">
      <img
        :src="tecnico.foto"
        alt="Foto del técnico"
        class="w-16 h-16 object-cover rounded-full border"
      />
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ tecnico.nombre }}</h2>
        <p class="text-sm text-gray-500">{{ tecnico.rol }}</p>
      </div>
    </div>

    <div class="mt-4 space-y-2 text-gray-700 text-sm">
      <p><span class="font-semibold">Edad:</span> {{ tecnico.edad }}</p>
      <p><span class="font-semibold">Club:</span> {{ tecnico.club }}</p>
      <p>
        <span class="font-semibold">Nacionalidad:</span>
        {{ tecnico.nacionalidad }}
      </p>
      <p>
        <span class="font-semibold">Experiencia:</span>
        {{ tecnico.experiencia }} años
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CuerpoTecnicoCard",
  props: {
    tecnico: {
      type: Object,
      required: true,
      default: () => ({
        nombre: "Técnico Ejemplo",
        foto: "https://www.cariverplate.com.ar/images/logo-river.png?cache=a57",
        rol: "Entrenador",
        edad: 45,
        club: "River Plate",
        nacionalidad: "Argentina",
        experiencia: 20,
      }),
    },
  },
};
</script>
