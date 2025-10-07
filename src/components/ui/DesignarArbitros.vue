<template>
  <div class="p-6 bg-white rounded-2xl shadow-md">
    <h2
      class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
    >
      <UserCheckIcon class="text-green-600" />
      {{ designados.length < 4 ? "Designar Arbitros" : "Lista de Arbitros" }}
    </h2>

    <!-- Buscar árbitro -->
    <div class="flex gap-3 mb-4" v-if="designados.length < 4">
      <input
        v-model="filtro"
        type="text"
        placeholder="Buscar por DNI o nombre..."
        @keypress.enter="buscarArbitro"
        class="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      />
      <button
        @click="buscarArbitro"
        class="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 transition"
      >
        Buscar
      </button>
    </div>

    <!-- Resultados -->
    <div v-if="arbitrosEncontrados.length" class="mb-6">
      <h3 class="font-semibold text-gray-700 mb-2">Resultados:</h3>
      <ul class="space-y-2">
        <li
          v-for="arbitro in arbitrosEncontrados"
          :key="arbitro.id"
          class="flex justify-between items-center border rounded-xl p-3 hover:bg-gray-50 transition"
        >
          <div>
            <p class="font-medium">
              {{ arbitro.nombre }} {{ arbitro.apellido }}
            </p>
            <p class="text-sm text-gray-500">DNI: {{ arbitro.dni }}</p>
          </div>

          <select
            v-model="rolSeleccionado[arbitro.id]"
            class="border rounded-xl px-2 py-1 text-sm"
          >
            <option disabled value="">Seleccionar Rol</option>
            <option
              v-for="rol in rolesDisponibles"
              :key="rol"
              :value="rol"
              :disabled="rolesAsignados.includes(rol)"
            >
              {{ rol }}
            </option>
          </select>

          <button
            @click="designarArbitro(arbitro)"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-xl text-sm transition"
          >
            Asignar
          </button>
        </li>
      </ul>
    </div>

    <!-- Lista de árbitros designados -->
    <div v-if="designados.length">
      <ul class="space-y-2">
        <li
          v-for="a in designados"
          :key="a.id"
          class="flex justify-between items-center bg-green-50 border border-green-200 rounded-xl p-3"
        >
          <span class="w-[150px] capitalize font-bold">{{ a.arbitro.nombre }} {{ a.arbitro.apellido }}</span>
          <span class="w-[150px] uppercase text-sm">CI: {{ a.arbitro.dni }}</span>
          <span class="w-[150px] capitalize">{{ a.rol }}</span>
          <button
            @click="quitarArbitro(a)"
            class="w-[75px] text-red-500 hover:text-red-700 text-sm"
          >
            Quitar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { UserCheckIcon } from "lucide-vue-next";

const props = defineProps({
  partidoId: {
    type: Number,
    required: true,
  },
});

const filtro = ref("");
const arbitrosEncontrados = ref([]);
const designados = ref([]);

const rolSeleccionado = ref({});
const rolesDisponibles = ["PRINCIPAL", "ASISTENTE_1", "ASISTENTE_2", "CUARTO"];

const rolesAsignados = computed(() => designados.value.map((a) => a.rol));

const buscarArbitro = async () => {
  if (!filtro.value) return;
  try {
    const res = await axios.get(
      `http://localhost:8080/api/arbitros/buscar?dni=${filtro.value}`
    );
    arbitrosEncontrados.value = Array.isArray(res.data) ? res.data : [res.data];
  } catch (error) {
    console.error(error);
    arbitrosEncontrados.value = [];
  }
};

const designarArbitro = async (arbitro) => {
  const data = JSON.stringify({
    idArbitro: arbitro.id,
    rol: rolSeleccionado.value[arbitro.id],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url:
      "http://localhost:8080/api/partido/designarArbitros?idPartido=" +
      props.partidoId,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      alert("Arbitro designado correctamente");
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};
const buscarDesignados = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/designaciones/buscar?idPartido=" +
      props.partidoId
  );
  let designadosArray = res.data;

  // Definimos el orden deseado:
  // 1. PRINCIPAL
  // 2. ASISTENTE 1
  // 3. ASISTENTE 2
  // 4. CUARTO (Último)
  const order = {
    PRINCIPAL: 1,
    ASISTENTE_1: 2,
    ASISTENTE_2: 3,
    CUARTO: 4,
  };

  // Ordenamos el array
  designadosArray.sort((a, b) => {
    // Obtenemos el valor de orden. Convertimos a mayúsculas por seguridad.
    const orderA = order[a.rol.toUpperCase()] || 99;
    const orderB = order[b.rol.toUpperCase()] || 99;

    // Comparamos los valores de orden
    if (orderA < orderB) {
      return -1;
    }
    if (orderA > orderB) {
      return 1;
    }
    return 0; // Mantener el orden si los roles son iguales
  });

  designados.value = designadosArray;
};
const quitarArbitro = async (arbitro) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/partidos/${props.partidoId}/arbitros/${arbitro.id}`
    );
    designados.value = designados.value.filter((a) => a.id !== arbitro.id);
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  buscarDesignados();
});
</script>

<style scoped>
select:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
