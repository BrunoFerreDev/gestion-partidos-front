<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
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
              <div class="flex gap-2 w-full justify-between">
                <input
                  type="text"
                  class="border p-2 rounded w-2/3"
                  placeholder="Buscar jugador por DNI/FICHA"
                />
                <button class="bg-sky-600 text-white px-4 py-2 rounded w-1/3">
                  Buscar
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

            <div>
              <label class="block font-medium">Duración</label>
              <input
                type="number"
                placeholder="Cantidad de días/partidos"
                class="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label class="block font-medium">Multa (opcional)</label>
              <input
                type="number"
                placeholder="Monto en $"
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
                <button class="bg-sky-600 text-white px-4 py-2 rounded w-1/3">
                  Buscar
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

            <div>
              <label class="block font-medium">Duración</label>
              <input
                type="number"
                placeholder="Cantidad de días/partidos"
                class="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label class="block font-medium">Multa (opcional)</label>
              <input
                type="number"
                placeholder="Monto en $"
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
export default {
  name: "RegistroSancion",
  data() {
    return {
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
