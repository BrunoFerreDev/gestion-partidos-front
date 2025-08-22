<template>
    <div class="max-w-sm rounded-2xl shadow-lg bg-white p-4 hover:shadow-xl transition">
      <!-- Encabezado con logo -->
      <div class="flex items-center space-x-4">
        <img
          :src="club.logo"
          alt="Escudo del club"
          class="w-16 h-16 object-contain rounded-full border"
        />
        <div>
          <h2 class="text-xl font-bold text-gray-800">{{ club.nombre }}</h2>
          <p class="text-sm text-gray-500">{{ club.ciudad }}</p>
        </div>
      </div>
  
      <!-- Datos principales -->
      <div class="mt-4 space-y-2 text-gray-700 text-sm">
        <p><span class="font-semibold">Fundación:</span> {{ club.fundacion }}</p>
        <p><span class="font-semibold">Presidente:</span> {{ club.presidente }}</p>
        <p><span class="font-semibold">Estadio:</span> {{ club.estadio }}</p>
      </div>
  
      <!-- Botón de acción -->
      <div class="mt-4">
        <button
          class="w-full py-2 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Ver más
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ClubCard",
    props: {
      club: {
        type: Object,
        required: true,
        default: () => ({
          nombre: "Club Ejemplo",
          logo: "https://www.cariverplate.com.ar/images/logo-river.png?cache=a57",
          ciudad: "Ciudad Ejemplo",
          fundacion: "1901",
          presidente: "Juan Pérez",
          estadio: "Estadio Central",
        }),
      },
    },
  };
  </script>
  