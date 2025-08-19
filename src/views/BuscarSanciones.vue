<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Buscar Sanciones</h2>

    <!-- Opciones de búsqueda -->
    <div class="mb-6">
      <label class="flex items-center space-x-2 mb-2">
        <input type="radio" value="codigo" v-model="modoBusqueda" />
        <span>Buscar por Código</span>
      </label>
      <label class="flex items-center space-x-2">
        <input type="radio" value="club" v-model="modoBusqueda" />
        <span>Buscar por Club</span>
      </label>
    </div>

    <!-- Búsqueda por código -->
    <div v-if="modoBusqueda === 'codigo'" class="mb-6">
      <label class="block text-sm font-medium mb-1">Código de Sanción</label>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="codigo"
          @keyup.enter="buscarPorCodigo"
          class="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Ej: SAN-1234"
        />
        <button
          @click="buscarPorCodigo"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Búsqueda por club -->
    <div v-if="modoBusqueda === 'club'" class="mb-6">
      <label class="block text-sm font-medium mb-1">Seleccionar Club</label>
      <div class="flex space-x-2">
        <select v-model="clubId"
          class="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300">
          <option value="">Seleccione un club</option>
          <option v-for="club in listaClubes" :key="club.id" :value="club.id">
            {{ club.nombre }}
          </option>
        </select>
        <button
          @click="buscarPorClub"
          class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Buscar
        </button>
      </div>
    </div>

    <!-- Resultados -->
    <div v-if="resultados.length > 0" class="overflow-x-auto">
      <table class="w-full border border-gray-200 rounded-lg">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="px-4 py-2 border-b">Código</th>
            <th class="px-4 py-2 border-b">Entidad</th>
            <th class="px-4 py-2 border-b">Tipo</th>
            <th class="px-4 py-2 border-b">Motivo</th>
            <th class="px-4 py-2 border-b">Fecha</th>
            <th class="px-4 py-2 border-b">Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in resultados" :key="s.codigo" class="hover:bg-gray-50">
            <td class="px-4 py-2 border-b">{{ s.codigo }}</td>
            <td class="px-4 py-2 border-b">{{ s.entidad }}</td>
            <td class="px-4 py-2 border-b">{{ s.tipo }}</td>
            <td class="px-4 py-2 border-b">{{ s.motivo }}</td>
            <td class="px-4 py-2 border-b">{{ s.fecha }}</td>
            <td class="px-4 py-2 border-b">{{ s.duracion }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="buscado" class="text-gray-500 mt-4">No se encontraron sanciones</div>
  </div>
</template>

<script>
export default {
  name: "BuscarSanciones",
  data() {
    return {
      modoBusqueda: "codigo", // por defecto
      codigo: "",
      clubId: "",
      listaClubes: [],
      resultados: [],
      buscado: false
    }
  },
  created() {
    // this.cargarClubes()
  },
  methods: {
    async cargarClubes() {
      try {
        const response = await fetch("/api/clubes", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.ok) {
          this.listaClubes = await response.json()
        }
      } catch (error) {
        console.error("Error cargando clubes:", error)
      }
    },
    async buscarPorCodigo() {
      if (!this.codigo) return
      try {
        const response = await fetch(`/api/sanciones/${this.codigo}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        if (response.ok) {
          const sancion = await response.json()
          this.resultados = [sancion]
        } else {
          this.resultados = []
        }
        this.buscado = true
      } catch (error) {
        console.error("Error buscando sanción:", error)
      }
    },
    async buscarPorClub() {
      if (!this.clubId) return
      try {
        const response = await fetch(`/api/sanciones/club/${this.clubId}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        if (response.ok) {
          this.resultados = await response.json()
        } else {
          this.resultados = []
        }
        this.buscado = true
      } catch (error) {
        console.error("Error buscando sanciones del club:", error)
      }
    }
  }
}
</script>
