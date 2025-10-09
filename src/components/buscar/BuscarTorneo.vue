<template>
  <div class="bg-gray-100 p-4">
    <div class="flex flex-col max-w-7xl mx-auto">
      <div
        class="flex items-center justify-evenly p-8 bg-white rounded-t-lg text-lg"
        v-if="active"
      >
        <label for="search" class="block font-medium text-gray-700"
          >Buscar torneo:
          <input
            type="search"
            placeholder="Buscar torneo"
            id="search"
            @keypress.enter="buscarTorneo"
            class="ml-4 border-2 border-gray-500 rounded p-2"
            v-model="search"
        /></label>
        <div class="flex items-center justify-center gap-4">
          <label for="radio"
            >Buscar Nombre
            <input
              name="tipoBusqueda"
              type="radio"
              id="radio"
              v-model="tipoBusqueda"
              value="nombre"
          /></label>
          <label for="radio2"
            >Buscar Núm
            <input
              name="tipoBusqueda"
              type="radio"
              id="radio2"
              v-model="tipoBusqueda"
              value="num"
          /></label>
        </div>

        <button
          @click.prevent="buscarTorneo"
          class="cursor-pointer text-white font-bold px-4 py-2 rounded bg-blue-600 hover:bg-blue-800"
        >
          Buscar
        </button>
      </div>
      <div class="bg-gray-100 rounded-b-lg" v-else>
        <div class="bg-white shadow-lg rounded-lg">
          <div
            class="border-b border-gray-200 p-4 flex justify-between items-center"
          >
            <h1 class="text-2xl font-bold text-gray-800">
              {{ torneo.nombre }}
            </h1>
            <button
              @click="
                () => {
                  active = true;
                  (torneo = {}),
                    (search = ''),
                    (tipoBusqueda = 'nombre'),
                    (clubes = []),
                    (fixture = []);
                }
              "
              class="bg-gray-100 px-4 py-2 rounded ml-4 text-gray-600 hover:text-gray-800"
            >
              Volver
            </button>
          </div>

          <div class="flex border-b border-gray-200">
            <button
              @click="activeTab = 'parent'"
              :class="{
                'bg-gray-100 border-t border-r border-l border-gray-300 rounded':
                  activeTab === 'parent',
              }"
              class="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 -mb-px"
            >
              Detalles de la competición
            </button>
            <button
              @click="
                () => {
                  activeTab = 'clubs';
                  buscarClubes();
                }
              "
              :class="{
                'bg-gray-100 border-t border-r border-l border-gray-300 rounded':
                  activeTab === 'clubs',
              }"
              class="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 -mb-px"
            >
              Clubes
            </button>
            <button
              @click="
                () => {
                  activeTab = 'fixture';
                  buscarFixture();
                }
              "
              :class="{
                'bg-gray-100 border-t border-r border-l border-gray-300 rounded':
                  activeTab === 'fixture',
              }"
              class="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 -mb-px"
            >
              Fixture del torneo
            </button>
          </div>

          <div class="p-6" v-if="activeTab === 'parent'">
            <div class="flex items-start space-x-6">
              <div class="w-3/6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4"></h3>

                <form class="space-y-4">
                  <div>
                    <label
                      for="num"
                      class="block text-sm font-medium text-gray-700"
                      >Núm:</label
                    >
                    <input
                      type="text"
                      id="num"
                      v-model="torneo.codigoTorneo"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      readonly
                    />
                  </div>

                  <div>
                    <label
                      for="status"
                      class="block text-sm font-medium text-gray-700"
                      >Estado:</label
                    >
                    <div class="flex items-center mt-1">
                      <input
                        type="text"
                        id="status"
                        v-model="torneo.estado"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm"
                        readonly
                      />
                      <button
                        type="button"
                        class="p-2 border border-gray-300 rounded-r-md bg-white hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 11.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      for="competitionType"
                      class="block text-sm font-medium text-gray-700"
                      >Tipo de competición:</label
                    >
                    <select
                      name="competitionType"
                      id="competitionType"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="" disabled selected>Seleccione</option>
                      <option value="parent">Primera Division</option>
                      <option value="club">Sub 21</option>
                    </select>
                  </div>

                  <div class="flex items-center space-x-2">
                    <div class="flex-1">
                      <label
                        for="season"
                        class="block text-sm font-medium text-gray-700"
                        >Temporada:</label
                      >
                      <span
                        type="text"
                        id="season"
                        readonly
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      >
                        {{ torneo.temporada + " - " + torneo.tipo }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700"
                      >Nombre:</label
                    >
                    <input
                      type="text"
                      id="name"
                      v-model="torneo.nombre"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="system"
                      class="block text-sm font-medium text-gray-700"
                      >Sistema:</label
                    >
                    <select
                      id="system"
                      v-model="torneo.system"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option>Combinación</option>
                      <option>Liga</option>
                      <option>Eliminación</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="w-3/6">
                <div class="flex border-b border-gray-200 mb-4">
                  <button
                    class="px-4 py-2 text-sm font-semibold border-b-2 border-blue-500 text-blue-600 -mb-px"
                  >
                    Configuración general
                  </button>
                </div>

                <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      for="teamType"
                      class="block text-sm font-medium text-gray-700"
                      >Tipo de equipo:</label
                    >
                    <input
                      type="text"
                      id="teamType"
                      v-model="configData.teamType"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="disciplines"
                      class="block text-sm font-medium text-gray-700"
                      >Disciplinas:</label
                    >
                    <input
                      type="text"
                      id="disciplines"
                      v-model="configData.disciplines"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="gender"
                      class="block text-sm font-medium text-gray-700"
                      >Género:</label
                    >
                    <input
                      type="text"
                      id="gender"
                      v-model="configData.gender"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="ageCategory"
                      class="block text-sm font-medium text-gray-700"
                      >Categoría de edad:</label
                    >
                    <input
                      type="text"
                      id="ageCategory"
                      v-model="configData.ageCategory"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="minAge"
                      class="block text-sm font-medium text-gray-700"
                      >Edad mínima:</label
                    >
                    <input
                      type="number"
                      id="minAge"
                      v-model="configData.minAge"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="maxAge"
                      class="block text-sm font-medium text-gray-700"
                      >Edad máxima:</label
                    >
                    <input
                      type="number"
                      id="maxAge"
                      v-model="configData.maxAge"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="referenceDate"
                      class="block text-sm font-medium text-gray-700"
                      >Reference date:</label
                    >
                    <input
                      type="date"
                      id="referenceDate"
                      v-model="configData.referenceDate"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      for="birthDate"
                      class="block text-sm font-medium text-gray-700"
                      >Fecha Nac. desde:</label
                    >
                    <input
                      type="date"
                      id="birthDate"
                      v-model="configData.birthDate"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'clubs'">
            <div class="p-6 bg-gray-100">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
              >
                <IconPlus /> Añadir club
              </button>
              <table>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Nombre</td>
                    <td>Estado</td>
                    <td>Ciudad</td>
                    <td>Fundacion</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="club in clubes" :key="club.id">
                    <td>{{ club.id }}</td>
                    <td>{{ club.nombre }}</td>
                    <td>{{ club.estado }}</td>
                    <td>{{ club.ciudad }}</td>
                    <td>{{ club.fundacion }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="activeTab === 'fixture'">
            <!-- Recorremos las fechas -->
            <div
              v-for="(partidos, fecha) of fixture"
              :key="fecha"
              class="m-1 mt-2 p-6 bg-gray-100"
            >
              <!-- Título de la fecha -->
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-blue-700">
                  Fecha {{ fecha }}
                </h2>
                <button
                  @click="toggleFecha(fecha)"
                  type="button"
                  class="ml-auto bg-blue-500 hover:bg-blue-600 text-white rounded inline-flex items-center gap-2 px-4 py-2 cursor-pointer"
                >
                  <span>
                    {{ fechaAbierta === fecha ? "▲" : "▼" }}
                  </span>
                </button>
              </div>

              <!-- Tabla de partidos -->
              <div class="mt-5 rounded-lg shadow" v-if="fechaAbierta === fecha">
                <table class="text-sm text-left border-collapse bg-amber-50">
                  <thead class="text-gray-700 uppercase text-xs">
                    <tr>
                      <th class="px-4 py-2">#</th>
                      <th class="px-4 py-2">Local</th>
                      <th class="px-4 py-2">Visitante</th>
                      <th class="px-4 py-2">Fecha Calendario</th>
                      <th class="px-4 py-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(partido, index) in partidos"
                      :key="partido.idPartido"
                      class="border-b hover:bg-gray-50"
                    >
                      <td class="px-4 py-2 font-medium">{{ index + 1 }}</td>
                      <td class="px-4 py-2 font-semibold">
                        {{ partido.local }}
                      </td>
                      <td class="px-4 py-2 font-semibold">
                        {{ partido.visitante }}
                      </td>
                      <td class="px-4 py-2 text-gray-600 uppercase">
                        {{ partido.fechaCalendario }}
                      </td>
                      <td class="px-4 py-2">
                        <button
                          @click="
                            redireccionarPartido(
                              torneo.codigoTorneo,
                              partido.fechaTorneo,
                              partido.local,
                              partido.visitante,
                              partido.idPartido
                            )
                          "
                          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center gap-2"
                        >
                          <IconPlus /> Ver partido
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BaseEmptyState
        v-if="mostrar"
        title="No se encontraron clubes"
        message="Intentá cambiar los filtros o agregar un nuevo club."
        @close="mostrar = false"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { IconPlus } from "@tabler/icons-vue";
import { useRouter } from "vue-router";
import BaseEmptyState from "../ui/BaseEmptyState.vue";
const activeTab = ref("parent");
const active = ref(true);
const fechaAbierta = ref(null);
const torneo = ref({});
const clubes = ref([]);
const fixture = ref([]);

const configData = reactive({
  teamType: "Equipo de club",
  disciplines: "Futbol",
  gender: "Masculino",
  ageCategory: "Seniors",
  minAge: 13,
  maxAge: 99,
  referenceDate: "2023-01-01",
  birthDate: "1925-01-01",
});
const tipoBusqueda = ref("num");
const search = ref("");
const mostrar = ref(false);
const router = useRouter();

const buscarClubes = () => {
  activeTab.value == "clubs";
  axios
    .get("http://localhost:8080/api/club")
    .then((response) => {
      clubes.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
const buscarTorneo = () => {
  if (search.value === "") {
    return;
  }
  if (tipoBusqueda.value === "nombre") {
    try {
      axios
        .get("http://localhost:8080/api/torneo", {
          params: {
            nombre: search.value,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          torneo.value = response.data;
          active.value = false;
        })
        .catch((error) => {
          console.log(error);
          mostrar.value = true;
        });
    } catch (error) {
      console.log(error);
    }
  } else if (tipoBusqueda.value === "num") {
    try {
      axios
        .get("http://localhost:8080/api/torneo/" + search.value, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          torneo.value = response.data;
          active.value = false;
        })
        .catch((error) => {
          console.log(error);
          mostrar.value = true;
        });
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Error al obtener torneo");
  }
};
const buscarFixture = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/torneo/fixture?idTorneo=" + torneo.value.id,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  fixture.value = res.data;
  console.log(fixture.value);
  if (fixture.value[1]) {
    fechaAbierta.value = 1;
  }
};
const redireccionarPartido = (
  codigoTorneo,
  fechaTorneo,
  local,
  visitante,
  idPartido
) => {
  router.push({
    name: "partidos",
    query: {
      codigoTorneo: codigoTorneo,
      fechaTorneo: fechaTorneo,
      local: local,
      visitante: visitante,
      idPartido: idPartido,
    },
  });
};
const toggleFecha = (fecha) => {
  fechaAbierta.value = fecha;
};
const opcionesFormato = {
  weekday: "short", // 'Sun' -> 'dom'
  year: "numeric", // 2025
  month: "short", // 'Oct' -> 'oct'
  day: "2-digit", // 19
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  // Opciones que aseguran que se usa la fecha local sin forzar la zona horaria
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}
</style>
