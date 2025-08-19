<template>
  <div class="p-6 w-full h-full overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-6">Registrar Nueva Sanción</h2>

    <form
      @submit.prevent="guardarSancion"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded-2xl p-6"
    >
      <!-- Tipo de entidad -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">Entidad</label>
        <select
          v-model="sancion.entidad"
          @change="cargarEntidades"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione una entidad</option>
          <option value="jugador">Jugador</option>
          <option value="entrenador">Entrenador</option>
          <option value="arbitro">Árbitro</option>
          <option value="club">Club</option>
        </select>
      </div>

      <!-- Selección de entidad -->
      <div class="md:col-span-2" v-if="listaEntidades.length > 0">
        <label class="block text-sm font-medium mb-1">
          Seleccione {{ sancion.entidad }}
        </label>
        <select
          v-model="sancion.entidadId"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione</option>
          <option
            v-for="item in listaEntidades"
            :key="item.id"
            :value="item.id"
          >
            {{ mostrarNombre(item) }}
          </option>
        </select>
      </div>

      <!-- Tipo de sanción -->
      <div>
        <label class="block text-sm font-medium mb-1">Tipo de sanción</label>
        <select
          v-model="sancion.tipo"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="">Seleccione</option>
          <option value="amonestacion">Amonestación</option>
          <option value="expulsion">Expulsión</option>
          <option value="suspension">Suspensión</option>
          <option value="multa">Multa</option>
        </select>
      </div>

      <!-- Fecha -->
      <div>
        <label class="block text-sm font-medium mb-1">Fecha</label>
        <input
          type="date"
          v-model="sancion.fecha"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <!-- Duración -->
      <div>
        <label class="block text-sm font-medium mb-1">Duración</label>
        <input
          type="number"
          min="1"
          v-model="sancion.duracion"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Días o Partidos"
        />
      </div>

      <!-- Motivo -->
      <div class="md:col-span-2">
        <label class="block text-sm font-medium mb-1">Motivo</label>
        <textarea
          v-model="sancion.motivo"
          rows="3"
          class="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Detalle del motivo de la sanción"
        ></textarea>
      </div>

      <!-- Botones -->
      <div class="md:col-span-2 flex justify-end space-x-4 mt-4">
        <button
          type="button"
          class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistroSancion",
  data() {
    return {
      sancion: {
        entidad: "",
        entidadId: "",
        tipo: "",
        fecha: "",
        duracion: "",
        motivo: "",
      },
      listaEntidades: [],
    };
  },
  methods: {
    async cargarEntidades() {
      if (!this.sancion.entidad) {
        this.listaEntidades = [];
        return;
      }

      try {
        const response = await fetch(`/api/${this.sancion.entidad}s`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          this.listaEntidades = await response.json();
        }
      } catch (error) {
        console.error("Error cargando entidades:", error);
      }
    },
    mostrarNombre(item) {
      if (this.sancion.entidad === "club") return item.nombre;
      return `${item.nombre} ${item.apellido}`;
    },
    async guardarSancion() {
      console.log("Datos sanción:", this.sancion);
      // Ejemplo POST
      try {
        const response = await fetch(`/api/sanciones`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(this.sancion),
        });
        if (response.ok) {
          alert("Sanción registrada con éxito ✅");
          this.sancion = {
            entidad: "",
            entidadId: "",
            tipo: "",
            fecha: "",
            duracion: "",
            motivo: "",
          };
          this.listaEntidades = [];
        } else {
          alert("Error al guardar sanción ❌");
        }
      } catch (error) {
        console.error("Error guardando sanción:", error);
      }
    },
  },
};
</script>
