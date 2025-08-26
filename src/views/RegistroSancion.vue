<template>
  <div class="p-6 w-full h-[calc(85vh-70px)] overflow-y-auto">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border">
      <!-- Tabs -->
      <div class="flex border-b">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'flex-1 py-3 text-center font-semibold transition',
            activeTab === tab
              ? 'border-b-4 border-red-600 text-red-600'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Contenido dinámico -->
      <div class="p-6">
        <!-- Jugador -->
        <div v-if="activeTab === 'Jugador'">
          <h2 class="text-xl font-bold mb-4">⚽ Sanción a Jugador</h2>
          <form class="space-y-4">
            <div>
              <label class="block font-medium">Jugador</label>
              <div class="flex gap-2 w-full justify-between items-center">
                <input
                  v-model="id"
                  type="text"
                  class="border p-2 rounded w-2/3"
                  placeholder="Buscar jugador por DNI/FICHA"
                  @keypress.enter.prevent="buscarJugador"
                />
                <button
                  type="submit"
                  class="bg-sky-600 text-white px-4 py-2 rounded w-1/5"
                  @click.prevent="buscarJugador"
                >
                  Buscar
                </button>
                <button
                  type="submit"
                  class="bg-orange-600 text-white px-4 py-2 rounded w-1/5"
                  @click.prevent="limpiar"
                >
                  Limpiar
                </button>
              </div>
            </div>
            <div class="info-jugador flex gap-2" v-if="resultados.nombre">
              <p class="w-1/2 font-medium border rounded p-2">
                Nombre: {{ resultados.nombre + " " + resultados.apellido }}
              </p>
              <p class="w-1/2 font-medium border rounded p-2">Club:</p>
            </div>

            <div>
              <label class="block font-medium">Fecha de Suspensión</label>
              <input type="date" class="w-full border p-2 rounded" />
            </div>

            <div class="flex gap-2 w-full">
              <label class="block font-medium w-1/2"
                >Duración
                <input
                  type="number"
                  placeholder="Cantidad de días/partidos"
                  class="w-full border p-2 rounded"
                />
              </label>
              <label class="block font-medium w-1/2"
                >Multa (opcional)
                <input
                  type="number"
                  placeholder="Monto en $"
                  class="w-full border p-2 rounded"
                />
              </label>
            </div>

            <div>
              <label class="block font-medium">Motivo</label>
              <textarea class="w-full border p-2 rounded"></textarea>
            </div>

            <button class="bg-red-600 text-white px-4 py-2 rounded mx-auto">
              Guardar
            </button>
          </form>
        </div>

        <!-- Cuerpo Técnico -->
        <div v-if="activeTab === 'Cuerpo Técnico'">
          <h2 class="text-xl font-bold mb-4">
            🎓 Sanción a Miembro del Cuerpo Técnico
          </h2>
          <form class="space-y-4">
            <div>
              <label class="block font-medium">Miembro CT</label>
              <div class="flex gap-2 w-full justify-between">
                <input
                  type="text"
                  class="border p-2 rounded w-2/3"
                  placeholder="Buscar miembro por DNI/FICHA"
                />
                <button class="bg-sky-600 text-white px-4 py-2 rounded w-1/5">
                  Buscar
                </button>
                <button
                  class="bg-orange-600 text-white px-4 py-2 rounded w-1/5"
                >
                  Limpiar
                </button>
              </div>
            </div>
            <div class="info-jugador flex gap-2">
              <p class="w-1/2 font-medium border rounded p-2">Nombre:</p>
              <p class="w-1/2 font-medium border rounded p-2">Club:</p>
            </div>

            <div>
              <label class="block font-medium">Fecha de Suspensión</label>
              <input type="date" class="w-full border p-2 rounded" />
            </div>

            <div class="flex gap-2 w-full">
              <label class="block font-medium w-1/2"
                >Duración
                <input
                  type="number"
                  placeholder="Cantidad de días/partidos"
                  class="w-full border p-2 rounded"
                />
              </label>
              <label class="block font-medium w-1/2"
                >Multa (opcional)
                <input
                  type="number"
                  placeholder="Monto en $"
                  class="w-full border p-2 rounded"
                />
              </label>
            </div>
            <div>
              <label class="block font-medium">Motivo</label>
              <textarea class="w-full border p-2 rounded"></textarea>
            </div>

            <button class="bg-red-600 text-white px-4 py-2 rounded mx-auto">
              Guardar
            </button>
          </form>
        </div>

        <!-- Club -->
        <div v-if="activeTab === 'Club'">
          <h2 class="text-xl font-bold mb-4">🏟️ Sanción a Club</h2>
          <form class="space-y-4">
            <div>
              <label class="block font-medium">Club</label>
              <select class="w-full border p-2 rounded">
                <option>Seleccionar...</option>
              </select>
            </div>

            <div>
              <label class="block font-medium">Tipo de Sanción</label>
              <select class="w-full border p-2 rounded">
                <option>Multa económica</option>
                <option>Reducción de puntos</option>
                <option>Advertencia</option>
              </select>
            </div>

            <div>
              <label class="block font-medium"
                >Monto de Multa (si aplica)</label
              >
              <input
                type="number"
                placeholder="$"
                class="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label class="block font-medium"
                >Puntos a reducir (si aplica)</label
              >
              <input
                type="number"
                placeholder="Ej: -3"
                class="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label class="block font-medium">Motivo</label>
              <textarea class="w-full border p-2 rounded"></textarea>
            </div>

            <button class="bg-red-600 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </form>
        </div>

        <!-- Árbitro -->
        <div v-if="activeTab === 'Árbitro'">
          <h2 class="text-xl font-bold mb-4">⚖️ Sanción a Árbitro</h2>
          <form class="space-y-4">
            <div>
              <label class="block font-medium">Árbitro</label>
              <select class="w-full border p-2 rounded">
                <option>Seleccionar...</option>
              </select>
            </div>

            <div>
              <label class="block font-medium">Duración de la sanción</label>
              <select class="w-full border p-2 rounded">
                <option>Días</option>
                <option>Años</option>
              </select>
            </div>

            <div>
              <label class="block font-medium">Cantidad</label>
              <input
                type="number"
                placeholder="Ej: 30 días / 1 año"
                class="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label class="block font-medium">Motivo</label>
              <textarea class="w-full border p-2 rounded"></textarea>
            </div>

            <button class="bg-red-600 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "RegistroSancion",
  data() {
    return {
      id: "",
      show: false,
      sancion: {
        entidad: "",
        entidadId: "",
        tipo: "",
        fecha: "",
        duracion: "",
        motivo: "",
      },
      listaEntidades: [],
      tabs: ["Jugador", "Cuerpo Técnico", "Club", "Árbitro"],
      activeTab: "Jugador",
      resultados: {},
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
    limpiar() {
      this.resultados = {};
      this.id = "";
    },
  },
  computed: {
    buscarJugador() {
      if (!this.id) {
        alert("Debe ingresar un ID");
        return;
      }
      let id = Number(this.id);
      console.log("Buscando jugador...");
      axios
        .get("http://localhost:8080/api/jugador/" + id)
        .then((response) => {
          this.resultados = response.data;
          console.log(this.resultados);
        })
        .catch((error) => {
          console.error("Error buscando jugador:", error);
        });
    },
  },
};
</script>
<style scoped>
textarea {
  resize: none;
  height: 100px;
}
</style>
