<template>
    <div class="overflow-x-auto rounded-lg border shadow-lg bg-white p-4">
      <h2 class="text-lg font-bold mb-4 text-gray-800">
        Estadísticas - {{ entidad | capitalize }}
      </h2>
  
      <table class="w-full text-sm text-left text-gray-600 border">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th v-for="col in columnas" :key="col" class="px-4 py-2 border-b">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fila, index) in datos" :key="index" class="hover:bg-gray-50">
            <td v-for="col in columnas" :key="col" class="px-4 py-2 border-b">
              {{ fila[col.toLowerCase()] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "EstadisticasTable",
    props: {
      entidad: { type: String, required: true },
      datos: { type: Array, required: true },
    },
    computed: {
      columnas() {
        switch (this.entidad) {
          case "club":
            return ["Nombre", "Ciudad", "Fundación", "Estadio", "Puntos"];
          case "jugador":
            return ["Nombre", "Edad", "Posición", "Club", "Goles", "Asistencias"];
          case "tecnico":
            return ["Nombre", "Rol", "Club", "Experiencia", "Títulos"];
          case "arbitro":
            return ["Nombre", "Categoría", "Edad", "Nacionalidad", "Partidos"];
          default:
            return [];
        }
      },
    },
    filters: {
      capitalize(value) {
        if (!value) return "";
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
  };
  </script>
  