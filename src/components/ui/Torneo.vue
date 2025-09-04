<template>
    <div class="p-4 space-y-6">
      <!-- Header del torneo -->
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Torneo Regional 2025</h1>
        <p class="text-gray-500">Zona A</p>
      </div>
  
      <!-- Próximos partidos -->
      <div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Próximos Partidos</h2>
        <div class="grid gap-4">
          <div
            v-for="partido in partidos"
            :key="partido.id"
            class="p-4 bg-white rounded-2xl shadow flex items-center justify-between"
          >
            <div>
              <p class="font-bold">{{ partido.local }} vs {{ partido.visitante }}</p>
              <p class="text-sm text-gray-500">{{ partido.fecha }} - {{ partido.hora }}</p>
            </div>
            <span class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
              {{ partido.estado }}
            </span>
          </div>
        </div>
      </div>
  
      <!-- Tabla de posiciones -->
      <div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Tabla de Posiciones</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border text-sm text-gray-700 bg-white rounded-2xl overflow-hidden shadow">
            <thead class="bg-gray-100">
              <tr>
                <th class="p-2 text-left">#</th>
                <th class="p-2 text-left">Equipo</th>
                <th class="p-2 text-center">PJ</th>
                <th class="p-2 text-center">G</th>
                <th class="p-2 text-center">E</th>
                <th class="p-2 text-center">P</th>
                <th class="p-2 text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(equipo, index) in tabla"
                :key="equipo.id"
                class="border-t"
              >
                <td class="p-2">{{ index + 1 }}</td>
                <td class="p-2 font-medium">{{ equipo.nombre }}</td>
                <td class="p-2 text-center">{{ equipo.pj }}</td>
                <td class="p-2 text-center">{{ equipo.g }}</td>
                <td class="p-2 text-center">{{ equipo.e }}</td>
                <td class="p-2 text-center">{{ equipo.p }}</td>
                <td class="p-2 text-center font-bold">{{ equipo.pts }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const partidos = [
    { id: 1, local: "Club A", visitante: "Club B", fecha: "05/09", hora: "16:00", estado: "Pendiente" },
    { id: 2, local: "Club C", visitante: "Club D", fecha: "06/09", hora: "18:00", estado: "Pendiente" },
  ]
  
  const tabla = [
    { id: 1, nombre: "Club A", pj: 3, g: 2, e: 1, p: 0, pts: 7 },
    { id: 2, nombre: "Club B", pj: 3, g: 2, e: 0, p: 1, pts: 6 },
    { id: 3, nombre: "Club C", pj: 3, g: 1, e: 1, p: 1, pts: 4 },
    { id: 4, nombre: "Club D", pj: 3, g: 0, e: 0, p: 3, pts: 0 },
  ]
  </script>
  